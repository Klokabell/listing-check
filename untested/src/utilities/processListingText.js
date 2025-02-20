"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractComponentText = void 0;
const extractComponentText = (component) => {
    if (!component)
        return null;
    const sentences = [];
    const traverseNodes = (node, sentences) => {
        if (node.nodeType === Node.TEXT_NODE) {
            console.log("nodetype exists");
            const textContent = node.textContent?.trim();
            if (textContent) {
                console.log("textcontent exists");
                sentences.push(textContent); // Add text to the array
            }
        }
        else if (node.nodeType === Node.ELEMENT_NODE) {
            console.log("elementnode exists");
            const el = node;
            if (el.tagName === "BR") {
                sentences.push("\n");
            }
            else {
                el.childNodes.forEach((childNode) => traverseNodes(childNode, sentences));
            }
        }
    };
    traverseNodes(component, sentences);
    const joinedString = sentences.join(" ");
    return joinedString.replace(/([.?!,;:])(?![\s\n])/g, "$1 ");
};
exports.extractComponentText = extractComponentText;
