import React from "react"
import {Redirect} from "react-router-dom"
import {INDEX} from "../../routes";
import {withAuth} from "../../services/auth";

const Logout = ({dispatch, auth}) => {
    auth.logout()

    return <Redirect to={INDEX}/>
}

export default withAuth(Logout)