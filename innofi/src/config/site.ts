export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "InnoFi",
  description: "The invoice based financing platform",
  url: "http://localhost:3000",
  ogImage: "https://localhost:3000/og.png",
  links: {
    twitter: "",
  },
};
