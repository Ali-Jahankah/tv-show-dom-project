//You can edit ALL of the code here
const rootTag = document.getElementById("root");
const mainTag = document.createElement("main");
mainTag.className = "main";
const articleTag = document.createElement("article");
articleTag.className = "render_article";
const counterTag = document.createElement("h1");
counterTag.className = "counter";
mainTag.append(counterTag, articleTag);
const loader = document.createElement("img");
const loaderContainer = document.createElement("div");
loaderContainer.className = "loader_container";
loaderContainer.innerHTML = `<img src='./img/loader.jpg' class='loader' />`;

const createTitle = (season, num, name) => {
  return `S${String(season).padStart(2,0)}E${String(num).padStart(2,0)} - ${name}`;
}


const gettingData = () => {
  rootTag.appendChild(loaderContainer);
  const allTvShows = getAllShows();
  tvshowsRender(allTvShows);
}

function renderEpisodes(episodes, allShows) {
  articleTag.classList.remove("shows");
  articleTag.classList.add("episodes_render");
  //======================================================Creating title
  const episodesArray = episodes;
  counterTag.innerText = `Found ${episodes.length} Result(s) `


  //---===========================================================---Showing all the episodes in body =====================


  while (articleTag.hasChildNodes()) {
    articleTag.removeChild(articleTag.lastChild);

  }
  if (episodesArray.length === 0) {
    return articleTag.innerHTML = "<h1 style='text-align:center ; width:100%'>Ooops, Sorry nothing found! :(((</h1>"
  }

  episodesArray.forEach(obj => {

    let newDiv = document.createElement("div");

    newDiv.innerHTML = `<h1>Part: S${String(obj.season).padStart(2,0)}E${String(obj.number).padStart(2,0)}</h1><div><img class='episode_img' src=${obj.image?obj.image.medium:'https://thumbs.dreamstime.com/z/error-page-not-found-background-template-skull-bones-error-page-not-found-background-template-skull-bones-yellow-black-132817880.jpg'}  /></div><span> ${obj.name}</span><div class='overlay'>${obj.summary?obj.summary:"Summary is not available!"}</div>`;
    const fav_btn = document.createElement("img");
    fav_btn.className = "fav_btn";
    fav_btn.src = "./svg/fav.svg";
    fav_btn.addEventListener("click", (e) => e.target.src = "./svg/like.svg");
    newDiv.appendChild(fav_btn);
    newDiv.className = "episode";
    articleTag.appendChild(newDiv);

  });






}
const showTvshows = (arr) => {
  articleTag.classList.remove("episodes_render");
  articleTag.classList.add("shows");
  counterTag.innerText = `found ${arr.length} Result(s)`
  articleTag.innerHTML = "";
  arr.forEach(obj => {

    const showCard = document.createElement("div");
    showCard.className = "show_card";
    const showContainer = document.createElement("div");
    showContainer.className = "show_container";
    const showTitle = document.createElement("h1");
    showTitle.innerText = obj.name;
    const detailDiv = document.createElement("div");
    detailDiv.innerHTML = `<ul><li>Genres: ${obj.genres?obj.genres.join(" | "):console.log(obj)}</li><li>Status: ${obj.status}</li><li>Rating: ${obj.rating.average}</li><li>Time: ${obj.runtime} Minutes</li></ul>`
    const imgDiv = document.createElement("div");
    const showImg = document.createElement("img");
    showImg.src = obj.image ? obj.image.medium : 'https://thumbs.dreamstime.com/z/error-page-not-found-background-template-skull-bones-error-page-not-found-background-template-skull-bones-yellow-black-132817880.jpg';
    imgDiv.appendChild(showImg);
    detailDiv.className = "show_detail_div";
    imgDiv.className = "show_img_div";
    const showOverlay = document.createElement("div");
    showOverlay.innerHTML = obj.summary;
    showOverlay.className = "show_overlay";
    showContainer.append(imgDiv, detailDiv)
    showCard.append(showTitle, showContainer, showOverlay);
    articleTag.appendChild(showCard);

  })
}

