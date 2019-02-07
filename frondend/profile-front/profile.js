function newPhotoUpload() {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "file");
        document.getElementsByClassName("fa-camera").appendChild(x);
}