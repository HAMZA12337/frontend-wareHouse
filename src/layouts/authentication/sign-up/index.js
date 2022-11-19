import { Component, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './index.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../node_modules/font-awesome/css/font-awesome.css';
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import  routes from '../../../routes';
const  Login=() =>{
   
const [Username,username]=useState('');
const [Password,password]=useState('');
const [msg,setMsg]=useState('');
const navigate = useNavigate();
const [showResults, setShowResults] =useState(false)
const [count, setCount] = useState(0);
const [state_log,setState_]=useState(false)
 function submitHandler(e){
   
    e.preventDefault();
    try{
    console.log(Username,Password);
    //alert('done');

    let  item  ={username,password};
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            "email":Username,
          "password": Password

    

         })
    };
    let response =  fetch("http://localhost:3001/account/login", requestOptions)
    .then(response => response.json())
    .then(data => {
        if(!data.error){
            setState_(true)
            navigate("/dashboard");
        }else{
            console.log(data.error)
            setMsg("bad")
            setShowResults(true)
            
            // to give to our client a max of attempt
            setCount(count + 1)
            
        }
    
    });

    }catch(error){
        if(error.response){}
        setMsg(error.response.data.msg)
        
        
        
    }




}

  return (
    <BasicLayout >
    <div className="login ">
        
    <div className="wrapper ">
        <div className="logo">
            <img src="http://finetti.ma/public/img/p/ola-chocolitos-duo-94253.png" alt="" />
        </div>
        <div className="text-center mt-4 name">
            OlaApp
        </div>
        
        <div class="container">
  <div class="row">
    <div class="col-sm">
      { count!=0 ? <div class="alert hide">
         <span class="fa fa-exclamation-circle text-danger"></span>
         <span class="msg text-danger">Ooops ! Wrong credentials</span>
         
      </div>:null}  
      </div>
      </div>
      </div>       
        
        
        <form  onSubmit={submitHandler} className="p-3 mt-3">
            {/* <p className="has-text-centered">{msg}</p> */}
            <div className="form-field d-flex align-items-center">
           
                <i className="fa fa-user "></i>
                <input type="email" name="userName" id="userName" placeholder="Username" 
                 onChange={(e)=>username(e.target.value)} required/>
            
            </div>
            <div className="form-field d-flex align-items-center">
            <i class="fa fa-key" aria-hidden="true"></i>
                <input type="password" name="password" id="pwd" placeholder="Password"
                onChange={(e)=>password(e.target.value)} required />
                
            </div>
           
            <button className="btn mt-3">Login</button>
            
        </form>
        <div className="text-center fs-6">
            <a href="#">Forget password</a>
        </div>
    </div>
    </div>
    </BasicLayout>
  );
}


export default Login;
