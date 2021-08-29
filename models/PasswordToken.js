var knex = require("../database/connection")
var User = require("./User")

class PasswordToken{
    async create(email){
        var user = await User.findByEmail(email);
        if(user != undefined){
            try{

                var token = Date.now()

                await knex.insert({                                 // FUNÇÃO DE VALIDAÇÃO DO MODEL USER
                    user_id: user.id,                               // o id do usuario que é dono do email 
                    used: 0,                                        // Se o token foi usado ou não(0 representa falso)
                    token: token                                    // O token será gerado através da data( não é forma mais segura de se fazer porem será feito apenas para didatica, caso queira usar algo mais segura tem que usar a biblioteca UUID OU ALGUMA SEMELHANTE ) 
                }).table("passwordtokens")                          // TABELA QUE ESTOU USANDO
                return {status: true, token:token}
            }catch(err){
                console.log(err);
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: "O e-mail passado não existe no banco de dados!"}
        }
    }

    async validate(token){
        try{
            var result = await knex.select().where({token: token}).table("passwordtokens");

            if(result.length > 0){

                var tk = result[0];

                if(tk.used){
                    return {status: false};
                }else{
                    return {status: true, tk};
                }


            }else{
                return {status: false};
            }

        }catch(err){
            console.log(err);
            return false
        } 
        
    }

}

module.exports = new PasswordToken();