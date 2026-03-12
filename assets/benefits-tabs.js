// Keyboard accessibility for benefits-ingredients-panel tabs

document.addEventListener("DOMContentLoaded", function () {
  const tablist = document.querySelector('.benefits-ingredients-tabs [role="tablist"]');
  if (!tablist) {
    console.log("Tablist not found");
    return;
  }

  const tabs = Array.from(tablist.querySelectorAll('button[role="tab"]'));
  const panels = tabs.map(tab => {
    const controls = tab.getAttribute("aria-controls");
    return controls ? document.getElementById(controls) : null;
  });
  console.log(
    "Tabs found:",
    tabs.map(t => t.textContent.trim())
  );

  // Find the initially active tab
  let activeTab = tabs.find(tab => tab.getAttribute("aria-selected") === "true") || tabs[0];
  setActiveTab(activeTab, false);

  function setActiveTab(newTab, focus = true) {
    tabs.forEach((tab, i) => {
      const isActive = tab === newTab;
      tab.classList.toggle("tab-active", isActive);
      tab.classList.toggle("tab-inactive", !isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
      if (isActive && focus) tab.focus();
      // Show/hide panels for non-Alpine fallback
      if (panels[i]) {
        panels[i].style.display = isActive ? "" : "none";
      }
    });
    activeTab = newTab;
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener("keydown", function (e) {
      console.log("Keydown event:", e.key, "on tab", tab.textContent.trim());
      let newIdx = idx;
      if (e.key === "ArrowRight") {
        newIdx = (idx + 1) % tabs.length;
        setActiveTab(tabs[newIdx]);
        e.preventDefault();
        console.log("Focus moved to:", tabs[newIdx].textContent.trim());
      } else if (e.key === "ArrowLeft") {
        newIdx = (idx - 1 + tabs.length) % tabs.length;
        setActiveTab(tabs[newIdx]);
        e.preventDefault();
        console.log("Focus moved to:", tabs[newIdx].textContent.trim());
      } else if (e.key === "Home") {
        setActiveTab(tabs[0]);
        e.preventDefault();
        console.log("Focus moved to first tab");
      } else if (e.key === "End") {
        setActiveTab(tabs[tabs.length - 1]);
        e.preventDefault();
        console.log("Focus moved to last tab");
      } else if (e.key === "Enter" || e.key === " ") {
        setActiveTab(tab);
        tab.click();
        e.preventDefault();
        console.log("Tab activated:", tab.textContent.trim());
      }
    });
    tab.addEventListener("click", function () {
      setActiveTab(tab);
      console.log("Tab clicked:", tab.textContent.trim());
    });
  });
});