const tvshowsRender = (tvshowsArray) => {
  window.setTimeout(() => {
    loaderContainer.classList.add("hide_loader");
  }, 1000)

  //----------=======================================================--------Header-------------------
  let myStorage = tvshowsArray;
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
    let searchValue = e.target.value.toLowerCase();
    const filteredArr = myStorage.filter(obj => {

      if (obj.genres || obj.status || obj.rating) {
        if (obj.summary && obj.summary.length > 1) {
          return obj.summary.includes(searchValue) || obj.name.includes(searchValue)
        }

      } else if (obj.summary && obj.name) {
        return obj.summary.includes(searchValue) || obj.name.includes(searchValue)
      } else {
        obj.name.toLowerCase().includes(searchValue)
      }

    });

    myStorage === tvshowsArray ? showTvshows(filteredArr) : renderEpisodes(filteredArr);


  })

  //===============================================================================nav select


  const creatingEpisodes = (arr) => {
    if (nav_input_div.childNodes.length === 3) {
      nav_input_div.removeChild(nav_input_div.lastChild);
    }
    if (arr) {
      const episodesSelectTag = document.createElement("select");

      episodesSelectTag.className = "nav_select";
      arr.forEach(item => {
        let newOption = document.createElement("option");

        newOption.value = item.name;
        newOption.innerText = createTitle(item.season, item.number, item.name);

        episodesSelectTag.appendChild(newOption);


      });
      let noneValueOption = document.createElement("option");
      noneValueOption.value = "none";
      noneValueOption.selected = true;
      noneValueOption.innerText = "None";
      episodesSelectTag.appendChild(noneValueOption);
      //========================================================================Event listener for the select tag
      episodesSelectTag.addEventListener("change", () => {
        const newArr = myStorage.filter(item => {
          return item.name === episodesSelectTag.value;
        });
        nav_search.value = "";
        newArr.length === 0 ? renderEpisodes(myStorage) : renderEpisodes(newArr)
      })
      nav_input_div.appendChild(episodesSelectTag);
    }

  }


  //==========================================================Nav select for all tv shows
  const allShowsSelect = document.createElement("select");
  allShowsSelect.className = "nav_shows_select";
  const sortedShow = myStorage.sort((a, b) => a.name.localeCompare(b.name));
  const allShowsOption = document.createElement("option");
  allShowsOption.innerText = "All TV Shows";
  allShowsOption.value = "alltvshows";
  allShowsSelect.appendChild(allShowsOption);
  sortedShow.forEach(item => {
    const newOpt = document.createElement("option");
    newOpt.value = item.id;
    newOpt.innerText = item.name;
    allShowsSelect.appendChild(newOpt);
  });
  allShowsSelect.addEventListener("change", (e) => {
    if (e.target.value !== "alltvshows") {
      fetch(`https://api.tvmaze.com/shows/${e.target.value}/episodes`)
        .then(res => {
          if (res && res.ok) {
            return res.json()
          }
        })
        .then(data => {
          myStorage = data;
          creatingEpisodes(data);

          return renderEpisodes(data)
        })
    } else {
      myStorage = tvshowsArray;
      creatingEpisodes();
      showTvshows(myStorage);
    }

  })
  nav_input_div.append(nav_search, allShowsSelect);
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
  rootTag.append(header, mainTag);
  //---------------------============================================================-----Main
  //=====================================================================================Nav SVG
  const wave = document.createElement("img");
  wave.src = "./svg/wave.svg";
  wave.className = "nav_svg";
  mainTag.appendChild(wave);
  // Creating Footer -----------
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `<h1>GitHub: <a href='https://github.com/Ali-Jahankah'><img src='./img/DepressiveAli.png' alt='footer image' /></a></h1><h1>Made by Ali Jahankah | 2022</h1><h3>Data is coming from <a href='https://tvmaze.com'>TV Maze</a></h5>`;
  rootTag.appendChild(footer);
  showTvshows(myStorage);


}


window.onload = gettingData();