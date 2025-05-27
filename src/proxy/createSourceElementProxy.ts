import { handleSimpleFields } from "../handlers/handleSimpleFields";
import { handleLanguagesField } from "../handlers/handleLanguagesField";
import { handleSkillsField } from "../handlers/handleSkillsFIeld";
import { SourceElementState } from "../types/interfaces";
import { isRendered } from "../sharedData/stateObjects";

export const createSourceElementProxy = (initialState: SourceElementState) => {
  let renderStateProxyHandler: ProxyHandler<SourceElementState> = {
    set: function (_target: SourceElementState, prop: string, value: Element) {
      if (!(prop in _target)) {
        throw new Error(
          `Error: not an existing property on proxy target: ${prop}`
        );
      }
      initialState[prop] = value;
      if (!isRendered[prop]) {
        switch (prop) {
          case "title":
          case "company":
          case "location":
            handleSimpleFields(value, prop, isRendered);
            break;
          case "skills":
            handleSkillsField(value, isRendered);
            break;
          case "languages":
            handleLanguagesField(value, isRendered);
            break;
        }
      }
      console.log("isRendered", isRendered);
      return true;
    },
  };
  return new Proxy(initialState, renderStateProxyHandler);
};
