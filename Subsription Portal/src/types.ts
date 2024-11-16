import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

export type NavbarLinkReact = {
  link: string;
  label: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string | StaticImageData;
};

export type Quantities = Record<string, number>;

export type QuantityInputReact = {
  productId: string;
};

export type OnchainStoreContextType = {
  quantities: Quantities;
  setQuantities: (
    quantities: Quantities | ((prev: Quantities) => Quantities),
  ) => void;
  products?: Product[];
};

export type QuantityInputButtonReact = {
  onClick: () => void;
  svg: ReactNode;
  label: string;
};

export type OnchainStoreCartReact = {
  setShowModal?: (value: boolean) => void;
  showModal?: boolean;
};



export type MockCheckoutButtonReact = {
  onClick: () => void;
};
