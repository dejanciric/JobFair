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
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express_1.default.static('uploads'));
mongoose_1.default.connect('mongodb://localhost:27017/jobfair');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
let username = "";
const user_1 = __importDefault(require("./models/user"));
const offer_1 = __importDefault(require("./models/offer"));
const cv_1 = __importDefault(require("./models/cv"));
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
    this.username = req.body.username;
    //console.log(this.username);
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
        }
        else {
            res.json({ message: 'Offer Deleted!' });
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
router.route('/uploadImage').post(upload.single('image'), (req, res, next) => {
    //console.log(req.file.filename + "," + req.file.originalname+","+this.username);
    user_1.default.findOneAndUpdate({ 'username': this.username }, { 'image': req.file.filename }, (err) => {
        if (err) {
            res.send(err);
            // console.log("error");
        }
        else {
            res.json({ message: 'Image updated!' });
            //console.log("alo");
        }
    });
});
router.route('/readCV').post((req, res) => {
    let username = req.body.username;
    cv_1.default.findOne({ "username": username }, (err, offer) => {
        if (err)
            console.log(err);
        else
            res.json(offer);
    });
});
router.route('/initializeCV').post((req, res) => {
    let cvv = new cv_1.default(req.body);
    //console.log(this.username);
    cvv.save().
        then(user => {
        res.status(200).json({ 'cv': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'cv': 'no' });
    });
});
router.route('/updateCV').post((req, res) => {
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let address = req.body.address;
    let postcode = req.body.postcode;
    let city = req.body.city;
    let country = req.body.country;
    let phoneType = req.body.phoneType;
    let phone = req.body.phone;
    let mail = req.body.mail;
    let applicationType = req.body.applicationType;
    let description = req.body.description;
    let additionalSkillsText = req.body.additionalSkillsText;
    let educations = req.body.educations;
    let works = req.body.works;
    let language1knowladge = req.body.language1knowladge;
    let language3knowladge = req.body.language2knowladge;
    let language2knowladge = req.body.language3knowladge;
    let language1 = req.body.language1;
    let language2 = req.body.language2;
    let language3 = req.body.language3;
    cv_1.default.findOneAndUpdate({ 'username': username }, { 'firstname': firstname, 'lastname': lastname,
        'address': address, 'postcode': postcode, 'city': city, 'country': country,
        'phoneType': phoneType, 'phone': phone, 'mail': mail, 'applicationType': applicationType, 'description': description,
        'additionalSkillsText': additionalSkillsText, 'educations': educations, 'works': works, 'language1knowladge': language1knowladge,
        'language3knowladge': language3knowladge, 'language2knowladge': language2knowladge, 'language1': language1, 'language2': language2, 'language3': language3 }, (err) => {
        if (err) {
            res.send(err);
            // console.log("error");
        }
        else {
            res.json({ message: 'CV  updated!' });
            console.log(username);
            console.log(req.body);
        }
    });
});
router.route('/searchOffer').post((req, res) => {
    let title = req.body.title;
    let types = req.body.type;
    var regexName = new RegExp('.*' + title + '.*');
    //console.log(types+","+title);
    if (types != null && types != undefined && types.length != 0) {
        //console.log("uso");
        offer_1.default.find({ "title": regexName, "type": { $in: types } }, (err, offer) => {
            if (err)
                console.log(err);
            else
                res.json(offer);
        });
    }
    else {
        //console.log("nije");
        offer_1.default.find({ "title": regexName }, (err, offer) => {
            if (err)
                console.log(err);
            else
                res.json(offer);
        });
    }
});
router.route('/findCompanyByName').post((req, res) => {
    let companyName = req.body.companyName;
    user_1.default.findOne({ "companyName": companyName }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/applyToOffer').post((req, res) => {
    let id = req.body.id;
    let students = req.body.students;
    offer_1.default.findOneAndUpdate({ 'id': id }, { 'students': students }, (err) => {
        if (err) {
            res.send(err);
            // console.log("error");
        }
        else {
            res.json({ message: 'Offer updated!' });
            //console.log("alo");
        }
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map