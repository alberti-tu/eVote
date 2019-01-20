const security = require('../cryptography/rsa');

const User = require('../models/user');

// JSON structure
const key = { n: '', e: '' };
const jwt = require('jwt-simple');
const secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex');
const keys = require('../serverKey/keys');

let rsa = new security.RSA(1024, keys.publickey, keys.modul, keys.privatekey);                                            // Generate a new set of RSA keys

const setKeys = async function setKeys (req, res) {
    let n = req.body.n;
    let e = req.body.e;

    return res.send( rsa.setKeys(n, e) );                                   // RSA public keys
};

const takeKeys = function takeKeys (req, res) {
    return res.send( { e: keys.publickey, n: keys.modul } );
};

const login = async function login (req, res) {
    let request = req.body;

    let findUser = await User.findOne(
        {
            name: request.name
        }
    );

    let payload = { name: request.name };
    let token = jwt.encode(payload, secret);

    if(findUser && findUser.password === request.password) {
        console.log(findUser);
        res.status(200).send({findUser, token});
    } else if (findUser && findUser.password !== request.password) {
        console.log(request, findUser);
        res.status(401).send({ Error: 'Incorrect credentials'});
    } else {
        let newUser = new User(request);
        await newUser.save();
        res.status(200).send({'findUser': request, token});
    }
};

const savePrivate = async function savePrivate(req, res) {
    let user = await User.findOneAndUpdate({ name: req.body.name }, { privateKey: req.body.privateKey });

    if(user) {
        res.status(200).send('Ok');
    }
};

const saveIdentity = async function saveIdentity (req, res) {
    let name = jwt.decode(req.body.token, secret).name;
    let sign = rsa.sign(req.body.identity);

    User.findOneAndUpdate({ name: name },
        { $set: {
            publicKey: req.body.publicKey,
            AESprivateKey: req.body.AESprivateKey,
            identity: sign.toString(16)
        }
    }, {new: true}, (err) => {
        if (err)
            console.error(err);
    });

    return res.status(200).send( { 'identity' : sign.toString(16) } );

    // let user = req.body;
    // console.log(user);
    // let sign = rsa.sign(user.certificate);
    // await User.findOneAndUpdate({name: user.name}, {certificate: sign});
    // return res.status(200).send(sign);                   // Response the result
    // await User.findOneAndUpdate({name: user.name}, {certificate: sign});
};

const sendIdentity = async function sendIdentity(req, res) {
    let name = jwt.decode(req.body.token, secret).name;
    User.findOne({ name: name }, { name: false, password: false, __v: false }).exec( function (err, user) {
        if(err) {
            console.error(err);
            return res.status(202).send({'result': 'ERROR'});  // Devuelve un JSON
        } else {
            return res.status(200).send(user);                 // Devuelve un JSON
        }
    });
};

module.exports = {
    takeKeys: takeKeys,
    setKeys: setKeys,
    login: login,
    savePrivate: savePrivate,
    saveIdentity: saveIdentity,
    sendIdentity: sendIdentity
};
