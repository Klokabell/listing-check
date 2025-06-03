export const collapseBtn = (id: string) => {
  const collapseBtn = document.createElement("button");
  collapseBtn.type = "button";
  collapseBtn.className = "collapse-btn closed";
  collapseBtn.id = id;
  return collapseBtn;
};
