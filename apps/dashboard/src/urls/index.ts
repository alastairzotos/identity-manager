type UrlFn = (...args: any[]) => string;

interface Urls {
  [key: string]: UrlFn | Urls;
}

export const urls = {
  home: () => '/',
  login: (fwd: string) => `/login?fwd=${encodeURIComponent(fwd)}`,
  properties: {
    home: () => '/properties',
    property: (id: string) => `/properties/${id}`,
    create: () => '/properties/create',
  },
  apiKeys: {
    home: () => '/api-keys',
  }
} satisfies Urls;
