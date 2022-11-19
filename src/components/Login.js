import axios from 'axios';
import { Component, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Home from './Home';
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from './Alert';
import { useAlert } from "react-alert";
import { useToasts } from "react-toast-notifications";
import $ from "jquery"
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE
  };

const  Login=() =>{
   
const [Username,username]=useState('');
const [Password,password]=useState('');
const [msg,setMsg]=useState('');
const navigate = useNavigate();
const [showResults, setShowResults] =useState(false)
const [count, setCount] = useState(0);

 function submitHandler(e){
   
    e.preventDefault();
    try{
    console.log(Username,Password);
    //alert('done');

    let  item  ={username,password};
    const requestOptions = {
        method: 'POST',
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
            navigate("/Home");
        }else{
            console.log(data.error)
            setMsg("bad")
            setShowResults(true)
            alert("nfjfdk")
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
  );
}


export default Login;
