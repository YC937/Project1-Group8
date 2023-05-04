var playerEl = document.querySelector("#search");
var clear = document.querySelector("#clear");
var image = document.querySelector("#image");
var pict = document.querySelector("#pic")
var firstNamePlayer = document.querySelector("#first-name");
var lastNamePlayer = document.querySelector("#last-name");
var burgerIcon = document.querySelector("#burger");
var navbarMenu = document.querySelector("#nav-links");
var team = document.querySelector('#team');
var conference = document.querySelector('#conference');
var division = document.querySelector('#division');
var position = document.querySelector('#position');
var height = document.querySelector('#height');
var inches = document.querySelector('#inches');
var weight = document.querySelector('#weight');
var points = document.querySelector('#points');
var assists = document.querySelector('#assists');
var rebounds = document.querySelector('#rebounds');
var steals = document.querySelector('#steals');
var turnovers = document.querySelector('#turnovers');
var resultsBox = document.querySelector("#results-box");
var feedback = document.querySelector("#feedback");
var modal = document.querySelector(".modal");
var submit = document.querySelector("#submit");


var links = [];

//Initial function.
function init() {

//Modal for season's year
feedback.addEventListener("click", function () {
  modal.classList.add("is-active");
})

submit.addEventListener("click", function () {
  modal.classList.add("is-active");
})

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
})

  fetch(`https://api.giphy.com/v1/gifs/search?q=NBA&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
    var giff = randomItem.images.original.url;
    var ghiph = document.createElement("img");
    ghiph.src = giff;
    image.append(ghiph);
    links.push(giff);
  })
  var basketballPlayerList = [];
  basketballPlayerList = JSON.parse(localStorage.getItem("searchedPlayers"));
if(basketballPlayerList !== null) {
  for(var i = 0; i < basketballPlayerList.length; i++) {
    var listEl = document.createElement("button");
    listEl.textContent = basketballPlayerList[i];
    listEl.setAttribute("class", "columns is-vcentered button has-background-danger");
    resultsBox.append(listEl);

    listEl.addEventListener("click", searchHistoryBtn);
  }
  
}
};

//Function when we click previous searched players and we display data on the website
function searchHistoryBtn () {
  image.innerHTML = " ";
console.log(this.textContent);
var basketballName = (this.textContent);

fetch(`https://api.giphy.com/v1/gifs/search?q=${basketballName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
.then(function (response) {
  return response.json();
})
.then(function (info) {
  console.log(info);
  var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
  var giffi = randomItem.images.original.url;
  links.push(giffi);
  var ghiphi = document.createElement("img");
  for(var i = 0; i < links.length; i++) {
  ghiphi.src = links[i];
  }
  console.log(links);
  image.append(ghiphi);
})

//Fetching info from api.
fetch(`https://www.balldontlie.io/api/v1/players?search=${basketballName}`)
  .then(function (answer) {
    return answer.json();
  })
  .then(function (data) {
    console.log(data)
    team.textContent = data.data[0].team.full_name
    conference.textContent = data.data[0].team.conference
    division.textContent = data.data[0].team.division
    position.textContent = data.data[0].position
    height.textContent = data.data[0].height_feet
    inches.textContent = data.data[0].height_inches
    weight.textContent = data.data[0].weight_pounds
    profile.push(data.data[0].id);
    for(var i = 0; i < profile.length; i++){
     playerStats = profile[i];
    }
    
    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerStats}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
      console.log(info)
      points.textContent = info.data[0].pts
      assists.textContent = info.data[0].ast
      rebounds.textContent = info.data[0].reb
      steals.textContent = info.data[0].stl
      turnovers.textContent = info.data[0].turnover

    })
  })
  
};


//Mobile Menu
burgerIcon.addEventListener("click", getMenu);

function getMenu() {
    navbarMenu.classList.toggle("is-active")
}



var profile = [];

