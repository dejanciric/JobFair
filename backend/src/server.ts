import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';



const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jobfair');

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

import User from './models/user';

router.route('/login').post(
    (req, res)=>{
        let username = req.body.username;
        let password = req.body.password;   

        User.findOne({'username':username, 'password':password},
         (err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
);



router.route('/loginAdmin').get(
    (req, res)=>{

        User.find({"type":"user"},
         (err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
);


router.route('/register').post((req, res)=>{
    let user = new User(req.body);
    user.save().
        then(user=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        })
});

router.route('/news').post((req, res)=>{
    let username = req.body.username;
    User.findOne({'username':username}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user.get('news'));
        }
    })
})

router.route('/removeUser').post((req, res)=>{
    let username = req.body.username;
    User.findOneAndRemove({'username':username}, (err)=>{
        if (err){
            res.send(err);
            console.log("error");
        }

        else{
            res.json({ message: 'Offer Deleted!'});
            console.log("alo");
        }
    })
})

router.route('/findByUsername').post(
    (req, res)=>{
        let username = req.body.username;
        User.findOne({"username":username},
         (err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
);

router.route('/changePassword').post(
    (req, res)=>{
        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        User.findOneAndUpdate({'username':username}, {'password':newPassword}, (err)=>{
            if (err){
                res.send(err);
               // console.log("error");
            }
    
            else{
                res.json({ message: 'Password updated!'});
                //console.log("alo");
            }
        })

    }
);



app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));