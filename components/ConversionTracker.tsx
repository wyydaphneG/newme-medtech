'use client';
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

type EventName='page_view'|'section_view'|'cta_click'|'inquiry_start'|'lead_submit'|'lead_error'|'whatsapp_click'|'chat_open'|'page_exit';
type ConversionDetail={eventName:EventName;metadata?:Record<string,string|number|boolean|null>};

const endpoint='/api/analytics/events';
function sessionId(){const key='newme_conversion_session';let value=sessionStorage.getItem(key);if(!value){value=crypto.randomUUID();sessionStorage.setItem(key,value);}return value;}
function send(eventName:EventName,path:string,metadata:Record<string,unknown>={},sectionId?:string){if(navigator.doNotTrack==='1'||localStorage.getItem('newme_analytics_consent')==='denied')return;const payload=JSON.stringify({sessionId:sessionId(),eventName,path,sectionId,referrerPath:document.referrer.startsWith(location.origin)?new URL(document.referrer).pathname:null,metadata});if(navigator.sendBeacon){navigator.sendBeacon(endpoint,new Blob([payload],{type:'application/json'}));return;}void fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:payload,keepalive:true});}

export default function ConversionTracker(){const pathname=usePathname();useEffect(()=>{const path=pathname||'/';const started=Date.now();let maxDepth=0;let lastSection='hero';const viewed=new Set<string>();send('page_view',path,{viewport:`${window.innerWidth}x${window.innerHeight}`});
  const scroll=()=>{const height=Math.max(document.documentElement.scrollHeight-window.innerHeight,1);maxDepth=Math.max(maxDepth,Math.round(window.scrollY/height*100));};
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const section=entry.target as HTMLElement;const id=section.id||section.dataset.analyticsSection||`section-${[...document.querySelectorAll('main section')].indexOf(section)}`;lastSection=id;if(!viewed.has(id)){viewed.add(id);send('section_view',path,{depth:maxDepth},id);}}},{threshold:.35});
  document.querySelectorAll('main section').forEach((section,index)=>{(section as HTMLElement).dataset.analyticsSection=`section-${index}`;observer.observe(section);});
  const click=(event:MouseEvent)=>{const element=(event.target as Element|null)?.closest('a,button') as HTMLElement|null;if(!element)return;const href=element instanceof HTMLAnchorElement?element.href:'';if(element.dataset.conversion==='whatsapp'||href.includes('wa.me/'))send('whatsapp_click',path,{placement:element.dataset.placement||'floating'});else if(element.getAttribute('aria-label')?.toLowerCase().includes('ai')||element.getAttribute('aria-label')?.toLowerCase().includes('advisor'))send('chat_open',path,{placement:'floating'});else if(href.includes('/contact')||href.includes('#inquiry')||href.includes('#quote')||element.dataset.conversion==='inquiry')send('cta_click',path,{target:'inquiry'});};
  const custom=(event:Event)=>{const detail=(event as CustomEvent<ConversionDetail>).detail;if(detail?.eventName)send(detail.eventName,path,detail.metadata||{});};
  const exit=()=>send('page_exit',path,{time_on_page_ms:Date.now()-started,scroll_depth:maxDepth,last_section:lastSection});
  window.addEventListener('scroll',scroll,{passive:true});document.addEventListener('click',click);window.addEventListener('newme:conversion',custom);window.addEventListener('pagehide',exit,{once:true});
  return()=>{observer.disconnect();window.removeEventListener('scroll',scroll);document.removeEventListener('click',click);window.removeEventListener('newme:conversion',custom);window.removeEventListener('pagehide',exit);};
},[pathname]);return null;}
