const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: '/images/profilePic_avatar.png'
    },
    role:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, { timestamps: true });

// validate the user if the password is changed
userSchema.pre('save', function (next) {
    const user = this;  
    if(!user.isModified('password')) return;

    // generating a secret key of 16 digits for each user
    const salt = randomBytes(16).toString();
    
    // hash the password with salt
    const hashedPassword = createHmac('sha256', salt)
    .update(user.password).digest('hex');

    // save the salt and hashed password
    this.salt = salt;
    this.password = hashedPassword;
    next()

})

const User = model('user', userSchema);

module.exports = User;
