"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/jobfair');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
const user_1 = __importDefault(require("./models/user"));
const offer_1 = __importDefault(require("./models/offer"));
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/searchCompany').post((req, res) => {
    let companyName = req.body.companyName;
    let city = req.body.city;
    let works = req.body.work;
    var regexName = new RegExp('.*' + companyName + '.*');
    var regexCity = new RegExp('.*' + city + '.*');
    if (works != null) {
        user_1.default.find({ "companyName": regexName, "city": regexCity, "type": "company", "work": { $in: works } }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        });
    }
    else {
        user_1.default.find({ "companyName": regexName, "city": regexCity, "type": "company" }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        });
    }
});
router.route('/register').post((req, res) => {
    let user = new user_1.default(req.body);
    user.save().
        then(user => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
router.route('/news').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOne({ 'username': username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user.get('news'));
        }
    });
});
router.route('/removeUser').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOneAndRemove({ 'username': username }, (err) => {
        if (err) {
            res.send(err);
            console.log("error");
        }
        else {
            res.json({ message: 'Offer Deleted!' });
            console.log("alo");
        }
    });
});
router.route('/findByUsername').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOne({ "username": username }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/findOfferByCompany').post((req, res) => {
    let companyUsername = req.body.companyUsername;
    offer_1.default.find({ "companyUsername": companyUsername }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/changePassword').post((req, res) => {
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    user_1.default.findOneAndUpdate({ 'username': username }, { 'password': newPassword }, (err) => {
        if (err) {
            res.send(err);
            // console.log("error");
        }
        else {
            res.json({ message: 'Password updated!' });
            //console.log("alo");
        }
    });
});
router.route('/findOfferById').post((req, res) => {
    let id = req.body.id;
    offer_1.default.findOne({ "id": id }, (err, offer) => {
        if (err)
            console.log(err);
        else
            res.json(offer);
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map