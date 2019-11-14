import React from "react"

const SuccessMsg = ({msg}) => {
    return (
        <div className="alert alert-success mt-3" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p className={"success-text"}>
                {msg}
            </p>
        </div>
    )
}

export default SuccessMsg