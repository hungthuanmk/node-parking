function httpRequest(method='GET', json=false, address, context, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                callback(this.status, xhttp.responseText);
            } else {
                alert("Error: Lỗi nhận dữ liệu từ máy chủ\n" + "Status: " + this.status +
                    "\nDetail:" + method + " " + address);
            }
        }
    };
    xhttp.open(method, address, true);
    if (json == true)
        xhttp.setRequestHeader("Content-type", "application/json");
    if (context)
        xhttp.send(JSON.stringify(context));
   else
       xhttp.send();
}

function randomString(strLen) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < strLen; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}