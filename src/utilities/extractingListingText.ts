import { punctuationRegex } from "./regexUtilities";

export const extractingListingText = (component: HTMLElement | null) => {
  if (!component) return null;

  const mt4Div = component.querySelector(".mt4");
  const parentPElement = mt4Div?.querySelector("p");
  const spanList = parentPElement?.querySelectorAll("span");

  const extractedTextArray: string[] = [];

  spanList?.forEach((span) => {
    const paragraphChild = span.querySelector("p");
    const uListChild = span.querySelector("ul");

    if (paragraphChild) {
      let text = paragraphChild.innerText.trim();
      if (text.length === 0) return;
      if (!punctuationRegex.test(text.trim())) text += ".";
      extractedTextArray.push(text);
    } else if (uListChild) {
      const listItems = uListChild.querySelectorAll("li");
      listItems.forEach((item) => {
        let text = item.innerText.trim();
        if (text.length === 0) return;
        if (!punctuationRegex.test(text.trim())) text += ".";
        extractedTextArray.push(text);
      });
    }
  });

  return extractedTextArray.join(" ");
};
