import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button } from 'reactstrap';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const BuildControl = props => {
    return (
        <div className="d-flex">
            <div style={{
                marginRight: "auto",
                marginLeft: "20px",
                fontWeight: "bold",
                fontSize: "18px"
            }}>
                {props.label}
            </div>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
        </div>
    )
}

const Controls = props => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    background: "#D70F64",
                    color: "white"
                }}>
                    <h4>Add Ingredients</h4>
                </CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                added={() => props.ingredientAdded(item.type)}
                                removed={() => props.ingredientRemoved(item.type)}
                            />
                        })
                    }

                </CardBody>

                <CardFooter><h5>Price: <strong>{props.totalPrice}</strong> BDT</h5></CardFooter>
                <Button style={{ backgroundColor: "#D70F64" }} disabled={!props.purchasable} onClick={props.toggleModal}>Order Summary</Button>
            </Card>
        </div>
    )
}

export default Controls;