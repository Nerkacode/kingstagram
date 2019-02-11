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

function defautUserPhoto() {

        if (localStorage.getItem("x-auth")) {
                token = localStorage.getItem("x-auth")
                console.log(token)
        fetch("http://localhost:3000/api/currentUsers", {
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
    var img = document.createElement("img");
    img.src = data.userphoto;   
    img.className = "profile-photo";
    var src = document.getElementById("userPhoto");
    src.appendChild(img);

                })
                .catch(error => console.error("Error:", error));
}
}


function createItem() {
        console.log(token);
        let file = document.getElementById('todoValue');

        let data = new FormData()
        data.append('avatar', file.files[0])
        data.append('username', 'naujasusername') //cia jei reikia papildomos info

        fetch("http://localhost:3000/api/image", {
                        method: "POST",
                        body: data,
                        headers: {
                                "x-auth": token
                        }
                })
                .then((res) => {
                        return res.json()
                })
                .then(data => {
                        console.log(data)
                        

                })
                .catch(error => console.error("Error:", error));
}