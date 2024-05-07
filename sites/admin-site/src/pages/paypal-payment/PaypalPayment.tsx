import { PayPalButtons } from '@paypal/react-paypal-js';

const SERVER_URL = 'http://localhost:3000';

const PaypalPayment = () => {
  const createOrder = async (data, actions) => {
    console.log({ data, actions });
    // Order is created on the server and the order id is returned
    const response = await fetch(`${SERVER_URL}/api/paypal/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        product: {
          sku: 'sku-123',
          amount: 1,
          price: '100.00',
        },
      }),
    });

    const { data: responseData } = await response.json();
    return responseData.jsonResponse.id;
  };
  const onApprove = async (data, actions) => {
    console.log({ data, actions });
    // Order is captured on the server and the response is returned to the browser
    const res = await fetch(`${SERVER_URL}/api/paypal/capture-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: data.orderID,
      }),
    }).then((response) => response.json());

    console.log('Payment Success');
    console.log(res.data.jsonResponse);
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PaypalPayment;
