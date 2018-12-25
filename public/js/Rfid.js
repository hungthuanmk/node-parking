function onRfidDetected(rfidNumber) {
    console.log('RFID ' + rfidNumber);

    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //
    //     }
    // };
    // xhttp.open("GET", "/api/recognizePlate", true);
    // // xhttp.setRequestHeader("Content-type", "application/json");
    // xhttp.send();

    httpRequest('POST', true, '/api/imgProcessing/recognizePlate', {mat:'someBase64'}, (status, returnText) => {
        alert("Status: " + status + "\n" + returnText);
    });
    // alert()

    captureCam();
}