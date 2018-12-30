var rfid;
function newRecord(rfidNumber, callback) {
    httpRequest('POST', true, '/api/tracking/new', {rfid: rfidNumber}, (status, rep) => {
       callback(status, rep);
    });
}

function putFrontImg(trackingId, img) {

}

function putPlateImg(trackingId, img) {

}

function putPlateNumber(trackingId, plateNumber)
{

}