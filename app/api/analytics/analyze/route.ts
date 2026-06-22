import {NextResponse} from 'next/server';import {analyzeConversionFeedback} from '@/lib/conversion-feedback';import {requireCmsUser} from '@/lib/supabase-admin';
async function authorized(request:Request){const secret=process.env.CRON_SECRET;const supplied=request.headers.get('x-cron-secret')||request.headers.get('authorization')?.replace(/^Bearer\s+/,'');if(secret&&supplied===secret)return true;const auth=await requireCmsUser(request,['admin']);return auth.ok;}
async function run(request:Request,days=30){if(!await authorized(request))return NextResponse.json({error:'Unauthorized'},{status:401});try{return NextResponse.json(await analyzeConversionFeedback(days));}catch(error){console.error(error);return NextResponse.json({error:'Unable to analyze conversion feedback'},{status:500});}}
export async function GET(request:Request){return run(request,30);}
export async function POST(request:Request){const body=await request.json().catch(()=>({}));return run(request,Number(body.days)||30);}
