import { createContext , useEffect, useState} from 'react';
const UserDataContext = createContext();

function UserDataProvider({children}) {
  
  const [userData, setUserData] = useState({})
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) return
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/tokenData`, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
    .then(response => response.json())
    .then(data => {
      setUserData(data.data)
      
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  return(
    <UserDataContext.Provider value={{userData, setUserData}}>
      {children}
    </UserDataContext.Provider>
  )



}
export default UserDataProvider;
export {UserDataContext}