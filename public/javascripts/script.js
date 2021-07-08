  const themeToggle = document.querySelector(
  '.switch input[type="checkbox"]'
);

const currentTheme = localStorage.getItem("theme");

class themeChange{

  constructor(data){
    this.data = data;
}

curTheme(currentTheme){
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  
    if (currentTheme === "dark") {
      themeToggle.checked = true;
    }
  }
}

switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

}

let theme = new themeChange();
theme.curTheme(currentTheme);
themeToggle.addEventListener("change", theme.switchTheme, false);

 










