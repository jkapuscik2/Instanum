import React from "react"
import {MDBCard, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import {REGISTER} from "../../routes";

const RegisterCard = () => {
    return (
        <MDBCard className={"card-register p-1 mt-2"}>
            <MDBRow middle={true} className={"mt-1 text-center"}>
                Do not have account? <Link to={REGISTER} className={"ml-1"}> Register</Link>
            </MDBRow>
        </MDBCard>
    )
}

export default RegisterCard