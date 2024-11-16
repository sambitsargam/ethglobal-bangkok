import { useCallback } from 'react';
import { COINBASE_COMMERCE_API_KEY } from 'src/config';
import { COMMERCE_API_URL } from 'src/links';

type Price = {
  amount: string;
  currency: string;
};
export type ChargeDetails = {
  name?: string;
  description?: string;
  pricing_type?: string;
  local_price?: Price;
};

const useCreateCharge = () => {
  const createCharge = useCallback(async (chargeDetails: ChargeDetails) => {
    try {
      const res = await fetch(`${COMMERCE_API_URL}/charges`, {
        method: 'POST',
        body: JSON.stringify(chargeDetails),
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': COINBASE_COMMERCE_API_KEY,
        },
      });
      const { data } = await res.json();
      return data.id;
    } catch (error) {
      console.error('Error creating charge:', error);
      throw error;
    }
  }, []);

  return { createCharge };
};

export default useCreateCharge;
