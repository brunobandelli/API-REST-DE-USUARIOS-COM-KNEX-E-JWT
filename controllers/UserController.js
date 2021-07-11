var User = require("../models/User")
class UserController{

    async index(req, res){}

    async create(req, res){
        var {email, name, password} = req.body;

        if(email == undefined){
            res.status = 400;
            res.json({err: "O e-mail é inválido!"})
            return
        }

        var emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: "O e-mail já está cadastrado!"})
            return
        }

        await User.new(email,password,name)

        res.status(200);
        res.send("Tudo OK")
    }

}

module.exports = new UserController();
