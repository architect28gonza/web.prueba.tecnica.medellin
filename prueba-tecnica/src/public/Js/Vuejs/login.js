document.getElementById('inicarSesion').addEventListener('submit', function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {}
    };
    xhttp.open("POST", "/oauth/login", true);
    xhttp.send();
});
