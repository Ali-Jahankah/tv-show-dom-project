//You can edit ALL of the code here
const rootTag = document.getElementById("root");
const allShows = getAllShows();
const random = Math.floor(Math.random() * 10) + 1;
const randomShowId = allShows[random].id;

const gettingData = (showId) => {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(data => {
      render(data, allShows);
    })
    .catch(er => {
      console.log(er)

    })
}

function render(episodes, allShows) {
  //======================================================Creating title
  console.log(episodes);
  const createTitle = (season, num, name) => {
    return `S${String(season).padStart(2,0)}E${String(num).padStart(2,0)} - ${name}`;
  }
  //----------=======================================================--------Header-------------------
  let myEpisodes = episodes;
  const header = document.createElement("header");
  header.className = "header";
  //==========================================================================Nav
  const nav = document.createElement("nav");
  nav.className = "nav";
  //=========================================================================Nav menu
  const nav_menu_div = document.createElement("div");
  nav_menu_div.className = "nav_menu_div";
  const menu_ul = document.createElement("ul");
  const logo = document.createElement("h1");
  logo.className = "logo";
  logo.innerText = "TV Show";
  menu_ul.className = "nav_ul";
  let menuArr = ["Login", "Contact", "News", "Offers"];

  const menu_li_1 = document.createElement("li");
  const menu_li_2 = document.createElement("li");
  const menu_li_3 = document.createElement("li");
  const menu_li_4 = document.createElement("li");
  let liArr = [menu_li_1, menu_li_2, menu_li_3, menu_li_4]
  for (let i = 0; i < menuArr.length; i++) {
    liArr[i].className = "nav_li";
    liArr[i].innerHTML = `<a href=#${menuArr[i]} class=nav_link>${menuArr[i]}</a>`;
    menu_ul.appendChild(liArr[i]);

  }
  //============================================================Nav input containter-------------------
  const nav_input_div = document.createElement("div");
  nav_input_div.className = "nav_input_div";

  //=========================================================================nav search

  const nav_search = document.createElement("input");
  nav_search.className = "nav_search";


  nav_search.value = "";
  nav_search.placeholder = "search...";
  //==================================================Event listener for the search input

  nav_search.addEventListener("input", (e) => {

    const newArr = myEpisodes.filter(obj => {
      return obj.summary.includes(e.target.value) || obj.name.includes(e.target.value)
    });
    episodesHandler(newArr);
  })
  //===============================================================================nav select

  const nav_select = document.createElement("select");

  nav_select.className = "nav_select";
  const creatingEpisodes = (arr) => {
    nav_select.innerHTML = "";
    arr.forEach(item => {
      let newOption = document.createElement("option");

      newOption.value = item.name;
      newOption.innerText = createTitle(item.season, item.number, item.name);

      nav_select.appendChild(newOption);


    });
    let noneValueOption = document.createElement("option");
    noneValueOption.value = "none";
    noneValueOption.selected = true;
    noneValueOption.innerText = "None";
    nav_select.appendChild(noneValueOption)
  }
  creatingEpisodes(myEpisodes);

  //========================================================================Event listener for the select tag
  nav_select.addEventListener("change", () => {
    const newArr = myEpisodes.filter(item => {
      return item.name === nav_select.value;
    });
    nav_search.value = "";
    newArr.length === 0 ? episodesHandler(myEpisodes) : episodesHandler(newArr)
  })
  //=======================================================================Nav select for all tv shows
  const allShowsSelect = document.createElement("select");
  allShowsSelect.className = "nav_shows_select";
  const sortedShow = allShows.sort((a, b) => a.name.localeCompare(b.name));
  console.log(sortedShow);
  sortedShow.forEach(item => {
    const newOpt = document.createElement("option");
    newOpt.value = item.id;
    newOpt.innerText = item.name;
    allShowsSelect.appendChild(newOpt);
  });
  allShowsSelect.addEventListener("change", (e) => {
    fetch(`https://api.tvmaze.com/shows/${e.target.value}/episodes`)
      .then(res => {
        if (res && res.ok) {
          return res.json()
        }
      })
      .then(data => {
        myEpisodes = data;
        creatingEpisodes(data);
        return episodesHandler(data)
      })
  })
  nav_input_div.append(nav_search, nav_select, allShowsSelect);
  //==============================================================================Hamburger BTN
  let burgerContainer = document.createElement("div");
  burgerContainer.className = "burger_container";
  let topDiv = document.createElement("div");
  topDiv.className = "top_burger";
  let middleDiv = document.createElement("div");
  middleDiv.className = "middle_burger";
  let bottomDiv = document.createElement("div");
  bottomDiv.className = "bottom_burger";
  burgerContainer.append(topDiv, middleDiv, bottomDiv);
  //======================================================================================Hamburger Menu-------
  const burgerMenu = document.createElement("div");
  burgerMenu.className = "burger_menu";
  burgerContainer.addEventListener("click", () => {
    burgerMenu.classList.toggle("moving_menu");
  });
  header.appendChild(burgerMenu);


  nav_menu_div.append(menu_ul, logo);
  burgerMenu.appendChild(menu_ul.cloneNode(true));
  //======================================================================Creating header by appending the children
  header.appendChild(nav);
  nav.append(burgerContainer, nav_menu_div, nav_input_div);
  //---------------------============================================================-----Main
  //=====================================================================================Nav SVG
  const wave = document.createElement("img");
  wave.src = "./svg/wave.svg";
  wave.className = "nav_svg";


  //-------=============================================================================---Creating Main-------
  const mainTag = document.createElement("main");
  mainTag.className = "main";
  const episodesArticle = document.createElement("article");


  rootTag.append(header, mainTag);
  episodesArticle.className = "episodes";
  const totalEpisodesCounter = document.createElement("h3");


  //---===========================================================---Showing all the episodes in body =====================
  const episodesHandler = (arr) => {

    while (episodesArticle.hasChildNodes()) {
      episodesArticle.removeChild(episodesArticle.lastChild);

    }
    if (arr.length === 0) {
      totalEpisodesCounter.innerHTML = "";
      return episodesArticle.innerHTML = "<h1 style='text-align:center ; width:100%'>Ooops, Sorry nothing found!</h1>"
    }
    totalEpisodesCounter.innerHTML = `Total Parts: ${arr.length}/${myEpisodes.length}`;
    mainTag.append(wave, totalEpisodesCounter, episodesArticle);

    arr.forEach(obj => {

      let newDiv = document.createElement("div");

      newDiv.innerHTML = `<h1>Part: S${String(obj.season).padStart(2,0)}E${String(obj.number).padStart(2,0)}</h1><div><img src=${obj.image?obj.image.medium:'https://thumbs.dreamstime.com/z/error-page-not-found-background-template-skull-bones-error-page-not-found-background-template-skull-bones-yellow-black-132817880.jpg'}  /></div><span> ${obj.name}</span><div class='overlay'>${obj.summary}</div>`;
      newDiv.className = "episode";
      episodesArticle.appendChild(newDiv);

    });


  }
  episodesHandler(myEpisodes);

  // Creating Footer -----------
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `<h1>GitHub: <a href='https://github.com/Ali-Jahankah'><img src='./img/DepressiveAli.png' alt='footer image' /></a></h1><h1>Made by Ali Jahankah | 2022</h1><h3>Data is coming from <a href='https://tvmaze.com'>TV Maze</a></h5>`;
  rootTag.appendChild(footer);

}



window.onload = gettingData(randomShowId);