const { iteratee } = require("lodash")
const { User } = require("../models/user");

describe('user.generateAuthToken', () => {
    it('should return a signed json web token', () => {
        const user = new User({name: 'kick', email: 'kmartens@enk.nl', phone: '0654757886'});
        const token = user.generateAuthToken();
    })
})