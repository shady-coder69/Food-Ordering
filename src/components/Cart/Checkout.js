import React, { Fragment, useContext, useRef, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import CartContext from "../store/cart-context";

import "./Checkout.css";

function Checkout(props) {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const codeInputRef = useRef();
  const cityInputRef = useRef();

  const CartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    await fetch(
      "https://react-http-cc704-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          name: nameInputRef.current.value,
          Street: streetInputRef.current.value,
          Postal_Code: codeInputRef.current.value,
          city: cityInputRef.current.value,
          orders: CartCtx.items,
          totalAmount: CartCtx.totalAmount.toFixed(2),
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    codeInputRef.current.value = "";
    cityInputRef.current.value = "";
    CartCtx.resetCart();
    props.onOrder(false);
    setIsSubmitting(false);
  };

  return (
    <Fragment>
      <hr />
      <form className="checkout-form" onSubmit={SubmitHandler}>
        <Input label="Name" id="name" type="text" ref={nameInputRef} />
        <Input label="Street" id="street" type="text" ref={streetInputRef} />
        <Input label="Postal Code" id="code" type="number" ref={codeInputRef} />
        <Input label="City" id="city" type="text" ref={cityInputRef} />
        <div className="action-buttons">
          <Button
            type="button"
            title="Cancel"
            className="cancel-button"
            onClick={props.onCancel}
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            title="Checkout"
            className="checkout-button"
            disabled={isSubmitting}
          />
        </div>
      </form>
      {isSubmitting && <p className="wait-text">Order is being placed. Please Wait...</p>}
    </Fragment>
  );
}

export default Checkout;
