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
let id = "";
const user_1 = __importDefault(require("./models/user"));
const offer_1 = __importDefault(require("./models/offer"));
const cv_1 = __importDefault(require("./models/cv"));
const employed_1 = __importDefault(require("./models/employed"));
const package_1 = __importDefault(require("./models/package"));
const companyrequest_1 = __importDefault(require("./models/companyrequest"));
const period_1 = __importDefault(require("./models/period"));
const schedule_1 = __importDefault(require("./models/schedule"));
const slot_1 = __importDefault(require("./models/slot"));
const jobfair_1 = __importDefault(require("./models/jobfair"));
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
    if (works != null && works != undefined && works.length != 0) {
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
router.route('/readMyOffers').post((req, res) => {
    let username = req.body.username;
    //let types:String[] = req.body.type;
    offer_1.default.find({ "students": { $elemMatch: { "username": username } } }, (err, offer) => {
        if (err)
            console.log(err);
        else
            res.json(offer);
    });
});
router.route('/employ').post((req, res) => {
    let employed = new employed_1.default(req.body);
    employed.save().
        then(employed => {
        res.status(200).json({ 'employed': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'employed': 'no' });
    });
});
router.route('/removeEmployed').post((req, res) => {
    let username = req.body.username;
    employed_1.default.findOneAndRemove({ 'username': username }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: 'Employed Deleted!' });
        }
    });
});
router.route('/findEmployed').post((req, res) => {
    let username = req.body.username;
    employed_1.default.findOne({ "username": username }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/updateNum').post((req, res) => {
    let companyName = req.body.companyName;
    let employeeNumber = req.body.employeeNumber;
    user_1.default.findOneAndUpdate({ 'companyName': companyName }, { 'employeeNumber': employeeNumber }, (err) => {
        if (err) {
            res.send(err);
            // console.log("error");
        }
        else {
            res.json({ message: 'COmpany updated!' });
            //console.log("alo");
        }
    });
});
router.route('/findAllOffers').get((req, res) => {
    offer_1.default.find((err, offer) => {
        if (err)
            console.log(err);
        else
            res.json(offer);
    });
});
router.route('/publishOffer').post((req, res) => {
    let offer = new offer_1.default(req.body);
    this.id = req.body.id;
    offer.save().
        then(offer => {
        res.status(200).json({ 'offer': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'offer': 'no' });
    });
});
router.route('/uploadFileOffer').post(upload.single('image'), (req, res, next) => {
    //console.log(req.file.filename + "," + req.file.originalname+","+this.username);
    offer_1.default.findOneAndUpdate({ 'id': this.id }, { 'image': req.file.filename }, (err) => {
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
router.route('/readCompanyOffers').post((req, res) => {
    let companyUsername = req.body.companyUsername;
    offer_1.default.find({ "companyUsername": companyUsername }, (err, offer) => {
        if (err)
            console.log(err);
        else
            res.json(offer);
    });
});
router.route('/savePackages').post((req, res) => {
    let packagee = new package_1.default(req.body);
    console.log(packagee);
    packagee.save().
        then(packagee => {
        res.status(200).json({ 'package': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'package': 'no' });
    });
});
router.route('/deletePackages').get((req, res) => {
    package_1.default.deleteMany({}, (err) => {
        if (err)
            console.log(err);
        else {
            res.json({ message: 'Offer Deleted!' });
        }
    });
});
router.route('/readPackage').get((req, res) => {
    package_1.default.find((err, p) => {
        if (err)
            console.log(err);
        else
            res.json(p);
    });
});
router.route('/readCompanyRequests').post((req, res) => {
    let companyName = req.body.companyName;
    companyrequest_1.default.find({ "companyName": companyName }, (err, cr) => {
        if (err)
            console.log(err);
        else
            res.json(cr);
    });
});
router.route('/readAllRequests').post((req, res) => {
    companyrequest_1.default.find({ "result": "TBA" }, (err, cr) => {
        if (err)
            console.log(err);
        else
            res.json(cr);
    });
});
router.route('/readAcceptedRequests').post((req, res) => {
    companyrequest_1.default.find({ "result": "Accepted" }, (err, cr) => {
        if (err)
            console.log(err);
        else
            res.json(cr);
    });
});
router.route('/readAllSlots').get((req, res) => {
    slot_1.default.findOne({ "companyName": "-1" }, (err, cr) => {
        if (err)
            console.log(err);
        else
            res.json(cr);
    });
});
router.route('/readCompanySlots').post((req, res) => {
    let companyName = req.body.companyName;
    slot_1.default.findOne({ "companyName": companyName }, (err, cr) => {
        if (err)
            console.log(err);
        else
            res.json(cr);
    });
});
router.route('/updateSlot').post((req, res) => {
    let companyName = req.body.companyName;
    let slot = req.body.slot;
    slot_1.default.findOneAndUpdate({ 'companyName': companyName }, { 'slot': slot }, (err) => {
        if (err) {
            res.send(err);
            // console.log("error");
        }
        else {
            res.json({ message: 'Slot updated!' });
            //console.log("alo");
        }
    });
});
router.route('/saveSlot').post((req, res) => {
    let slot = new slot_1.default(req.body);
    //console.log(packagee);
    slot.save().
        then(slot => {
        res.status(200).json({ 'slot': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'slot': 'no' });
    });
});
router.route('/saveRequest').post((req, res) => {
    let cr = new companyrequest_1.default(req.body);
    //console.log(packagee);
    cr.save().
        then(cr => {
        res.status(200).json({ 'cr': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'cr': 'no' });
    });
});
router.route('/updateRequests').post((req, res) => {
    let companyName = req.body.companyName;
    let title = req.body.title;
    let result = req.body.result;
    let comment = req.body.comment;
    companyrequest_1.default.findOneAndUpdate({ 'companyName': companyName, "title": title, "result": "TBA" }, { 'result': result, 'comment': comment }, (err) => {
        if (err) {
            res.send(err);
            // console.log("error");
        }
        else {
            res.json({ message: 'CompanyRequest updated!' });
            //console.log("alo");
        }
    });
});
router.route('/findReqByTitle').post((req, res) => {
    let title = req.body.title;
    companyrequest_1.default.find({ "title": title }, (err, cr) => {
        if (err)
            console.log(err);
        else
            res.json(cr);
    });
});
router.route('/deleteReq').post((req, res) => {
    let companyName = req.body.companyName;
    let title = req.body.title;
    let result = req.body.result;
    let comment = req.body.comment;
    companyrequest_1.default.findOneAndRemove({ 'companyName': companyName, "title": title, "result": result, "comment": comment }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: 'req Deleted!' });
        }
    });
});
router.route('/readPeriods').get((req, res) => {
    period_1.default.findOne({}, (err, cr) => {
        if (err)
            console.log(err);
        else
            res.json(cr);
    });
});
router.route('/updatePeriods').post((req, res) => {
    let studentsFrom = req.body.studentsFrom;
    let studentsTo = req.body.studentsTo;
    let companiesFrom = req.body.companiesFrom;
    let companiesTo = req.body.companiesTo;
    period_1.default.findOneAndUpdate({}, { 'studentsFrom': studentsFrom, 'studentsTo': studentsTo, 'companiesFrom': companiesFrom, 'companiesTo': companiesTo }, (err) => {
        if (err) {
            res.send(err);
            // console.log("error");
        }
        else {
            res.json({ message: 'Period updated!' });
            //console.log("alo");
        }
    });
});
router.route('/readSchedule').get((req, res) => {
    schedule_1.default.findOne({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
router.route('/saveSchedule').post((req, res) => {
    let companies = req.body.companies;
    schedule_1.default.findOneAndUpdate({}, { 'companies': companies }, (err) => {
        if (err) {
            res.send(err);
            // console.log("error");
        }
        else {
            res.json({ message: 'Schedule updated!' });
            //console.log("alo");
        }
    });
});
router.route('/saveNewSlot').post((req, res) => {
    let slot = new slot_1.default(req.body);
    //console.log(packagee);
    slot.save().
        then(slot => {
        res.status(200).json({ 'slot': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'slot': 'no' });
    });
});
router.route('/saveJobfair').post((req, res) => {
    let jobfair = new jobfair_1.default(req.body);
    //console.log(packagee);
    jobfair.save().
        then(jobfair => {
        res.status(200).json({ 'jobfair': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'jobfair': 'no' });
    });
});
router.route('/getJobfair').get((req, res) => {
    jobfair_1.default.findOne({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
router.route('/deleteJobfair').get((req, res) => {
    jobfair_1.default.deleteMany({}, (err) => {
        if (err)
            console.log(err);
        else {
            res.json({ message: 'Jobfair Deleted!' });
        }
    });
});
router.route('/deleteSlots').get((req, res) => {
    slot_1.default.deleteMany({}, (err) => {
        if (err)
            console.log(err);
        else {
            res.json({ message: 'Slots Deleted!' });
        }
    });
});
router.route('/deleteCompanyReqs').get((req, res) => {
    companyrequest_1.default.deleteMany({}, (err) => {
        if (err)
            console.log(err);
        else {
            res.json({ message: 'CompanyRequests Deleted!' });
        }
    });
});
router.route('/resetAllSlots').get((req, res) => {
    slot_1.default.updateMany({}, { "slot": [] }, (err) => {
        if (err)
            console.log(err);
        else {
            res.json({ message: 'CompanyRequests Deleted!' });
        }
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map