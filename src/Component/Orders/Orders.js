import { React, Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/actionCreators';
import Order from './Order/Order';
import Spinner from '../Spinner/Spinner';

const mapStateToProps = state => {
    return {
        orders: state.orders,
        ordersLoading: state.ordersLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    }
}

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    componentDidUpdate() {
        console.log(this.props);

    }
    render() {

        let orders = null;
        if (this.props.orderErr) {
            orders = <p style={{
                border: "1px solid gray",
                borderRadius: "8px",
                padding: "5px",
                marginRight: "15px",

            }}>Sorry! Your order is failed, please try again.</p>
        } else {
            if (this.props.orders.length === 0) {
                orders = <p style={{
                    border: "1px solid gray",
                    borderRadius: "8px",
                    padding: "15px",
                    marginRight: "15px",

                }}>You have no orders!!</p>
            } else {
                orders = this.props.orders.map(order => {
                    return <Order order={order} key={order.id} />
                })
            }

        }

        return (
            <div>
                {this.props.ordersLoading ? <Spinner /> : orders}
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);