import { compareString, hashString } from '../../utils/hashUtils.js';
import { generateTokenLogin, generateTokenConfirm } from '../../utils/tokenUtils.js';
import authDal from './auth.dal.js';

class AuthControllers {

    register = async (req, res) => {
        const { email, password } = req.body;
        try {
    
          const hashPass = await hashString(password);
    
          let data = [email, hashPass];
         
          const userId = await userDal.register(data);
       
          const token = generateTokenConfirm(userId);
         
          res.status(200).json({ message: token });
    
        } catch (error) {
            console.log(error)
          if(error.errno === 1062){
            return res.status(400).json({errno: 1062,  message: 'El correo ya está registrado'})
          }
          res.status(500).json({ message: error });
        }
      };

    login = async (req, res) => {
        try {
        const { email, password } = req.body;

        console.log(email, password);

        const result = await authDal.findEmail(email);

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
            message: 'Error server',
            errData: error,
        });
        }
    };

    // Login
    getUserToken = async (req, res) => {
        try {
        const { user_id } = req;
        if (user_id) {
            /* console.log('Desde get Token', user_id); */
            const result = await authDal.findUserById(user_id);
            /* console.log(result); */

            let userData = {};

            userData = {
            user_id: result[0].user_id,
            user_name: result[0].user_name,
            password_changed: result[0].password_changed,
            type_role: result[0].type_role,
            email: result[0].email,
            phone_number: result[0].phone_number,
            };

            res.status(200).json({ user: userData });
        }
        } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'error de server',
            dataError: error,
        });
        res.status(304).json({
            dataError: error,
        });
        }
    };

    changePass = async (req, res) => {
        try {
        const { user_id } = req;
        const { actualPass, newPass } = req.body;

        if (user_id) {
            const passHash = await authDal.getPassHash(user_id);
            const { password } = passHash[0];

            const match = await compareString(actualPass, password);

            if (!match) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            } else {
            const newPassHash = await hashString(newPass);

            // [cambio de password_changed = 1, nuevo password hasheado, id usuario]
            const values = [1, newPassHash, user_id];

            await authDal.changePass(values);

            const token = generateTokenLogin(user_id);
            res.status(200).json({ token });
            }
        }
        } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error',
            dataError: error,
        });
        }
    };
}

export default new AuthControllers();
