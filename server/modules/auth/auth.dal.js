import executeQuery from "../../config/db.js";

class AuthDal {
    register = async (data) => {
        try {
          let sql1 = 'SELECT MAX(user_id) as maxUserId from user';
    
          let [result] = await executeQuery(sql1);
          let { maxUserId } = result;
          if (maxUserId === null) {
            maxUserId = 1;
          } else {
            maxUserId++;
          }
    
          let sql = 'INSERT INTO user (user_id, email, password, type_role) VALUES (?, ?, ?, ?)';
          await executeQuery(sql, [maxUserId, ...data]);
          return maxUserId;
        } catch (error) {
          throw error;
        }
      };

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
          let sql = 'SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0';
          const result = executeQuery(sql, [id]);
          return result;
        } catch (error) {
          throw error;
        }
      };

      getPassHash = async (id) => {
        try {
          let sql = 'SELECT password FROM user WHERE user_id = ? AND user_is_deleted = 0'
          const result = executeQuery(sql, id)
          return result;
        } catch (error) {
          throw error
        }
      }

      changePass = async (values) => {
        try {
          let sql = `UPDATE user SET
                    password_changed = ?,
                    password = ?
                    WHERE user_id = ?`;

          const result = await executeQuery(sql, values);
          return result
          
        } catch (error) {
          throw error
        }
      }
}

export default new AuthDal()