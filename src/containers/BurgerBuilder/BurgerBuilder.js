import React,{ Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Layout/Burger/Burger';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Layout/Burger/OrderSummary/OrderSummary';
import axios  from "../../axios-orders";
// import { getDefaultNormalizer } from '@testing-library/react';
import Spinner from "../../components/Layout/UI/Spinner/Spinner";
import withErrorHandler  from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIANT_PRICES ={
    salad:2,
    cheese:2,
    meat:2,
    bacon:2

}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={ ...}
    // }
    state={
        ingrediants:null,
        totalPrice:4,
        purchasable: false,
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount (){
        console.log(this.props);
        axios.get('https://react-my-burger-e5035-default-rtdb.firebaseio.com/ingrediants.json')
        .then(response =>{
            this.setState({ingrediants :response.data});
        })
        .catch(error =>{
            this.setState({error : true});
         });
    }
    updatePurchaseState (ingrediants){
       const sum =Object.keys(ingrediants)
        .map(igKey =>{
            return ingrediants[igKey];
        })
        .reduce((sum, el) =>{
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingrediants[type];
        const updatedCount =oldCount+1;
        const updatedIngrediants = {
            ...this.state.ingrediants
        };
        updatedIngrediants[type] = updatedCount;
        const priceAddition = INGREDIANT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice,ingrediants:updatedIngrediants});
        this.updatePurchaseState(updatedIngrediants);
    }
    removeIngredientHandler =(type) =>{
        const oldCount = this.state.ingrediants[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount =oldCount- 1;
        const updatedIngrediants = {
            ...this.state.ingrediants
        };
        updatedIngrediants[type] = updatedCount;
        const priceDeduction = INGREDIANT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice,ingrediants:updatedIngrediants});
        this.updatePurchaseState(updatedIngrediants);
    }
    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () =>{
        // alert('You countinue!');
        // this.setState({ loading :true })
        // const order={
        //     ingrediants:this.state.ingrediants,
        //     price:this.state.totalPrice,
        //     customer:{
        //         name:'Hiral Prajapati',
        //         address:{
        //             street:'K.K.nagar',
        //             pincode:'380061',
        //             country:'India'
        //         },
        //         email:'abc@.com'
        //     },
        //     deliveryMethod:'fastest'
        // }
        // axios.post('/orders.json',order)
        //     .then(response => {
        //         this.setState({ loading :false,purchasing :false });
        //     })
        //     .catch(error =>{
        //         this.setState({ loading :false,purchasing :false });
        //     });

    }
    render(){
        const disabledInfo = {
            ...this.state.ingrediants
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =null;

        
        let burger= this.state.error ? <p>Ingrediants can't be loaded</p>:<Spinner/>;
        if(this.state.ingrediants){
            burger = (
                <Auxiliary>
            <Burger ingrediants={this.state.ingrediants}/>
            <BuildControls 
                ingredientAdded ={this.addIngredientHandler}
                ingredientRemove = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                purchasable={this.state.purchasable}
                orderd={this.purchaseHandler}
                price={this.state.totalPrice}
                /> 
                </Auxiliary>
                );
                orderSummary =<OrderSummary 
                ingrediants={this.state.ingrediants}
                price={this.state.totalPrice.toFixed(2)}
                purchaseCancelled ={this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}/>; 
        }
        
        if(this.state.loading){
            orderSummary =<Spinner/>;
        } 
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    } 
}

export default withErrorHandler(BurgerBuilder , axios);