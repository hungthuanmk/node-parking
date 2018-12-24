function captureCam() {
    console.log('Capture CAM');
    var img = new Image();
    var canvas = document.getElementById('tempCanvas');
    var img2 = document.getElementById('cam23');
    canvas.width = img2.width;
    canvas.height = img2.height;
    img.crossOrigin = 'Anonymous';
    img.src = 'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?cs=srgb&dl=affair-anniversary-asad-1024975.jpg&fm=jpg';
    img.onload = () => {
        canvas.getContext('2d').drawImage(img, 0, 0);
        alert(canvas.toDataURL());
    };
    // img.src = canvas.toDataURL();
}