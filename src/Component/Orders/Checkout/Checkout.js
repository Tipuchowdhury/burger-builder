import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from '../../../redux/actionCreators';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        userId: state.userId,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}
class Checkout extends Component {
    state = {
        values: {
            delivaryAddress: "",
            phone: "",
            paymentType: "Cash On Delivary",
        },
        isLoading: false,
        isModalOpen: false,
        modalMess: "",
    }
    goBack = () => {
        this.props.history.goBack("/");
    }
    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = () => {
        this.setState({ isLoading: true })
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            totalPrice: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId,
            token: this.props.token,
        }
        axios.post("https://burgerbuilder-35587-default-rtdb.firebaseio.com/orders.json?auth=" + this.props.token, order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMess: "Order Placed Successfully",
                    })
                    this.props.resetIngredients()
                }
                else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMess: "Something went wrong, please order again",
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMess: "Something went wrong, please order again",
                })
            })

    }
    render() {
        let form = (<div>
            <h4 style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
            }}>Payment: {this.props.totalPrice} BDT</h4>


            <form style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
            }}>
                <textarea name="delivaryAddress" value={this.state.values.delivaryAddress} className="form-control" placeholder="Delivary Address"
                    onChange={(e) => this.inputChangeHandler(e)}></textarea>
                <br />
                <input name="phone" value={this.state.values.phone} className="form-control" placeholder="Phone Number" onChange={(e) => this.inputChangeHandler(e)} />
                <br />
                <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={(e) => this.inputChangeHandler(e)}>
                    <option value="Cash On Delivary">Cash On Delivary</option>
                    <option value="Bkash">Bkash</option>
                </select>
                <br />
                <Button style={{ backgroundColor: "#D70F64", marginRight: "auto" }} onClick={this.submitHandler} disabled={!this.props.purchasable}>Place Order</Button>
                <Button color="secondary" style={{ marginLeft: "5px" }} onClick={this.goBack} className="ml-10">Cancel</Button>
            </form>
        </div>)
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>

                    <ModalBody>
                        <p> {this.state.modalMess} </p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);