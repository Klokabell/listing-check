export const fieldKeyArray = [
  "company",
  "title",
  "location",
  "skills",
  "languages",
];
export const listingSelector =
  "#main > div > div.scaffold-layout__list-detail-inner.scaffold-layout__list-detail-inner--grow > div.scaffold-layout__detail.overflow-x-hidden.jobs-search__job-details > div > div.jobs-search__job-details--container > div > div.job-view-layout.jobs-details > div:nth-child(1) > div";
export const secondaryListingSelector =
  ".jobs-details__main-content jobs-details__main-content--single-pane";

export const sourceSelectors: { [key: string]: string } = {
  title: ".t-24.job-details-jobs-unified-top-card__job-title",
  company: ".job-details-jobs-unified-top-card__company-name a",
  location:
    ".t-black--light.mt2.job-details-jobs-unified-top-card__tertiary-description-container > span:nth-child(1)",
  languages: '#job-details .mt4 p[dir="ltr"]',
  skills: "#how-you-match-card-container",
};

export const destinationSelectors: { [key: string]: string } = {
  panel: "#panel_container",
  company: "#company_container",
  title: "#title_container",
  location: "#location_container",
  skills: "#skills_container",
  languages: "#languages_container",
};

export const observerConfig = {
  childList: true,
  subtree: true,
  characterData: true,
};

const skillsBase =
  "#how-you-match-card-container > section:nth-child(2) > div > div.pt5";

export const parentSelectors = {
  title: ".t-24 t-bold inline",
  company: ".job-details-jobs-unified-top-card__company-name",
  location:
    "t-black--light mt2 job-details-jobs-unified-top-card__tertiary-description-container",
  skillsGeneral: skillsBase,
  skillsMatch: `${skillsBase} > div:nth-child(3) > div`,
  skillsMiss: `${skillsBase} > div:nth-child(4)`,
};

export const skillsSelectors = {
  unsorted: "a.job-details-how-you-match__skills-section-descriptive-skill",
  sorted: "a.job-details-how-you-match__skills-item-subtitle",
};
