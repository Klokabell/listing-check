export const createSentenceArray = (keyword: string, text: string) => {
  const regex = new RegExp(`[^.?!]*\\b${keyword}\\b[^.?!]*[.?!]`, "gi");
  return text.match(regex) || null;
};
