import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { OnchainStoreContextType } from '../types';
import jacketImage from '../images/jacket.png';
import silver from '../images/silver.png';
import gold from '../images/gold.png';
import plat from '../images/plat.png';
import type { Product } from 'src/types';

const emptyContext = {} as OnchainStoreContextType;

const OnchainStoreContext =
  createContext<OnchainStoreContextType>(emptyContext);

type OnchainStoreProviderReact = {
  children: ReactNode;
};

const products: Product[] = [
  { id: 'product1', name: `30 Days Subscription`, price: 10, image: silver },
  {
    id: 'product2',
    name: `6 Months Subscription`,
    price: 50,
    image: gold,
  },
  {
    id: 'product3',
    name: `12 Months Subscription`,
    price: 80,
    image: plat,
  }
];

export function OnchainStoreProvider({ children }: OnchainStoreProviderReact) {
  const [quantities, setQuantities] = useState({});
  const value = useMemo(() => {
    return {
      quantities,
      setQuantities,
      products,
    };
  }, [quantities]);

  return (
    <OnchainStoreContext.Provider value={value}>
      {children}
    </OnchainStoreContext.Provider>
  );
}

export function useOnchainStoreContext() {
  return useContext(OnchainStoreContext);
}
