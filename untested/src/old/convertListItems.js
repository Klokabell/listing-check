"use strict";
// finds and extract text of list items, returns them as a single string
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertListItems = void 0;
const convertListItems = (component) => {
    const collection = component?.querySelectorAll("li");
    const listTextArray = collection
        ? Array.from(collection).map((item) => item.innerText)
        : null;
    return listTextArray?.join(". ") ?? listTextArray;
};
exports.convertListItems = convertListItems;
