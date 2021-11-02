const mongoose = require('mongoose')
const crypto = require('crypto')

//userModel

const userSchema = new mongoose.Schema({

    email :{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true

    },

    name : {
        type:String,
        trim:true,
        required:true,

    },

    hashed_password : {
        
        type:String,
        required:true
    },

    salt:String,
    role : {
        type:String,
        default :'Normal'
    },

    resetPasswordLink :{
        data:String,
        default:"",
    }
},{timeStamp:true})


//virtualPasswordFunction  (set and get functions to get and update the password after hashing)
userSchema.virtual('password')
    .set(
        function(){
            this.password=password
            this.salt=this.makeSalt()
            this.hased_password=this.encryptPassword(password)
        }
    )
    .get(
        function(){
            return this._password
        }
    )


//methods

userSchema.methods= {

    //generateSalt for hashing
    makeSalt : function(){
        return Math.round(new Date().valueOf()*Math.randon())+''
    },

    //EncryptPassword
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto.createHmac('sha1',this.salt)
                .update(password)
                .digest('hex')
        }catch(err){
            return ''
        }
    },
    
    
    //ComparePassword between the plain get from user and hashed
    authenticate: function(plainPassword){
        return this.encryptPassword(plainPassword)===this.hashed_password
    }

}




module.exports = mongoose.model('user',userSchema)