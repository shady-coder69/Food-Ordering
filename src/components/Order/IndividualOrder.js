import React from "react";
import Card from "../UI/Card";

import "./IndividualOrder.css";

const IndividualOrder = (props) => {
  return (
    <li className="individual-order">
      <div>
        <div className="user-detail">
          <p className="user-detail-text order-id"><span className="label-text">OrderId:</span> {props.item.id}</p>
          <p className="user-detail-text"><span className="label-text">Name:</span> {props.item.name}</p>
          <p className="user-detail-text">
            <span className="label-text">Address:</span> {props.item.street}, {props.item.city} - {props.item.code}
          </p>
        </div>
        <div className="order-detail">
          <p style={{fontWeight: "bold", textDecoration: "underline"}}>Orders: </p>
          <ul className="order-items">
            {props.item.orders.map((order) => {
              return (
                <li className="individual-order-item">
                  <Card className="individual-order-item-card">
                    <p>{order.name}</p>
                    <p>{order.amount}</p>
                    <p>$ {order.price}</p>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default IndividualOrder;
