
import userDal from "./user.dal.js";

class UserControllers {

    login = async (req, res) => {
        try {
          const { email, password } = req.body;
    
          const result = await userDal.findEmail(email);
    
          if (!result || result.length === 0) {
            return res.status(401).json({ message: 'Email no registrado' });
          } else {
          
            const match = await compareString(password, result[0].password);
    
            if (!match) {
              
             return res.status(401).json({ message: 'Contraseña incorrecta' });
            } else {
              
              const token = generateTokenLogin(result[0].user_id);
              res.status(200).json({ token });
            }
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({
            message: 'error de server',
            dataError: error,
          });
        }
      };
    
      // Obtener datos del user
      getUserToken = async (req, res) => {
        try {
          const { user_id } = req;
          /* console.log('Desde get Token', user_id); */
          const result = await userDal.findUserById(user_id);
          /* console.log(result); */
    
          let userData = {};
    
          userData = {
            user_id: result[0].user_id,
            user_name: result[0].user_name,
            type: result[0].type,
            email: result[0].email,
            phone_number: result[0].phone_number,
          };
    
          res.status(200).json({ user: userData });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            message: 'error de server',
            dataError: error,
          });
        }
      };

      
}

export default new UserControllers;