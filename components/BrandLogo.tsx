type BrandLogoProps={
  inverse?:boolean;
  compact?:boolean;
  className?:string;
};

export default function BrandLogo({inverse=false,compact=false,className=''}:BrandLogoProps){
  const wordColor=inverse?'#F7F3EE':'#8C847C';
  return <span className={`inline-flex items-center gap-3 ${className}`} aria-label="NEWME MEDTECH">
    <svg aria-hidden="true" viewBox="0 0 104 78" className={`${compact?'h-11 w-14':'h-12 w-16'} shrink-0`}>
      <path fill="#B9A48E" d="M4 17C25 34 42 3 76 8c11 2 19 8 24 15-17-9-31-10-45-2C34 34 19 38 4 17Z"/>
      <path fill="#A8B2A1" d="M4 37c21 17 38-14 72-9 11 2 19 8 24 15-17-9-31-10-45-2C34 54 19 58 4 37Z"/>
      <path fill="#DBC9B8" d="M12 57c20 14 37-13 69-8 10 2 17 7 21 13-16-8-29-9-42-1-20 11-35 14-48-4Z"/>
    </svg>
    <span className="flex flex-col leading-none" style={{color:wordColor}}>
      <span className={`${compact?'text-[1.2rem] tracking-[.24em]':'text-[1.55rem] tracking-[.28em]'} font-medium`}>NEWME</span>
      <span className="mt-1.5 flex items-center gap-2">
        <span className="h-px w-5" style={{backgroundColor:wordColor}}/>
        <span className={`${compact?'text-[.6rem]':'text-[.68rem]'} tracking-[.42em]`}>MEDTECH</span>
        <span className="h-px w-5" style={{backgroundColor:wordColor}}/>
      </span>
    </span>
  </span>
}
