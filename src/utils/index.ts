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
