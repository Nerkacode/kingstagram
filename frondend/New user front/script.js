const signIn = document.getElementById("login_button");
const createUser = document.getElementById("createUser_button");
//const login = document.getElementById("login_btn");
let token;

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
  let emailValue = document.getElementById("emailValue").value;
  let nicknameValue = document.getElementById("nicknameValue").value;
  let passwordValue = document.getElementById("passwordValue").value;
  
  let data = {
    email: emailValue,
    //nickname: nicknameValue,
    password: passwordValue
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
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
      alert("Success");
    })
    .catch(error => console.error("Error:", error));
}
