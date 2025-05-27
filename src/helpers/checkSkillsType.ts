export const checkSkillsType = (skillsContainer: Element) => {
  const sortedSkills = skillsContainer.querySelectorAll(
    ".job-details-how-you-match__skills-item-wrapper"
  );

  if (sortedSkills && sortedSkills.length > 0) {
    return sortedSkills;
  } else {
    const unsortedSkills = skillsContainer.querySelector(
      'a[data-test-app-aware-link=""]'
    );
    if (unsortedSkills) {
      return unsortedSkills;
    } else return null;
  }
};
