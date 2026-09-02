import { useEffect, useState } from 'react';
import { AuthContext } from './CreateContext';
import { fetchData } from '../helpers/axiosHelper.js';



export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([])
 


  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    
  }

  useEffect(() => {

    let tokenLocalStorage = localStorage.getItem("token");

    if (tokenLocalStorage) {  
      const fetchUser = async() => {
        try {
          const res = await fetchData('/auth/getUserToken', 'GET', null, tokenLocalStorage);
          setUser(res.data.user);
          setToken(tokenLocalStorage);

        } catch (error) {
          console.log(error)
        }
      }
      fetchUser()
    }

   
 
  },[])



  return (
    <AuthContext.Provider 
      value={
        { user,
          setUser,
          token,
          setToken, 
          logOut,
       }
       }>
        {children}
        </AuthContext.Provider>
  );
};
