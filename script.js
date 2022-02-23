//You can edit ALL of the code here
const rootTag = document.getElementById("root");

function setup() {
  const episodes = getAllEpisodes();
  //------------------Header-------------------
  const header = document.createElement("header");
  header.className = "header";
  //nav
  const nav = document.createElement("nav");
  nav.className = "nav";
  //nav menu
  const nav_menu_div = document.createElement("div");
  nav_menu_div.className = "nav_menu_div";
  const menu_ul = document.createElement("ul");
  menu_ul.className = "nav_ul";
  nav_menu_div.appendChild(menu_ul);
  let menuArr = ["Login", "Contact us", "News", "Offers"];

  const menu_li_1 = document.createElement("li");
  const menu_li_2 = document.createElement("li");
  const menu_li_3 = document.createElement("li");
  const menu_li_4 = document.createElement("li");
  let liArr = [menu_li_1, menu_li_2, menu_li_3, menu_li_4]
  for (let i = 0; i < menuArr.length; i++) {
    liArr[i].className = "nav_li";
    liArr[i].innerText = menuArr[i];
    menu_ul.appendChild(liArr[i])
  }

  //nav search
  const nav_search_div = document.createElement("div");
  nav_search_div.className = "nav_search_div";
  const nav_search = document.createElement("input");
  nav_search.className = "nav_search";
  nav_search_div.appendChild(nav_search);
  nav_search.value = "";
  nav_search.placeholder = "search...";

  nav_search.addEventListener("change", (e) => {
    handleSearch(e);
  })
  //nav select
  const nav_select_div = document.createElement("div");
  nav_select_div.className = "nav_select_div";
  const nav_select = document.createElement("select");
  nav_select_div.appendChild(nav_select);
  nav_select.value = "none";
  nav_select.className = "nav_select";
  //Hamburger BTN
  let burgerContainer = document.createElement("div");
  burgerContainer.className = "burger_container";
  let topDiv = document.createElement("div");
  topDiv.className = "top_burger";
  let middleDiv = document.createElement("div");
  middleDiv.className = "middle_burger";
  let bottomDiv = document.createElement("div");
  bottomDiv.className = "bottom_burger";
  burgerContainer.append(topDiv, middleDiv, bottomDiv);

  //Creating header by appending the children
  header.appendChild(nav);
  nav.append(burgerContainer, nav_menu_div, nav_select_div, nav_search_div);
  //--------------------------Main
  //Nav SVG
  const wave = document.createElement("img");
  wave.src = "./svg/wave.svg";
  wave.className = "nav_svg";
  header.appendChild(wave);

  //----------Creating Main-------

  const episodesArticle = document.createElement("article");
  rootTag.append(header, episodesArticle);
  episodesArticle.className = "episodes";

  //------Showing all the episodes
  episodes.forEach(obj => {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<h1>S${String(obj.season).padStart(2,0)}E${String(obj.number).padStart(2,0)}</h1><div><img src=${obj.image.medium} /></div><span>Hover for a summery</span><div class='overlay'>${obj.summary}</div>`;
    newDiv.className = "episode";
    episodesArticle.appendChild(newDiv);
  });


















}



window.onload = setup;