function httpRequest(method='POST', json=true, address, context, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log('XHR: ' + this.status + ' - ' + xhr.responseText);
            if (this.status == 200) {
                callback(this.status, xhr.responseText);
            } else {
                alert("Error: Lỗi nhận dữ liệu từ máy chủ\n" + "Status: " + this.status +
                    "\nDetail:" + method + " " + address);
            }
        }
    };
    xhr.open(method, address, true);
    if (json == true)
        xhr.setRequestHeader("Content-type", "application/json");
    if (context)
        xhr.send(JSON.stringify(context));
   else
       xhr.send();
}

function randomString(strLen) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < strLen; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}