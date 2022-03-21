import React from "react";
import Burger from "../../Layout/Burger/Burger";  
import Button from "../../../components/Layout/UI/Button/Button";
import "./CheckoutSummary.css";

const checkoutSummary = (props) =>{
    return(
        <div className="CheckoutSummary">
            <h1>We hope it tastes well </h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingrediants={props.ingrediants}/>
            </div>
            <Button 
            btnType="Danger"
            clicked >CANCEL</Button>
            <Button 
            btnType="Sucess"
            clicked  >CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;