playerEl.addEventListener("click", function () {
  image.innerHTML = "";
  links.length = 0;
  var firstName = firstNamePlayer.value
  if(firstName === "") {
    location.reload();
    list.remove();
  }
  var lastName = lastNamePlayer.value
  if(lastName === "") {
    location.reload();
    list.remove();
  }
fetch(`https://www.balldontlie.io/api/v1/players?search=${firstName}+${lastName}`)
  .then(function (answer) {
    return answer.json();
  })
  .then(function (data) {
    console.log(data);
    team.textContent = data.data[0].team.full_name
    conference.textContent = data.data[0].team.conference
    division.textContent = data.data[0].team.division
    position.textContent = data.data[0].position
    height.textContent = data.data[0].height_feet
    inches.textContent = data.data[0].height_inches
    weight.textContent = data.data[0].weight_pounds
    profile.push(data.data[0].id);
    for(var i = 0; i < profile.length; i++){
     playerStats = profile[i];
    }
    
    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerStats}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (info) {
      console.log(info)
      points.textContent = info.data[0].pts
      assists.textContent = info.data[0].ast
      rebounds.textContent = info.data[0].reb
      steals.textContent = info.data[0].stl
      turnovers.textContent = info.data[0].turnover

    })
  })
  fetch(`https://api.giphy.com/v1/gifs/search?q=${firstName}+${lastName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    console.log(info)
    var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
    // console.log(randomItem.images.original.url);
    var giffy = randomItem.images.original.url;
    links.push(giffy);
    var ghiphy = document.createElement("img");
    ghiphy.src = links;
    image.append(ghiphy);
  })

  var playerList = JSON.parse(localStorage.getItem("searchedPlayers")) || [];
playerList.push(firstNamePlayer.value + " " + lastNamePlayer.value);
localStorage.setItem("searchedPlayers",JSON.stringify(playerList));
//Displaying the cities in the local storage into the website.
for(var i = 0; i < playerList.length; i++) {
  var playerList = [];
  playerList.push(firstNamePlayer.value + " " + lastNamePlayer.value);
  //Creating buttons with our past searched cities.
  var list = document.createElement("button");
  list.textContent = playerList[i];
  //Setting attributes to those buttons.
  list.setAttribute("class", "columns is-vcentered button has-background-danger");
  // list.setAttribute("style", "background-color: rgb(9, 133, 235); color: aliceblue; border-style: hidden; margin-top: 2%")
  //Appending these buttons into the section.
  resultsBox.append(list);

  list.addEventListener("click", searchBtn);

  function searchBtn () {

    image.innerHTML = " ";
    console.log(this.textContent);
    var basketballName = (this.textContent);
    
    fetch(`https://api.giphy.com/v1/gifs/search?q=${basketballName}&api_key=fxEW2ambgr9GHTzx6iXmXJKl5Zss1Fma&limit=1000`)
    .then(function (response) {
      return response.json();
    })
    .then(function (info) {
      console.log(info);
      var randomItem = info.data[Math.floor(Math.random()*info.data.length)];
      var giffi = randomItem.images.original.url;
      links.push(giffi);
      var ghiphi = document.createElement("img");
      for(var i = 0; i < links.length; i++) {
      ghiphi.src = links[i];
      }
      console.log(links);
      image.append(ghiphi);
    })
    
    //Fetching info from api.
    fetch(`https://www.balldontlie.io/api/v1/players?search=${basketballName}`)
      .then(function (answer) {
        return answer.json();
      })
      .then(function (data) {
        console.log(data)
        team.textContent = data.data[0].team.full_name
        conference.textContent = data.data[0].team.conference
        division.textContent = data.data[0].team.division
        position.textContent = data.data[0].position
        height.textContent = data.data[0].height_feet
        inches.textContent = data.data[0].height_inches
        weight.textContent = data.data[0].weight_pounds
        profile.push(data.data[0].id);
        for(var i = 0; i < profile.length; i++){
         playerStats = profile[i];
        }
        
        fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerStats}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (info) {
          console.log(info)
          points.textContent = info.data[0].pts
          assists.textContent = info.data[0].ast
          rebounds.textContent = info.data[0].reb
          steals.textContent = info.data[0].stl
          turnovers.textContent = info.data[0].turnover
    
        })
      })

  }


}});


init();