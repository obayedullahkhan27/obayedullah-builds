import { env } from 'cloudflare:workers';
import { defaults, services } from './content';
export const database = () => {if(!env.DB) throw new Error('Database unavailable');return env.DB;};
export async function getContent(includeDrafts=false) {
  let rows=[];
  try { rows=(await database().prepare('SELECT key, value FROM content').all()).results; }
  catch(error) { console.error('Portfolio content read failed:', error.message); }
  const patches=Object.fromEntries(rows.map(r=>[r.key,JSON.parse(r.value)]));
  const result={settings:{...defaults.settings,...patches.settings},projects:patches.projects??defaults.projects,notes:patches.notes??defaults.notes,services:patches.services??services};
  if(!includeDrafts){result.projects=result.projects.filter(p=>p.published);result.notes=result.notes.filter(p=>p.published);}
  return result;
}
export async function ownerFromRequest(request) {
  const id=request.headers.get('oai-authenticated-user-id');
  const email=request.headers.get('oai-authenticated-user-email');
  return id && email && env.OWNER_EMAIL && email.toLowerCase()===env.OWNER_EMAIL.toLowerCase() ? {id,email}:null;
}
export function sameOrigin(request) {
  const origin=request.headers.get('origin');
  return origin && origin===new URL(request.url).origin;
}
export function json(data,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
export async function readBody(request,max=60000){
  if(Number(request.headers.get('content-length'))>max)throw new Error('Request too large');
  const reader=request.body?.getReader();if(!reader)throw new Error('Missing request body');
  const decoder=new TextDecoder();let size=0,text='';
  while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>max){await reader.cancel();throw new Error('Request too large');}text+=decoder.decode(value,{stream:true});}
  return JSON.parse(text+decoder.decode());
}
