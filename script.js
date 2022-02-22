//You can edit ALL of the code here
const rootTag = document.getElementById("root");

function setup() {
  const Episodes = getAllEpisodes();
  //------------------Header-------------------
  const header = document.createElement("header");
  header.className = "header";
  //nav
  const nav = document.createElement("nav");
  nav.className = "nav";
  //nav menu
  const nav_menu_div = document.createElement("div");
  nav_menu_div.className = "nav_menu_div";
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
  //Creating header by appending the children
  header.appendChild(nav);
  nav.append(nav_menu_div, nav_search_div, nav_select_div);
  //--------------------------Main
  //Nav SVG
  const wave = document.createElement("img");
  wave.src = "./svg/wave.svg";
  wave.className = "nav_svg";
  header.appendChild(wave);



  const episodesArticle = document.createElement("article");
  rootTag.append(header, episodesArticle);


















}



window.onload = setup;