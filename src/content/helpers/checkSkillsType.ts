export const checkSkillsType = (skillsContainer: Element) => {
  const sortedSkills = skillsContainer.querySelectorAll(
    ".job-details-how-you-match__skills-item-wrapper"
  );

  if (sortedSkills && sortedSkills.length > 0) {
    console.log("sortedSkills", sortedSkills);
    return sortedSkills;
  } else {
    const unsortedSkills = skillsContainer.querySelector(
      'a[data-test-app-aware-link=""]'
    );
    if (unsortedSkills) {
      console.log("unsortedSkills", unsortedSkills);
      return unsortedSkills;
    } else {
      console.log("no skills element");
      return null;
    }
  }
};
