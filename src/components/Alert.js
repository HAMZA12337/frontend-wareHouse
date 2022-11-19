import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { useToasts } from "react-toast-notifications";



const Alert = ({count}) => {
    
    console.log("count"+count)
    const alert = useAlert();
    if(count==1){
  alert.error("You just broke something!");
    }
     
      
};

export default Alert;
