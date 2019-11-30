/**
 * We will encrypt our passwords and use jsonwebtoken in this class
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Helper = {
    //**Hash Password */
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },

    //**Compare passwords */

    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    },

    //**Check if Password is valid */

    emailIsValid(email) {
        return /\S+@\S+\.\S+/.test(email);
    },

    //**Generate Token */

    generateToken(id) {
        const token = jwt.sign({
            userId: id
        },
        process.env.SECRET, { expiresIn: '7d' }
        );
    }
}

module.exports = Helper;