import React from 'react';

const Order = props => {
    const ingredientSummary = props.order.ingredients.map(item => {
        return (
            <span style={{
                border: "1px solid gray",
                borderRadius: "8px",
                padding: "5px",
                marginRight: "15px",

            }} key={item.type}>{item.amount}x <span style={{ textTransform: "capitalize" }}>{item.type}</span> </span>
        )
    })
    return (
        <div style={{
            border: "1px solid gray",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "15px",

        }}>
            <p>Order ID: {props.order.id}</p>
            <p> Address: {props.order.customer.delivaryAddress}</p>
            <p> Phone: {props.order.customer.phone}</p>
            {ingredientSummary}
            <hr />
            <p> Price: {props.order.totalPrice}</p>
        </div>
    )
}

export default Order;