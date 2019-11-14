import React, {useState} from "react"
import {MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody} from 'mdbreact'
import {withAuth} from "../../../services/auth"
import {validateAttribute, validationRules} from "./validation";
import {Link} from "react-router-dom"
import {INDEX} from "../../../routes";
import Logo from "../../../assets/logo.png";
import FbLogin from "../FbLogin";
import GoogleLogin from "../GoogleLogin";
import LoginCard from "../LoginCard";
import ErrorMsg from "../ErrorMsg";
import SuccessMsg from "../SuccessMsg";

const initialState = {
    name: "",
    email: "",
    password: "",
    showError: false,
    showSuccess: false,
    errorText: ""
}

const Register = ({auth}) => {
    const [state, setState] = useState(initialState)

    const changeHandler = event => {
        validateAttribute(event.target, validationRules.get(event.target.name))
        setState({...state, [event.target.name]: event.target.value})
    }

    const handleSubmit = async event => {
        event.preventDefault()

        let success = true
        validationRules.forEach((validation, name) => {
            const attribute = document.getElementsByName(name)[0]

            if (!validateAttribute(attribute, validation)) {
                success = false;
            }
        })

        if (success) {
            const result = await auth.register(
                state.name,
                state.email,
                state.password
            )

            if (result.success) {
                setState({
                    ...initialState,
                    showSuccess: true,
                    showError: false
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
    }

    return (
        <MDBRow className={"row align-items-center h-100"}>
            <MDBCol md="6" middle={true} className={"mx-auto"}>
                <MDBCard className={"card-register p-3"}>
                    <MDBCardBody>
                        <form className="needs-validation" onSubmit={handleSubmit} noValidate={true}>
                            <MDBCol md="6 mx-auto">
                                <Link to={INDEX}>
                                    <img src={Logo} className="img-fluid" alt="Logo"/>
                                </Link>
                            </MDBCol>

                            <MDBRow middle={true} className={"mt-5"}>
                                <FbLogin/>
                                <GoogleLogin/>
                            </MDBRow>
                            <p className="h6 text-center mb-4 mt-4">or</p>
                            <div className="grey-text">
                                <div>
                                    <MDBInput
                                        label="Your name"
                                        icon="user"
                                        group
                                        type="text"
                                        required={true}
                                        name={"name"}
                                        value={state.name}
                                        onChange={changeHandler}
                                    />
                                    <div className="invalid-feedback" style={{display: "none"}}>
                                    </div>
                                </div>
                                <div>
                                    <MDBInput
                                        label="Your email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        required={true}
                                        name={"email"}
                                        value={state.email}
                                        onChange={changeHandler}
                                    />
                                    <div className="invalid-feedback" style={{display: "none"}}>
                                    </div>
                                </div>
                                <div>
                                    <MDBInput
                                        label="Your password"
                                        icon="lock"
                                        group
                                        type="password"
                                        required={true}
                                        name={"password"}
                                        value={state.password}
                                        onChange={changeHandler}
                                    />
                                    <div className="invalid-feedback" style={{display: "none"}}>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <MDBBtn color="indigo" type={"submit"}>Register</MDBBtn>

                                {state.showError
                                    ? <ErrorMsg msg={state.errorText}/>
                                    : ""}

                                {state.showSuccess
                                    ? <SuccessMsg
                                        msg="Thank you for registering. You will soon receive an email with confirmation link"/>
                                    : ""}
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>

                <LoginCard/>
            </MDBCol>
        </MDBRow>
    )
}

export default withAuth(Register)