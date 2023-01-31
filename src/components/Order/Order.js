import React, { Fragment, useEffect, useState } from "react";
import IndividualOrder from "./IndividualOrder";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

import "./Order.css";

const Order = (props) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      const response = await fetch(
        "https://react-http-cc704-default-rtdb.firebaseio.com/orders.json"
      );
      const data = await response.json();

      const Orders = [];

      for (const order in data) {
        Orders.push({
          id: order,
          name: data[order].name,
          street: data[order].Street,
          code: data[order].Postal_Code,
          city: data[order].city,
          orders: data[order].orders,
          totalAmount: data[order].totalAmount,
        });
      }
      setIsLoading(false);
      setOrders(Orders);
    };

    fetchOrders().catch((err) => {
      console.log(err);
    });

    
  }, []);

  return (
    <Modal onClick={props.onCancel}>
      {isLoading && <p className="loading">Loading...</p>}
      <ol className="order-list">
        {orders.map((orderItem) => {
          return (
            <Fragment>
              <IndividualOrder key={orderItem.id} item={orderItem} />
              <hr />
            </Fragment>
          );
        })}
      </ol>
      <div className="action-buttons">
        <Button title="Close" className="close-button" onClick={props.onCancel}></Button> 
      </div>
    </Modal>
  );
};

export default Order;
