import React from "react";
import {Container} from "@material-ui/core";

const DesktopLayout = ({children}) => {

    return (
        <Container>
            {children}
        </Container>
    )
}

export default DesktopLayout;