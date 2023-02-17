const User      = require("../models/user");
const jwt       = require("../auth/jwt");
const validator = require('validator');

const signUp = async (req, res) =>{
    try {

        const verifyUser = await User.findOne( {email: req.body.email} ).exec();

        if( validator.isLength(req.body.name, {min: 2}) ){

            if( validator.isEmail(req.body.email) ){

                if(verifyUser != undefined){

                    res.status(400).send("email exist")

                }else if( validator.isStrongPassword(req.body.password) ){

                    const result = await User.create(req.body);
                    const { password, ...user } = result.toObject();
                    const token = jwt.sign( { user: user.id } );
                    res.send({ user, token });

                }else{

                    message={
                        error: "Password invalid",
                        message:{
                            minLength: 8,
                            minLowercase: 1, 
                            minUppercase: 1, 
                            minNumbers: 1, 
                            minSymbols: 1
                        }
                    }

                    res.status(400).send(message)

                }
            }else{
                res.status(400).send("email invalid")
            }
        }else{
            res.status(400).send("name invalid")  
        }
    } catch (error) {
        res.status(500).send("error: " + error)
    }
}

const login = async (req, res) => {
    const [, hash] = req.headers.authorization.split(' ') 
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    try {
        const user = await User.findOne({email}).exec();
    
        if (!user) {
            return res.status(400).send("Invalid username/password supplied")

        }else{
            if(user.isValidPassword(password)){
            
                const token = jwt.sign({ user: user.id })
                res.send({ user, token })
            }
            else{

                return res.status(401).send("password error") 
        
            }

        }

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {signUp , login }