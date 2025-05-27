import { checkSkillsType } from "../helpers/checkSkillsType";
import { renderSkills } from "../rendering/renderSkills";

export const handleSkillsField = async (
  skillsContainer: Element,
  isRendered: { [key: string]: boolean }
) => {
  if (skillsContainer == null) return;

  const skillsElement = checkSkillsType(skillsContainer);
  if (skillsElement === null) return null;
  else {
    const renderState = renderSkills(skillsElement);
    if (renderState) isRendered.skills = true;
  }
};
