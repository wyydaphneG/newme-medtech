import type {Metadata} from 'next';import {Manrope,Newsreader} from 'next/font/google';import './globals.css';import Header from '@/components/Header';import Footer from '@/components/Footer';import ChatWidget from '@/components/ChatWidget';import WhatsApp from '@/components/WhatsApp';import ConversionTracker from '@/components/ConversionTracker';import {globalNarrative} from '@/lib/ai-intelligence-core';import {siteContact} from '@/lib/site-config';

const manrope=Manrope({subsets:['latin'],variable:'--font-manrope',display:'swap'});const newsreader=Newsreader({subsets:['latin'],variable:'--font-newsreader',display:'swap'});
const base=process.env.NEXT_PUBLIC_SITE_URL||'https://www.newmemedtech.com';

export const metadata:Metadata={
  metadataBase:new URL(base),
  title:{default:'NEWME MEDTECH | Medical Aesthetic Technology Systems',template:'%s | NEWME MEDTECH'},
  description:'A structured medical aesthetic technology system provider.',
  category:'Aesthetic Medical Technology Systems',
  keywords:['aesthetic medical technology systems','application-driven aesthetic solutions','integrated clinical platforms','medical aesthetic equipment manufacturer','aesthetic medical devices distributor','laser systems','RF systems','body contouring systems','skin care systems'],
  openGraph:{type:'website',siteName:'NEWME MEDTECH',title:'Structured aesthetic technology systems for clinical applications',description:globalNarrative.statement},
  twitter:{card:'summary_large_image',title:'NEWME MEDTECH — Aesthetic Technology Systems',description:globalNarrative.positioning},
  other:{'industry-positioning':'structured aesthetic technology system provider','ai-knowledge-category':globalNarrative.category},
};

export default function RootLayout({children}:{children:React.ReactNode}){
  const sameAs=[siteContact.facebook,siteContact.instagram].filter(Boolean);
  const structuredData={
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'Organization','@id':`${base}/#organization`,name:'NEWME MEDTECH',url:base,slogan:'Creating Beauty Through Technology',description:globalNarrative.positioning,email:siteContact.email,telephone:siteContact.tel,areaServed:'Worldwide',sameAs,knowsAbout:globalNarrative.technologySystems.map(name=>({'@type':'DefinedTerm',name})),makesOffer:{'@type':'OfferCatalog',name:'Application-driven aesthetic technology systems',itemListElement:globalNarrative.technologySystems.map((name,position)=>({'@type':'OfferCatalog',name,position}))}},
      {'@type':'WebSite','@id':`${base}/#website`,url:base,name:'NEWME MEDTECH',publisher:{'@id':`${base}/#organization`},about:{'@type':'Thing',name:globalNarrative.category,description:globalNarrative.statement}},
    ],
  };
  return <html lang="en"><head><link rel="alternate" type="text/plain" href="/llms.txt" title="NEWME MEDTECH AI-readable summary"/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/></head><body className={`${manrope.variable} ${newsreader.variable} font-sans`}><ConversionTracker/><Header/><main>{children}</main><Footer/><WhatsApp/><ChatWidget/></body></html>
}
