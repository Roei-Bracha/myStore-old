import React from 'react';
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price})=>{
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_HcJtxQd6FHAzH5fL5AK609Sb001rkuRO8S'

  const onToken = token =>{
    console.log(token)
    alert('Payment succeeded')
  };

  return(
      <StripeCheckout
      label={'Pay Now'}
      name={'My shop'}
      billingAddress
      shippingAddres
      image={'https://sendeyo.com/up/d/f3eb2117da'}
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel={'Pay Now'}
      token={onToken}
      stripeKey={publishableKey}
      />
  )
}

export default StripeCheckoutButton