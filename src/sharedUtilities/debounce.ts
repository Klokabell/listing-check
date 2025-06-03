export const debounce = (fn: () => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay);
  };
};
