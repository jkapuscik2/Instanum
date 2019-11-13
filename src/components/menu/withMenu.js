import React from "react"
import Menu from "./Menu";

export const withMenu = Component => props => {
    return (
        <>
            <Menu {...props}/>
            <Component {...props}/>
        </>
    )
}

export default withMenu