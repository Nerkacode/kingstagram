const signIn = document.getElementById("login_button");
const createUser = document.getElementById("createUser_button");
//const login = document.getElementById("login_btn");
let cardDeck = document.getElementById("card-deck")
let token;
let nickname;

document.getElementById("login_fields").style.display = "none";

signIn.addEventListener("click", e => {
  document.getElementById("createNewUser_fields").style.display = "none";
  document.getElementById("login_fields").style.display = "inline";
});

// createUser.addEventListener("click", e => {
//  createNewUser();
// });

function createNewUser() {
  var url = "http://localhost:3000/api/user";
  let emailValue = document.getElementById("emailValue").value;
  let fullnameValue = document.getElementById("fullnameValue").value;
  let nicknameValue = document.getElementById("nicknameValue").value;
  let passwordValue = document.getElementById("passwordValue").value;
  let data = {
    email: emailValue,
    name: fullnameValue,
    nickname: nicknameValue,
    password: passwordValue
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log("Success:", response);
    })
    .catch(error => console.error("Error:", error));
}

function login() {
  var url = "http://localhost:3000/api/login";
  let emailValueLogin = document.getElementById("emailValueLogin").value;
  let passwordValueLogin = document.getElementById("passwordValueLogin").value;
  let nicknameValue = document.getElementById("nicknameValue").value;

  let data = {
    email: emailValueLogin,
    nickname: emailValueLogin,
    password: passwordValueLogin
  };
  console.log(data);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      console.log(response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      token = response.headers.get("x-auth");
      console.log(response.headers.get("x-auth"));
      window.localStorage.setItem("x-auth", token);
      // window.localStorage.setItem("nickname", nicknameValue);
      // console.log(data.nickname);
      return response.json();
    })
    .then(function(responseAsJson) {
      console.log(responseAsJson);
      window.location.href = "../profile-front/profile.html";
      window.localStorage.setItem("nickname", responseAsJson.nickname);
    })
    .catch(error => console.error("Error:", error));
}

function logout() {
  var url = "http://localhost:3000/api/logout";
  var token = window.localStorage.getItem("x-auth", token);
  console.log(token);

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth": token
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log("Success:", response);
      window.location.href = "../NewUser/index.html";
      localStorage.clear();
    })
    .catch(error => console.error("Error:", error));
}

function renderUsers(element) {
  let card = document.createElement('div');
  let followBtn = document.createElement('button');

  card.setAttribute('class', 'card');
  card.setAttribute('data', element._id);
  card.style.width = '30%';
  card.style.margin = '1.5%';
  card.style.height = '200px';
  card.style.textAlign = 'center';
  cardDeck.appendChild(card);

  followBtn.textContent = "Follow";
  followBtn.style.width = '40%';
  followBtn.style.margin = '0 auto';
  followBtn.setAttribute('class', 'btn btn-primary');

  card.innerHTML = card.innerHTML + "PHOTO<br>" + element.nickname;
  card.appendChild(followBtn);
}

function getAllUsers() {
  console.log(token);
  token = localStorage.getItem("x-auth");
  users = [];
  
  fetch("http://localhost:3000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth": token
      }
    })
    .then((res) => {
      return res.json()
    })
    .then(data => {
      console.log(data);
      if (data.length == 0) {
        let card = document.createElement('card');
        //li.setAttribute('class', 'list-group-item empty');
        cardDeck.appendChild(card);
        card.innerHTML = card.innerHTML + "List is empty";
      } else {
        items = data;

        data.forEach(renderUsers)
      }
    })
    .catch(error => console.error("Error:", error));
}

function explore() {
  window.location.href ="explore.html";
}

function profile() {
  window.location.href ="profile.html";
}