import React, {useState, useRef} from "react"
import {MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBIcon} from 'mdbreact'
import {withAuth} from "../../../services/auth"
import {validateAttribute, validationRules} from "./validation";
import {Link} from "react-router-dom"
import {INDEX, LOGIN} from "../../../routes";
import Logo from "../../../assets/logo.png";

const initialState = {
    name: "",
    email: "",
    password: ""
}

const Register = ({auth}) => {
    const errorMsg = useRef(null);
    const successMsg = useRef(null);

    const [formData, setFormData] = useState(initialState)

    const changeHandler = event => {
        validateAttribute(event.target, validationRules.get(event.target.name))
        setFormData({...formData, [event.target.name]: event.target.value})
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
                formData.name,
                formData.email,
                formData.password
            )

            if (result.success) {
                errorMsg.current.style.display = 'none'
                successMsg.current.style.display = 'block'
                setFormData(initialState)
            } else {
                successMsg.current.style.display = 'none'
                errorMsg.current.style.display = 'block'
                errorMsg.current.innerHTML = result.error.message
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
                                <MDBBtn className={"fb-btn mx-auto"}>
                                    <MDBIcon fab icon="facebook-f" className="pr-1"/> Login with Facebook
                                </MDBBtn>
                                <MDBBtn className={"google-btn mx-auto"}>
                                    <MDBIcon fab icon="google-plus-g" className="pr-1 "/>Login with Google
                                </MDBBtn>
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
                                        value={formData.name}
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
                                        value={formData.email}
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
                                        value={formData.password}
                                        onChange={changeHandler}
                                    />
                                    <div className="invalid-feedback" style={{display: "none"}}>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <MDBBtn color="indigo" type={"submit"}>Register</MDBBtn>
                                <div className="alert alert-danger mt-3" role="alert" ref={errorMsg}
                                     style={{display: "none"}}>
                                </div>
                                <div className="alert alert-success mt-3" role="alert" ref={successMsg}
                                     style={{display: "none"}}>
                                    <h4 className="alert-heading">Well done!</h4>
                                    <p>
                                        Thank you for registering. You will soon receive an email with confirmation link
                                    </p>
                                </div>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>

                <MDBCard className={"card-register p-1 mt-2"}>
                    <MDBRow middle={true} className={"mt-1 text-center"}>
                        Have account? <Link to={LOGIN} className={"ml-1"}> Log in</Link>
                    </MDBRow>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    )
}

export default withAuth(Register)