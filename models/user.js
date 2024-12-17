const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    salt: {
        type: String, 
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

// authenticate password and generate token for login
userSchema.static('matchPasswordAndGenerateToken', async function(email,password){
    const user = await this.findOne({ email })
    if(!user) throw new Error('User Not Found');

    // retrieving the salt and hashedpassword from the db
    const salt = user.salt;
    const hashedPassword = user.password;

    // create hash version of the password provided by the user
    const userProvidedHash = createHmac('sha256', salt)
    .update(password).digest('hex');

    // match the passowrd given by the user to the stored in the database
    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password')

    // generate a token for the user if passwords matches
    const token = createTokenForUser(user);
    return token;

})

// save the password when user registers by hashing it
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
