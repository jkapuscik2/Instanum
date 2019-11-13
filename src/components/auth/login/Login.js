import React, {useState, useRef} from "react"
import {MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBIcon} from 'mdbreact'
import {withAuth} from "../../../services/auth"
import {INDEX, PASSWORD_FORGET, REGISTER} from "../../../routes";
import {Link} from 'react-router-dom'
import Logo from "../../../assets/logo.png"

const initialState = {
    name: "",
    password: ""
}

const Login = ({auth}) => {
    const [formData, setFormData] = useState(initialState)
    const errorMsg = useRef(null);

    const handleSubmit = async event => {
        event.preventDefault()

        const result = await auth.login(
            formData.name,
            formData.password
        )

        if (result && !result.success) {
            errorMsg.current.style.display = 'block'
            errorMsg.current.innerHTML = result.error.message
        }
    }

    const changeHandler = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
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
                                <MDBBtn className={"fb-btn mx-auto"}>
                                    <MDBIcon fab icon="facebook-f" className="pr-1"/> Login with Facebook
                                </MDBBtn>
                                <MDBBtn className={"google-btn mx-auto"}>
                                    <MDBIcon fab icon="google-plus-g" className="pr-1 "/>Login with Google
                                </MDBBtn>
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
                                    value={formData.name}
                                    onChange={changeHandler}
                                />
                                <MDBInput
                                    label="Your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    required={true}
                                    name={"password"}
                                    value={formData.password}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="text-center">
                                <MDBBtn color="indigo" type={"submit"}>Login</MDBBtn>
                            </div>
                        </form>
                        <div className="alert alert-danger mt-3" role="alert" ref={errorMsg}
                             style={{display: "none"}}>
                        </div>
                    </MDBCardBody>
                </MDBCard>

                <MDBCard className={"card-register p-1 mt-2"}>
                    <MDBRow middle={true} className={"mt-1 text-center"}>
                        Do not have account? <Link to={REGISTER} className={"ml-1"}> Register</Link>
                    </MDBRow>
                </MDBCard>

                <MDBCard className={"card-register p-1 mt-2"}>
                    <MDBRow middle={true} className={"mt-1 text-center"}>
                        Forgot password? <Link to={PASSWORD_FORGET} className={"ml-1"}> Reset it</Link>
                    </MDBRow>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    )
}

export default withAuth(Login)