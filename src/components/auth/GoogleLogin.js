import React from "react"
import {MDBBtn, MDBIcon} from "mdbreact";
import {withAuth} from "../../services/auth";

const GoogleLogin = ({auth}) => {

    const login = () => {
        auth.google()
    }

    return (
        <MDBBtn className={"google-btn mx-auto"} onClick={login}>
            <MDBIcon fab icon="google-plus-g" className="pr-1 "/>Login with Google
        </MDBBtn>
    )
}

export default withAuth(GoogleLogin)