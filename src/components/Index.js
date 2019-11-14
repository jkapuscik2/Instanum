import React from 'react'
import withMenu from "./menu/withMenu";
import {MDBContainer, MDBCard} from "mdbreact";

const Index = () => {
    return (
        <MDBContainer className={"content"}>
            <MDBCard className={"col-12 p-3 mt-3 mb-3"}>
                <img src="https://loremflickr.com/1920/1080" className="img-fluid col-12 p-0"
                     alt=""/>
            </MDBCard>
            <MDBCard className={"col-12 p-3 mt-3 mb-3"}>
                <img src="https://loremflickr.com/640/480" className="img-fluid col-12 p-0"
                     alt=""/>
            </MDBCard>
            <MDBCard className={"col-12 p-3 mt-3 mb-3"}>
                <img src="https://loremflickr.com/480/640" className="img-fluid col-12 p-0"
                     alt=""/>
            </MDBCard>

        </MDBContainer>
    )
}

export default withMenu(Index)