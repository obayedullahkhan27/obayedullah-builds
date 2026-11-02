import { defaults, services } from './content';

export const database = () => {
  throw new Error('Database unavailable');
};

export async function getContent(includeDrafts = false) {
  const result = {
    settings: { ...defaults.settings },
    projects: [...defaults.projects],
    notes: [...defaults.notes],
    services: [...services],
  };

  if (!includeDrafts) {
    result.projects = result.projects.filter((p) => p.published);
    result.notes = result.notes.filter((p) => p.published);
  }

  return result;
}

export async function ownerFromRequest() {
  return null;
}

export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  return origin && origin === new URL(request.url).origin;
}

export function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function readBody(request, max = 60000) {
  if (Number(request.headers.get('content-length')) > max) {
    throw new Error('Request too large');
  }

  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing request body');

  const decoder = new TextDecoder();
  let size = 0;
  let text = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    size += value.byteLength;

    if (size > max) {
      await reader.cancel();
      throw new Error('Request too large');
    }

    text += decoder.decode(value, { stream: true });
  }

  return JSON.parse(text + decoder.decode());
}
