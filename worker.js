// Deploy ไฟล์นี้เป็น Cloudflare Worker แล้วเพิ่ม Secret ชื่อ OPENROUTER_KEY
// อนุญาตเว็บไซต์ร้านบน Sites และ GitHub Pages ของเจ้าของโปรเจ็กต์
const ALLOWED = [
  'http://localhost:8000',
  'http://127.0.0.1:8000',
  'https://crumb-co-bakery-demo-2026.frozenghat1.chatgpt.site',
  'https://patiphatchunoon.github.io'
];
const ROUTES = new Map([['/api/v1/embeddings','embeddings'],['/api/v1/chat/completions','chat/completions']]);
export default {async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/'&&request.method==='GET')return Response.json({status:'ok',hasKey:!!env.OPENROUTER_KEY});const origin=request.headers.get('Origin');if(!origin||!ALLOWED.includes(origin))return new Response('Origin not allowed',{status:403});const cors={'Access-Control-Allow-Origin':origin,'Vary':'Origin','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'};if(request.method==='OPTIONS')return new Response(null,{headers:cors});if(request.method!=='POST'||!ROUTES.has(url.pathname))return new Response('Not found',{status:404,headers:cors});if(!env.OPENROUTER_KEY)return new Response('Missing secret',{status:500,headers:cors});const body=await request.text();if(body.length>100000)return new Response('Request too large',{status:413,headers:cors});const upstream=await fetch('https://openrouter.ai/api/v1/'+ROUTES.get(url.pathname),{method:'POST',headers:{'Authorization':'Bearer '+env.OPENROUTER_KEY,'Content-Type':'application/json'},body});return new Response(upstream.body,{status:upstream.status,headers:{...cors,'Content-Type':upstream.headers.get('Content-Type')||'application/json'}})}};
