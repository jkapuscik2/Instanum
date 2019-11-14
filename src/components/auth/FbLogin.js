import React from "react"
import {MDBBtn, MDBIcon} from "mdbreact";
import {withAuth} from "../../services/auth";

const FbLogin = ({auth}) => {
    const login = () => {
        auth.fb()
    }

    return (
        <MDBBtn className={"fb-btn mx-auto"} onClick={login}>
            <MDBIcon fab icon="facebook-f" className="pr-1"/> Login with Facebook
        </MDBBtn>
    )
}

export default withAuth(FbLogin)