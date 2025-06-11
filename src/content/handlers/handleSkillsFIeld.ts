import { checkSkillsType } from "../helpers/checkSkillsType";
import { createStringElement } from "../helpers/renderHelpers";
import { renderSkills } from "../rendering/renderSkills";

export const handleSkillsField = async (
  skillsContainer: Element,
  isRendered: { [key: string]: boolean }
) => {
  if (skillsContainer == null) return;

  const skillsElement = checkSkillsType(skillsContainer);
  if (skillsElement === null){
    createStringElement("No Skills Element Found", "skills")
  }
  else {
    const renderState = renderSkills(skillsElement);
    if (renderState) isRendered.skills = true;
  }
};
