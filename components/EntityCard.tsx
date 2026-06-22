import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';

export default function EntityCard({href,eyebrow,title,description}:{href:string;eyebrow:string;title:string;description:string}){
  return <Link href={href} className="group card flex min-h-56 flex-col justify-between p-7 transition hover:-translate-y-1 hover:shadow-xl"><div><p className="eyebrow">{eyebrow}</p><h3 className="mt-4 font-serif text-3xl text-charcoal">{title}</h3><p className="mt-4 text-sm leading-6 text-ink/65">{description}</p></div><ArrowUpRight className="mt-8 text-sage transition group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>;
}
