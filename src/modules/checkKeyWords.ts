export const checkKeyWords = (sentence: string) => {
  if (/english/i.test(sentence)) {
    console.log("match");
    return true;
  } else return false;
};
