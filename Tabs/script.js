const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

console.log(tabs);
console.log(tabContents);

tabs.forEach((tab) => {
  console.log(tab.dataset.tabTarget);
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    console.log("This is, ", target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    target.classList.add("active");
  });
});
