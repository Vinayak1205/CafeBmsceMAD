import logo from './logo.svg';
import './App.css';
import Menu from './Components/Menu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {

  const[MenuList,setMenuList] = useState([])
  const[LoginStatus,setLoginStatus] = useState(false)
  const[SignUpStatus,setSignUpStatus] = useState(false)
  const[ConfirmedLogin,setConfirmLogin] = useState(false)

  useEffect(()=>{

    axios.post("http://localhost:9000/api/GetAllFoodItems")
    .then(response=>{

        console.log(response.data)
        setMenuList(response.data)
    })
  },[])

  
  return (
    <div className="App">
      {!LoginStatus && !SignUpStatus ? <Menu setLoginStatus={setLoginStatus} LoginStatus={LoginStatus} MenuList = {MenuList} setMenuList = {setMenuList} /> 
      : LoginStatus === true && SignUpStatus === false ? <Login ConfirmedLogin={ConfirmedLogin} setConfirmLogin={setConfirmLogin} LoginStatus={LoginStatus} setLoginStatus = {setLoginStatus} SignUpStatus={SignUpStatus} setSignUpStatus={setSignUpStatus}/>
      :<SignUp LoginStatus={LoginStatus} setLoginStatus = {setLoginStatus} SignUpStatus={SignUpStatus} setSignUpStatus={setSignUpStatus}/>}
      
      
    </div>
  );
}

export default App;
