import React, { useState } from 'react'
import Paypal from '../Paypal'
const CheckoutButton = ({ formData, onSuccess, onError}) => {
  return (
    <div>
      <Paypal formData={formData} onSuccess={onSuccess} onError={onError}/>
    </div>
  )
}

export default CheckoutButton