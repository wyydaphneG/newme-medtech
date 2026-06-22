export const routes = {
  home: () => '/',
  systems: () => '/systems',
  system: (slug: string) => `/systems/${slug}`,
  technologies: () => '/technologies',
  technology: (slug: string) => `/technologies/${slug}`,
  products: () => '/products',
  product: (slug: string) => `/products/${slug}`,
  applications: () => '/applications',
  application: (slug: string) => `/applications/${slug}`,
  about: () => '/about',
  contact: () => '/contact',
  blog: () => '/blog',
  article: (slug: string) => `/blog/${slug}`,
} as const;

export type EntityRouteType = 'system' | 'technology' | 'product' | 'application' | 'article';

export type ParsedEntityRoute = {
  type: EntityRouteType;
  slug: string;
};

const entityPrefixes: Record<EntityRouteType, string> = {
  system: '/systems/',
  technology: '/technologies/',
  product: '/products/',
  application: '/applications/',
  article: '/blog/',
};

export function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function entityRoute(type: EntityRouteType, slug: string) {
  const normalized = normalizeSlug(slug);
  if (!normalized) throw new Error(`A valid slug is required for ${type}`);
  return `${entityPrefixes[type]}${normalized}`;
}

export function parseEntityRoute(pathname: string): ParsedEntityRoute | null {
  const path = `/${pathname.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '')}`;
  for (const [type, prefix] of Object.entries(entityPrefixes) as Array<[EntityRouteType,string]>) {
    if (!path.startsWith(prefix)) continue;
    const slug = path.slice(prefix.length);
    if (slug && !slug.includes('/')) return {type,slug};
  }
  return null;
}

export const routeIndexes = [
  routes.home(),
  routes.systems(),
  routes.technologies(),
  routes.products(),
  routes.applications(),
  routes.about(),
  routes.contact(),
  routes.blog(),
] as const;
