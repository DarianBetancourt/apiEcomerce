const User = require("../models/user");

const list = async (req, res) => {
    try {
        const users = await User.find({},{password:0}).sort({createAt : 'desc'});
        res.status(200).send(users); 
    } catch (error) {
        res.status(500).send({msg :'error getting users', error : error}); 
    }
}

const show = async (req, res) => {
    try {
        const id   = req.params.id
        const user = await User.findById(id,{password:0}) 
        res.send([
            {
                message : "getting user whit id "+id,
                user    :  user
            }
        ])
    } catch (error) {
        res.status(500).send({message : "error" , error: error});
    }
};

const update = async (req, res) => {
    try {
        req.user = await User.findById(req.params.id);
        create_edit(req, res, 'update');
    } catch (error) {
        res.status(500).send({message : "error" , error: error});
    }
};

const remove = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send("User whit id:"+req.params.id+" deleted" )
    } catch (error) {
        res.status(500).send({message : "error" , error: error});
    }
   
};


async function create_edit(req, res, path){

        let user      = req.user
        user.name     = req.body.name     || user.name;
        user.email    = req.body.email    || user.email;
        user.password = req.body.password || user.password;
        
        try {

            user = await user.save();
            const msg = path === "new" ? 'user created successfully' : 'user updated successfully';

            res.status(200).send( msg )
            
        } catch(error){
            res.status(500).send({message : "error" , error: error});
        }
}



module.exports = { list, show, update, remove };