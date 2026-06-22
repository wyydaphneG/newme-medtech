import type { Config } from 'tailwindcss';
export default { content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{colors:{ink:'#6B645D',charcoal:'#2E2A27',forest:'#A8B2A1',sage:'#A8B2A1',cream:'#F7F3EE',sand:'#E8DDD1',clay:'#D8C9B8'},fontFamily:{sans:['var(--font-manrope)'],serif:['var(--font-newsreader)']}}},plugins:[]} satisfies Config;
