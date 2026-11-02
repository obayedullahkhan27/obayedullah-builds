import { env } from 'cloudflare:workers';
import { getChatGPTUser,chatGPTSignInPath,chatGPTSignOutPath } from '../chatgpt-auth';
import { getContent,database } from '../../lib/store';
import Dashboard from '../../components/dashboard';
export const dynamic='force-dynamic';
export const metadata={title:'Owner dashboard',robots:{index:false,follow:false}};
export default async function Admin(){
 const user=await getChatGPTUser();
 if(!user)return <section className="wrap py-20"><div className="mx-auto max-w-[640px] rounded-xl border border-line bg-white/60 p-8 sm:p-12"><p className="eyebrow text-muted">The owner’s build desk</p><h1 className="mt-6 text-5xl tracking-[-.06em]">A little space<br/><span className="font-serif italic">behind the scenes.</span></h1><p className="mt-6 text-sm leading-7 text-muted">Sign in with the ChatGPT account that owns this site to edit content and review project enquiries.</p><a href={chatGPTSignInPath('/admin')} target="_top" className="button button-dark mt-7">Continue with ChatGPT ↗</a><p className="mt-5 text-[11px] leading-6 text-muted">Visitors can explore the portfolio without signing in. Editing is reserved for the site owner.</p></div></section>;
 if(!env.OWNER_EMAIL||user.email.toLowerCase()!==env.OWNER_EMAIL.toLowerCase())return <section className="wrap py-20"><h1 className="section-title">This desk is owner-only.</h1><p className="mt-6 text-sm text-muted">The signed-in account does not have permission to manage this site.</p><a href={chatGPTSignOutPath('/admin')} target="_top" className="button button-outline mt-6">Use another account ↗</a></section>;
 try{const content=await getContent(true);const leads=(await database().prepare('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500').all()).results;return <Dashboard initial={{...content,enquiries:leads}} signOutPath={chatGPTSignOutPath('/')}/>;}
 catch{return <section className="wrap py-20"><h1 className="section-title">The dashboard couldn’t load.</h1><p className="mt-5 text-sm text-muted">Please reload in a moment. Your saved content and enquiries have not been changed.</p><a className="button button-dark mt-6" href="/admin">Try again ↻</a></section>;}
}
