import Image from 'next/image';

export default function ProductMedia({src,alt,icon,compact=false}:{src?:string;alt:string;icon:string;compact?:boolean}){
  return <div className={`relative overflow-hidden bg-sand/55 ${compact?'aspect-[4/3] rounded-2xl':'aspect-square rounded-[3rem]'}`}>
    {src?<Image src={src} alt={alt} fill className="object-contain p-6" sizes={compact?'(max-width:768px) 100vw, 33vw':'(max-width:1024px) 100vw, 50vw'}/>:<div className="absolute inset-0 grid place-items-center">
      <div className="text-center">
        <span className={`${compact?'text-5xl':'text-8xl'} font-serif text-forest/55`}>{icon}</span>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-[.18em] text-ink/45">Product image</p>
      </div>
    </div>}
  </div>
}
