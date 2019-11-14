import React from "react"

const ErrorMsg = ({msg}) => {
    return (
        <div className="alert alert-danger mt-3" role="alert">
            {msg}
        </div>
    )
}

export default ErrorMsg