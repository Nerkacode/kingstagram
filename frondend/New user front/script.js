const login = document.getElementById("login_button");
const createUser = document.getElementById("createUser_button");

document.getElementById("login_fields").style.display = "none";

login.addEventListener("click", e => {
  document.getElementById("createNewUser_fields").style.display = "none";
  document.getElementById("login_fields").style.display = "inline";
});
