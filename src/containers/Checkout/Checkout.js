import React,{ Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component{
    state = {
        ingrediants:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }
    render(){

        return(
            <div>
                <CheckoutSummary ingrediants={this.state.ingrediants}/>
            </div>
        );
    }
}


export default Checkout;