const User = require('./User.js');
const DB = require('./Database.js');

module.exports = function (app) {

    function isNewValid(rfidNumber) {
        return true;
    };

    app.post('/api/Tracking/new', User.requireAuthentication, (req, res) => {
        if (isNewValid(req.body.rfid))
            DB.instance().table('Tracking').insert({rfid: req.body.rfid, in_userId: 1})
                .catch((err) => {
                    // console.log(err);
                    res.status(400).json({errno: err.errno, sqlMessage: err.sqlMessage});
                })
                .then((d) => {
                    if (d)
                        res.status(200).json({trackingId: d[0]});
                    else
                        res.sendStatus(400);
                });
        else
            res.sendStatus(400);
    });

    app.put('/api/Tracking', User.requireAuthentication, (req, res) => {
        // {trackingid: int, type: [in(out)frontimg, in(out)plateimg, platenumber], data}
        var jsonData = {};
        switch (req.body.type) {
            case 'infrontimg':
                jsonData = {in_img_front: req.body.data};
                break;
            case 'outfrontimg':
                jsonData = {out_img_front: req.body.data};
                break;
            case 'inplateimg':
                jsonData = {in_img_plate: req.body.data};
                break;
            case 'outplateimg':
                jsonData = {out_img_plate: req.body.data};
                break;
            case 'platenumber':
                jsonData = {plateNumber: req.body.data};
                break;
            default:
                res.sendStatus(400);
        }
        DB.instance().table('Tracking').where({trackingId: req.body.trackingId}).update(jsonData)
            .then((ok) => {
                if (ok)
                    res.sendStatus(200);
                else
                    res.sendStatus(400);
            })
    });

    app.delete('/api/Tracking', User.requireAuthentication, (req, res) => {
        DB.instance().table('Tracking').where({trackingId: req.body.trackingId}).del()
            .then((ok) => {
                if (ok)
                    res.sendStatus(200);
                else
                    res.sendStatus(400); //BAD REQUEST
            });
    });

    app.get('/api/Tracking', User.requireAuthentication, (req, res) => {
        DB.instance().table('Tracking').select('trackingId', 'type', 'plateNumber', 'in_timestamp', 'in_img_front', 'in_img_plate').where({rfid: req.body.rfid})
            .then((data) => {
                tracking = data[0];
                if (tracking) {
                    tracking.price = 3.5;
                    // console.log(tracking);
                    res.json(tracking);
                } else
                    res.sendStatus(400);
            });
    });
}
;




