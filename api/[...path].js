export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const BASE = process.env.MOKKY_API_BASE_URL;

  if (!BASE) {
    return new Response(JSON.stringify({ error: 'MOKKY_API_BASE_URL is not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Strip /api prefix and forward to real server
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api/, '');
  const targetUrl = `${BASE}${path}${url.search}`;
  console.log(`Proxying request: ${req.method} ${url.pathname} -> ${targetUrl}`);

  const proxyHeaders = new Headers(req.headers);
  proxyHeaders.delete('host');

  const upstreamRes = await fetch(targetUrl, {
    method: req.method,
    headers: proxyHeaders,
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
    duplex: 'half',
  });

  const resHeaders = new Headers(upstreamRes.headers);
  resHeaders.set('Access-Control-Allow-Origin', '*');
  resHeaders.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  resHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    headers: resHeaders,
  });
}
