let mongoose = require('mongoose');

let user = mongoose.Schema(
    {
        name: String,
        password: String,
        publicKey: String,      // AES( e.n, password )
        AESprivateKey: String,     // AES( d.n, password )
        identity: String           // blind(  )clau publica dle usuari cegada amb r, siguent r: 4H(contraseñasemilla)+3H("")+2H()+H
    },
    {
       collection: 'user'
    }
);

module.exports = mongoose.model('User', user);
