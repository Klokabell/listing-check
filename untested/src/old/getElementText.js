"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementText = void 0;
const getElementText = (id) => {
    const el = document.getElementById(id);
    return el ? el.textContent : null;
};
exports.getElementText = getElementText;
