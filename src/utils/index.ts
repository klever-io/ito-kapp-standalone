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
