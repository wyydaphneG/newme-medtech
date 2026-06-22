'use client';
import {useState} from 'react';

const fields=[
  ['SUPABASE_URL','Supabase Project URL','Settings → Data API → Project URL','url'],
  ['SUPABASE_ANON_KEY','Supabase Publishable Key','Settings → API Keys → Publishable key','password'],
  ['SUPABASE_SERVICE_ROLE_KEY','Supabase Secret Key','Settings → API Keys → Secret key；请勿截图或外传','password'],
  ['OPENAI_API_KEY','OpenAI API Key','OpenAI Platform → API keys','password'],
  ['NEXT_PUBLIC_WHATSAPP_NUMBER','WhatsApp Number','国家区号+号码，不要输入 +、空格或横线','text'],
  ['NEXT_PUBLIC_CONTACT_EMAIL','Contact Email','网站公开业务邮箱','email'],
  ['NEXT_PUBLIC_CONTACT_TEL','Contact Telephone','网站公开联系电话','text'],
] as const;

export default function LocalSetup(){const [state,setState]=useState<'idle'|'saving'|'done'|'error'>('idle');const [message,setMessage]=useState('');async function save(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setState('saving');const values=Object.fromEntries(new FormData(event.currentTarget));const response=await fetch('/api/local-setup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});const result=await response.json();setMessage(result.message||result.error||'');setState(response.ok?'done':'error');}return <main className="min-h-screen bg-cream px-5 py-12 text-charcoal"><div className="mx-auto max-w-2xl"><p className="eyebrow">Local configuration</p><h1 className="mt-3 font-serif text-5xl">NEWME 环境配置</h1><p className="mt-5 text-sm leading-7 text-ink/70">所有密钥直接写入本机的 .env.local，不会发送到聊天。Secret Key 和 OpenAI Key 输入后会隐藏显示。</p><form onSubmit={save} className="card mt-8 grid gap-5 p-7">{fields.map(([name,label,help,type])=><label className="grid gap-2" key={name}><span className="text-sm font-bold">{label}</span><input required={name.startsWith('SUPABASE_')} type={type} name={name} autoComplete="off" className="rounded-xl border border-sage/35 bg-white px-4 py-3 text-sm outline-none focus:border-sage"/><span className="text-xs text-ink/55">{help}</span></label>)}<button className="btn btn-primary mt-3" disabled={state==='saving'}>{state==='saving'?'保存中…':'保存到 .env.local'}</button>{message&&<p className={`rounded-xl p-4 text-sm ${state==='done'?'bg-sage/20':'bg-red-50 text-red-700'}`}>{message}</p>}</form><p className="mt-5 text-xs leading-5 text-ink/50">此页面只允许从 localhost 或 127.0.0.1 访问，并且在生产环境自动禁用。</p></div></main>}
