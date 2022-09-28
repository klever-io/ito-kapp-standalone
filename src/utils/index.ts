import api from 'services/api';
import { toast } from 'react-toastify';

export const getPrecision = async (
  asset: string,
): Promise<number | undefined> => {
  if (asset === 'KLV' || asset === 'KFI') return 10 ** 6;

  const response = await api.get({ route: `assets/${asset}` });

  if (response.error) {
    const messageError =
      response.error.charAt(0).toUpperCase() + response.error.slice(1);
    toast.error(messageError);
    return;
  }

  return 10 ** response.data.asset.precision;
};

export const parseAddress = (address: string, maxLen: number): string => {
  return address.length > maxLen
    ? `${address.slice(0, maxLen / 2)}...${address.slice(-(maxLen / 2))}`
    : address;
};

export const asyncDoIf = async (
  success: () => any,
  failure: () => any,
  condition: () => boolean,
  tries = 10,
): Promise<void> => {
  const array = Array.from({ length: tries }, (_, i) => i);

  for (const i of array) {
    console.log(i);
    if (condition()) {
      success();
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  failure();
  return;
};

export const parseCamelCase = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase();
  });

export const isObject = (element: any): boolean =>
  typeof element === 'object' && !Array.isArray(element) && element !== null;

export const similarity = (s1: string, s2: string): number => {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }

  const longerLength: any = longer.length;

  if (longerLength === 0) {
    return 1.0;
  }

  return (
    ((longerLength - editDistance(longer, shorter)) /
      parseFloat(longerLength)) *
    100
  );
};

// Levenshtein algorithm
const editDistance = (s1: string, s2: string) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};
