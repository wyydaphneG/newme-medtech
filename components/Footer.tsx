import {siteContact} from '@/lib/site-config';
import {Facebook,Instagram} from 'lucide-react';

function SocialLink({href,label,children}:{href:string;label:string;children:React.ReactNode}){
  return href?<a href={href} aria-label={label} title={label} target="_blank" rel="noreferrer" className="grid h-7 w-7 place-items-center rounded-full border border-charcoal/25 transition hover:bg-cream/35">{children}</a>:<span aria-label={`${label} — not configured`} title={`${label} — add URL in environment settings`} className="grid h-7 w-7 place-items-center rounded-full border border-charcoal/15 opacity-45">{children}</span>
}

export default function Footer(){
  const wa=`https://wa.me/${siteContact.whatsapp}`;
  return <footer id="site-footer" className="site-footer border-t border-clay/30 text-charcoal">
    <div className="container-site grid gap-3 py-5 text-xs md:h-[78px] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 md:py-0">
      <p className="text-sm font-semibold tracking-[.22em]">{siteContact.companyName}</p>
      <p className="text-ink/75 md:text-center">© {new Date().getFullYear()} {siteContact.companyName}. All rights reserved.</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 md:justify-end">
        <span><a href={`tel:${siteContact.tel.replaceAll(' ','')}`}>Tel: {siteContact.tel}</a> · <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a> · <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a></span>
        <span className="flex gap-2"><SocialLink href={siteContact.facebook} label="Facebook"><Facebook size={14}/></SocialLink><SocialLink href={siteContact.instagram} label="Instagram"><Instagram size={14}/></SocialLink></span>
      </div>
    </div>
  </footer>
}
