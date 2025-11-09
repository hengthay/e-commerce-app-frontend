import { usePayPalScriptReducer } from '@paypal/react-paypal-js'

const PayPalLoader = () => {

  const [{ loadingStatus }] = usePayPalScriptReducer();

  if(loadingStatus === 'pending') {
    return (
      <div className='md:text-lg text-sm font-semibold flex justify-center text-gray-500 items-center gap-x-2'>
        <p className='w-6 h-6 rounded-full border-2 border-t-transparent border-b-transparent animate-spin'></p>Paypal is loading...
      </div>
    )
  }

  return null;
}

export default PayPalLoader