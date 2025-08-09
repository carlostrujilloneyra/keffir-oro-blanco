export interface Product {
  id: string;
  name: string;
  title: string;
  isNew: boolean;
  shortDescription: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkUrl: string;
  category?: string | undefined;
}
