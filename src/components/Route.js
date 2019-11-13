import React from 'react'
import {
    Route as RouterRoute,
    Redirect
} from "react-router-dom"
import {INDEX} from "../routes";
import { useSelector } from 'react-redux'

const Route = ({component: Component, guestOnly = false, ...rest}) => {
    const user = useSelector(state => state.user)

    return guestOnly ? (
        user.auth ? (
                <Redirect to={INDEX}/>
            ) :
            (
                <RouterRoute>
                    <Component {...rest} />
                </RouterRoute>
            )
    ) : (
        <RouterRoute>
            <Component {...rest} />
        </RouterRoute>
    )
};

export default Route