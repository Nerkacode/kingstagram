const signIn = document.getElementById("login_button");
const createUser = document.getElementById("createUser_button");
//const login = document.getElementById("login_btn");
let token;
let cardDeck = document.getElementById("card-deck")


document.getElementById("login_fields").style.display = "none";

signIn.addEventListener("click", e => {
  document.getElementById("createNewUser_fields").style.display = "none";
  document.getElementById("login_fields").style.display = "inline";
});

// createUser.addEventListener("click", e => {
//  createNewUser();
// test
//rrrr
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
  
  let data = {
    email: emailValueLogin,
    nickname: emailValueLogin,
    password: passwordValueLogin
  };
console.log(data)
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      console.log(response)
      if (!response.ok) {
        throw Error(response.statusText);
      } 
      token = response.headers.get("x-auth");
      console.log(response.headers.get("x-auth"));
      window.localStorage.setItem("x-auth", token);

      return response.json();
  
    })
    .then(function(responseAsJson) {
      window.localStorage.setItem("nickname", nicknameValue);
      console.log(responseAsJson);
      // alert("Success");
      window.location.href ="../profile-front/profile.html";
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