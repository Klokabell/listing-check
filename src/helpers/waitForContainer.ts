export const waitForSourceContainer = (selector: string): Promise<Element> => {
  return new Promise((res, rej) => {
    const startTime = Date.now();

    const checkForContainer = () => {
      const container = document.querySelector(selector);
      if (container) {
        console.log("container found");
        res(container);
      } else if (Date.now() - startTime > 6000) {
        rej(new Error(`Timed out waiting for ${selector}`));
      } else {
        console.log("rechecking for source container");
        setTimeout(checkForContainer, 100);
      }
    };
    checkForContainer();
  });
};
