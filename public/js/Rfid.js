function onRfidDetected(rfidNumber) {
    console.log('RFID ' + rfidNumber);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(xhttp.responseText);
        }
    };
    xhttp.open("GET", "/api/recognizePlate", true);
    // xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    // alert()

    captureCam();
}

function randomString(strLen) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < strLen; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}