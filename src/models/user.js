const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {type: String},
    profilePicture: {type: String}
}, {timestamps: true });


// userSchema.virtual('password')
// .set(function(password){
//     this.hashPassword = bcrypt.hashSync(password, 10);
// });

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`;
});


userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hashPassword);
    }
}

module.exports = mongoose.model('User', userSchema);