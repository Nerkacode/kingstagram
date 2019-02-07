function newPhotoUpload() {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "file");
        document.getElementsByClassName("fa-camera").appendChild(x);
}

if (window.localStorage.getItem("x-auth") === null) {

        window.location.href = "../NewUser/index.html";
}


if (window.localStorage.getItem("x-auth") != null) {
        document.getElementById("names").textContent = window.localStorage.getItem('nickname')
}