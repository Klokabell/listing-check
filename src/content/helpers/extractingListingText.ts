export const extractingListingText = (parentPElement: Element | null) => {
  if (!parentPElement) return null;

  const punctuationRegex: RegExp = /[.!?:;]$/;

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
