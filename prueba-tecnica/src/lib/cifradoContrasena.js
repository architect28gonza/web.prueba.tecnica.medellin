const bcrypt = require('bcryptjs');
const cifrado = {};

/* Este metodo se ejecutara cuando realizemos un registro */
cifrado.encriptarPassword = async (password) => {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync());
};

/* Este metodo se ejecutara cuando realicemos la Logeo*/
cifrado.compararPassword = async (password, passwordMysql) => {
   try {
       return await bcrypt.compare(password, passwordMysql);
   } catch (e) {
       console.log(e);
   }
};

module.exports = cifrado;