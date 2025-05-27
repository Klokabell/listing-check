/* import { handleSimpleFields } from "../handlers/handleSimpleFields";
import { handleLanguagesField } from "../handlers/handleLanguagesField";
import { handleSkillsField } from "../handlers/handleSkillsFIeld";
import { StateObject } from "../types/interfaces";

export const createSourceElementProxy = (initialState: StateObject) => {
  console.log("proxy creator called");
  let renderStateProxyHandler: ProxyHandler<StateObject> = {
    set: function (_target: StateObject, prop: string, value: Element) {
      const field = _target[prop as keyof StateObject];
      if (!field) return false;
      field.sourceElementState = value;
      if (!field.isRendered) {
        console.log("passing to render switch");
        switch (prop) {
          case "title":
          case "company":
          case "location":
            handleSimpleFields(value, prop);
            break;
          case "skills":
            handleSkillsField(value);
            break;
          case "languages":
            handleLanguagesField(value);
            break;
        }
      }

      return true;
    },
  };
  return new Proxy(initialState, renderStateProxyHandler);
};
 */