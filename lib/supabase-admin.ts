import {createClient} from '@supabase/supabase-js';
import {getDb} from './supabase';

export type CmsRole='admin'|'editor'|'viewer';
export type CmsEntity=keyof typeof cmsEntityConfig;

const baseFields=['id','created_at','updated_at'] as const;
export const cmsEntityConfig={
  systems:{table:'systems',fields:['name','slug','description','hero_media_id','seo_title','seo_description','status','sort_order']},
  technologies:{table:'technologies',fields:['name','slug','type','definition','mechanism','hero_media_id','seo_title','seo_description','status','sort_order']},
  products:{table:'products',fields:['name','short_name','slug','system_id','primary_technology_id','description','workflow_role','key_features','specs','regulatory_note','content_generated_by','ai_core_version','seo_title','seo_description','status','sort_order']},
  applications:{table:'applications',fields:['name','slug','description','clinical_outcomes','clinical_disclaimer','hero_media_id','seo_title','seo_description','status','sort_order']},
  pages:{table:'pages',fields:['key','title','eyebrow','content','seo_title','seo_description','status']},
  articles:{table:'articles',fields:['title','slug','category','excerpt','sections','read_time','seo_title','seo_description','status','published_at']},
  faqs:{table:'faqs',fields:['question','answer','content_generated_by','ai_core_version','technology_id','system_id','product_id','application_id','status','sort_order']},
  media:{table:'media_assets',fields:['storage_path','public_url','alt_text','caption','width','height','mime_type']},
  leads:{table:'leads',fields:['name','email','whatsapp','country','company','business_type','budget','interested_product','source','message','status']},
  'system-technologies':{table:'system_technologies',fields:['system_id','technology_id','sort_order']},
  'system-applications':{table:'system_applications',fields:['system_id','application_id','sort_order']},
  'technology-applications':{table:'technology_applications',fields:['technology_id','application_id','sort_order']},
  'product-applications':{table:'product_applications',fields:['product_id','application_id','sort_order']},
  'product-images':{table:'product_images',fields:['product_id','media_id','role','sort_order']},
  'article-systems':{table:'article_systems',fields:['article_id','system_id']},
} as const;

export function isCmsEntity(value:string):value is CmsEntity{return value in cmsEntityConfig;}

export async function requireCmsUser(request:Request,allowed:CmsRole[]=['admin','editor','viewer']){
  const header=request.headers.get('authorization')||'';
  const token=header.startsWith('Bearer ')?header.slice(7):'';
  if(!token)return {ok:false as const,status:401,error:'Missing access token'};
  const url=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon=process.env.SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if(!url||!anon)return {ok:false as const,status:503,error:'Supabase authentication is not configured'};
  const auth=createClient(url,anon,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await auth.auth.getUser(token);
  if(error||!data.user)return {ok:false as const,status:401,error:'Invalid access token'};
  const role=(data.user.app_metadata?.cms_role||'viewer') as CmsRole;
  if(!allowed.includes(role))return {ok:false as const,status:403,error:'Insufficient CMS permissions'};
  return {ok:true as const,user:data.user,role};
}

export function sanitizeCmsPayload(entity:CmsEntity,input:unknown){
  if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('A JSON object is required');
  const allowed=new Set<string>(cmsEntityConfig[entity].fields);
  const output:Record<string,unknown>={};
  for(const [key,value] of Object.entries(input))if(allowed.has(key))output[key]=value;
  if(!Object.keys(output).length)throw new Error('No supported fields supplied');
  return output;
}

export function getAdminDb(){const db=getDb();if(!db)throw new Error('Supabase service connection is not configured');return db;}

export async function listCmsRecords(entity:CmsEntity,options:{limit?:number;offset?:number;status?:string;search?:string}={}){
  const db=getAdminDb();const config=cmsEntityConfig[entity];const limit=Math.min(Math.max(options.limit||50,1),100);const offset=Math.max(options.offset||0,0);
  let query=db.from(config.table).select('*',{count:'exact'}).range(offset,offset+limit-1);
  if(options.status&&config.fields.some(field=>field==='status'))query=query.eq('status',options.status);
  if(options.search){const searchField=config.fields.some(field=>field==='name')?'name':config.fields.some(field=>field==='title')?'title':null;if(searchField)query=query.ilike(searchField,`%${options.search.replace(/[%_,()]/g,'')}%`);}
  const {data,error,count}=await query;if(error)throw error;return {data,count,limit,offset};
}

export async function getCmsRecord(entity:CmsEntity,id:string){const {data,error}=await getAdminDb().from(cmsEntityConfig[entity].table).select('*').eq('id',id).maybeSingle();if(error)throw error;return data;}
export async function createCmsRecord(entity:CmsEntity,input:unknown){const payload=sanitizeCmsPayload(entity,input);if('status' in payload&&payload.status==='published')payload.status='draft';const {data,error}=await getAdminDb().from(cmsEntityConfig[entity].table).insert(payload).select().single();if(error)throw error;return data;}
export async function updateCmsRecord(entity:CmsEntity,id:string,input:unknown,role:CmsRole){const payload=sanitizeCmsPayload(entity,input);if(role!=='admin'&&payload.status==='published')throw new Error('Only an admin can publish content');const {data,error}=await getAdminDb().from(cmsEntityConfig[entity].table).update(payload).eq('id',id).select().single();if(error)throw error;return data;}
export async function deleteCmsRecord(entity:CmsEntity,id:string){const {error}=await getAdminDb().from(cmsEntityConfig[entity].table).delete().eq('id',id);if(error)throw error;}
