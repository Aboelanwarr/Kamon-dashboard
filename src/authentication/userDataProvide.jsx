import { createContext, useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
const UserDataContext = createContext();


function UserDataProvider({ children }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({})
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return
    setLoading(true)
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/tokenData`, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'UNAUTHORIZED') {
          localStorage.removeItem('token');
          navigate('/login');
          setLoading(false)
          return
        }
        setUserData(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        navigate('/login');
        setLoading(false)
      });
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {loading ? <Loading />:children}
    </UserDataContext.Provider>
  )



}
export default UserDataProvider;
export { UserDataContext }