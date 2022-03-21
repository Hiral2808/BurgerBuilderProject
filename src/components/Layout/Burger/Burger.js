 import React from 'react';
 import './Burger.css';
 import BurgerIngredient from './Burgeringrident/BurgerIngrediant';
 
 
 const burger = ( props ) =>{
     console.log(props);
     let transformingredient=Object.keys(props.ingrediants)
     .map(igKey => {
         return [...Array(props.ingrediants[igKey])].map((_, i) => {
             return <BurgerIngredient key={igKey + i } type={igKey}/>;
         });
     }).reduce((arr,el) => {
         return arr.concat(el)
     }, []);
     if(transformingredient.length === 0){
        transformingredient = <p>Please start adding ingrediants</p>;
     }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformingredient}
            <BurgerIngredient type="bread-bottom"/>
        </div> 
    );
};

export default burger;
