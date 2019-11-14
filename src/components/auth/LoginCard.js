import React from "react"
import {MDBCard, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import {LOGIN} from "../../routes";

const LoginCard = () => {
    return (
        <MDBCard className={"card-register p-1 mt-2"}>
            <MDBRow middle={true} className={"mt-1 text-center"}>
                Have account? <Link to={LOGIN} className={"ml-1"}> Log in</Link>
            </MDBRow>
        </MDBCard>
    )
}

export default LoginCard