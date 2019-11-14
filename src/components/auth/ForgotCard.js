import React from "react"
import {MDBCard, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import {PASSWORD_FORGET} from "../../routes";

const ForgotCard = () => {
    return (
        <MDBCard className={"card-register p-1 mt-2"}>
            <MDBRow middle={true} className={"mt-1 text-center"}>
                Forgot password? <Link to={PASSWORD_FORGET} className={"ml-1"}> Reset it</Link>
            </MDBRow>
        </MDBCard>
    )
}

export default ForgotCard