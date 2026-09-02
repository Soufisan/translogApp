import executeQuery from '../../config/db.js';

class UserDal {

  findEmail = async (email) => {
    try {
      let sql = 'SELECT user_id, password FROM user WHERE email = ?';
      const result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  findUserById = async (id) => {
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ? AND is_deactivated = 0';
      const result = executeQuery(sql, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  

}

export default new UserDal;
