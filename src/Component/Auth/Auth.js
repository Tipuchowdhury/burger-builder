import { React, Component } from 'react';
import { Formik } from 'formik';
import { auth } from '../../redux/authActionCreators';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';

import Spinner from '../Spinner/Spinner';

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }

}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}

class Auth extends Component {

    state = {
        mode: "Sign Up"
    }
    modeHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Log In" : "Sign Up"
        })
    }

    render() {
        let err = null;
        let form = null;
        if (this.props.authFailedMsg !== null) {
            err = <Alert color="danger">{this.props.authFailedMsg}</Alert>
        }
        if (this.props.authLoading) {
            form = (<Spinner />)
        } else {
            form = (
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            comfirmPassword: "",
                        }
                    }

                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }
                    validate={
                        (values) => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = "Required";
                            }

                            else if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
                                errors.email = "Email address is not valid";
                            }
                            if (!values.password) {
                                errors.password = "Required";
                            }
                            else if (values.password.length < 4) {
                                errors.password = "Password must be at least 4 digit";
                            }
                            if (this.state.mode === "Sign Up") {
                                if (!values.comfirmPassword) {
                                    errors.comfirmPassword = "Required";
                                }
                                else if (!(values.password === values.comfirmPassword)) {
                                    errors.confirmPassword = "Passwords didn't match";
                                }
                            }

                            console.log("Errors:", errors);
                            return errors;
                        }
                    }
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div>
                            <button style={{
                                backgroundColor: "#D70F64",
                                borderRadius: "8px",
                                borderColor: "#D70F64",
                                textAlign: "center",
                                color: "white",
                                width: "100%",
                            }}
                                className="btn btn-lg" onClick={this.modeHandler}>Switch to {this.state.mode === "Sign Up" ? "Log In" : "Sign Up"}</button>
                            <br /><br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="Enter email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}

                                />
                                <span style={{ color: "red" }}>{errors.email}</span>

                                <br />
                                <input
                                    name="password"
                                    placeholder="Enter password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>{errors.password}</span>
                                <br />
                                {this.state.mode === "Sign Up" ? <div>
                                    <input
                                        name="comfirmPassword"
                                        placeholder="Confirm password"
                                        className="form-control"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                    />

                                    <span style={{ color: "red" }}>{errors.confirmPassword}</span>
                                    <br />
                                </div> : null}

                                <button type="submit" className="btn btn-success">{this.state.mode === "Sign Up" ? "Sign Up" : "Log In"}</button>
                            </form>
                        </div>
                    )}

                </Formik>
            )
        }
        return (
            <div>
                {err}
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);