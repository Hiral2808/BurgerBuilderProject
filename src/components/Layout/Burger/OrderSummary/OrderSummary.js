import React ,{ Component }from 'react';
import Auxiliary from "../../../../hoc/Auxiliary/Auxiliary";
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    //this is functional component ,doesn't have to be a class 
    componentWillUpdate (){
        console.log('[OrderSummary] WillUpdate');
    }
    render(){   
        const ingredientSummary = Object.keys(this.props.ingrediants)
        .map( igKey => {
            return (
            <li>
                <span style={{ textTransform :'capitalize'}}>{igKey}</span> 
                :{this.props.ingrediants[igKey]}
            </li>);
        });
        return (
            <Auxiliary>
            <h3>Ypur order</h3>
            <p>A delicious burger with the following ingrediants :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{this.props.price}</strong></p>
            <p>Countinue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>COUNTNUE</Button>
        </Auxiliary>
        );
    }
} 

export default OrderSummary;