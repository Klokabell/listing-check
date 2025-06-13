export const checkSkillsType = (skillsContainer: Element) => {
  const sortedSkills = skillsContainer.querySelectorAll(
    ".job-details-how-you-match__skills-item-wrapper"
  );

  if (sortedSkills && sortedSkills.length > 0) {
    console.log("sortedSkills", sortedSkills);
    return sortedSkills;
  } else {
    const unsortedSkillsNodeList = skillsContainer.querySelectorAll(
      'a[data-test-app-aware-link=""]'
    );
    if (unsortedSkillsNodeList) {
      let unsortedSkills = null;
      unsortedSkillsNodeList.forEach((node) => {
        console.log("unsortedSkillsNode", node);
        const parentEl = node.parentElement;
        if (parentEl == null) return;
        if (parentEl.tagName == "LI") return;
        const isCorrectAnchor = parentEl.querySelector("h3.t-16.t-bold");
        if (isCorrectAnchor) unsortedSkills = node;
      });
      console.log("unsortedSkills", unsortedSkills);
      return unsortedSkills;
    } else {
      console.log("no skills element");
      return null;
    }
  }
};

// <a class="PDuZgTTJniSbcpBCzeHjMlcFFsgCxLEhvw  job-details-how-you-match__skills-section-descriptive-skill t-14" href="#" data-test-app-aware-link=""
