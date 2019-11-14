import React, {useState} from "react"
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import {INDEX} from "../../../routes";
import Logo from "../../../assets/logo.png";
import {withAuth} from "../../../services/auth";
import RegisterCard from "../RegisterCard";
import LoginCard from "../LoginCard";
import ErrorMsg from "../ErrorMsg";
import SuccessMsg from "../SuccessMsg";

const initialState = {
    name: "",
    mailSent: false,
    code: "",
    newPassword: "",
    showError: false,
    showSuccess: false,
    successText: "",
    errorText: ""
}

const PasswordForget = ({auth}) => {
    const [state, setState] = useState(initialState)

    const handleForgot = async event => {
        event.preventDefault()

        const result = await auth.forgotPassword(state.name)

        if (result.success) {
            setState({
                ...state,
                mailSent: true,
                showSuccess: true,
                showError: false,
                successText: 'You will soon receive information with details regarding password reset'
            })
        } else {
            setState({
                ...state,
                showSuccess: false,
                showError: true,
                errorText: result.error.message
            })
        }
    }

    const handleChange = async event => {
        event.preventDefault()

        const result = await auth.confirmForgot(state.name, state.code, state.newPassword)

        if (result.success) {
            setState({
                ...initialState,
                showSuccess: true,
                showError: false,
                successText: 'Your password has been changed'
            })
        } else {
            setState({
                ...state,
                showSuccess: false,
                showError: true,
                errorText: result.error.message
            })
        }
    }

    const changeHandler = event => {
        setState({...state, [event.target.name]: event.target.value})
    }

    return (
        <MDBRow className={"row align-items-center h-100"}>
            <MDBCol md="6" middle={true} className={"mx-auto"}>
                <MDBCard className={"card-register p-3"}>
                    <MDBCardBody>
                        <MDBCol md="6 mx-auto">
                            <Link to={INDEX}>
                                <img src={Logo} className="img-fluid" alt="Logo"/>
                            </Link>
                        </MDBCol>
                        {!state.mailSent ?
                            <form onSubmit={handleForgot}>
                                <div className="grey-text">
                                    <MDBInput
                                        label="Your name"
                                        icon="user"
                                        group
                                        type="text"
                                        required={true}
                                        name={"name"}
                                        onChange={changeHandler}
                                        value={state.name}
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn color="indigo" type={"submit"}>Reset password</MDBBtn>
                                </div>
                            </form>
                            :
                            <form onSubmit={handleChange}>
                                <div className="grey-text">
                                    <MDBInput
                                        label="Verification code"
                                        icon="lock"
                                        group
                                        type="text"
                                        required={true}
                                        name={"code"}
                                        onChange={changeHandler}
                                        value={state.code}
                                    />
                                    <MDBInput
                                        label="New password"
                                        icon="lock"
                                        group
                                        type="password"
                                        required={true}
                                        name={"newPassword"}
                                        onChange={changeHandler}
                                        value={state.newPassword}
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn color="indigo" type={"submit"}>Reset password</MDBBtn>
                                </div>
                            </form>
                        }
                        {
                            state.showError
                                ? <ErrorMsg msg={state.errorText}/>
                                : ""
                        }
                        {
                            state.showSuccess
                                ? <SuccessMsg msg={state.successText}/>
                                : ""
                        }
                    </MDBCardBody>
                </MDBCard>

                <LoginCard/>
                <RegisterCard/>
            </MDBCol>
        </MDBRow>
    )
}

export default withAuth(PasswordForget)