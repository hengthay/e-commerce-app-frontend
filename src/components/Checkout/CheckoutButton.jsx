import React, { useState } from 'react'
import Paypal from '../Paypal'
const CheckoutButton = ({ formData, onSuccess, onError, total}) => {
  return (
    <div>
      <Paypal formData={formData} onSuccess={onSuccess} onError={onError} total={total}/>
    </div>
  )
}

export default CheckoutButton