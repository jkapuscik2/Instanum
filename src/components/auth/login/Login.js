import React, {useState} from "react"
import {MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody} from 'mdbreact'
import {withAuth} from "../../../services/auth"
import {INDEX} from "../../../routes";
import {Link} from 'react-router-dom'
import Logo from "../../../assets/logo.png"
import FbLogin from "../FbLogin";
import GoogleLogin from "../GoogleLogin";
import RegisterCard from "../RegisterCard";
import ForgotCard from "../ForgotCard";
import ErrorMsg from "../ErrorMsg";

const initialState = {
    name: "",
    password: "",
    showError: false,
    errorText: ""
}

const Login = ({auth}) => {
    const [state, setState] = useState(initialState)

    const handleSubmit = async event => {
        event.preventDefault()

        const result = await auth.login(
            state.name,
            state.password
        )

        if (result && !result.success) {
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
                        <form className="needs-validation" onSubmit={handleSubmit}>
                            <MDBRow middle={true} className={"mt-5"}>
                                <FbLogin/>
                                <GoogleLogin/>
                            </MDBRow>
                            <p className="h6 text-center mb-4 mt-4">or</p>
                            <div className="grey-text">
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
                            </div>
                            <div className="text-center">
                                <MDBBtn color="indigo" type={"submit"}>Login</MDBBtn>
                            </div>
                        </form>

                        {state.showError
                            ? <ErrorMsg msg={state.errorText}/>
                            : ""}
                    </MDBCardBody>
                </MDBCard>

                <RegisterCard/>
                <ForgotCard/>
            </MDBCol>
        </MDBRow>
    )
}

export default withAuth(Login)