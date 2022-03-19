import React from 'react'
import styledComponents from 'styled-components'

const Box = styledComponents.div`
border: .2rem solid #f3f3f3; /* Light grey */
border-top: .2rem solid #3498db; /* Blue */
border-radius: 50%;
width: 2rem;
height: 2rem;
animation: spin 2s linear infinite;
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`;

const Loader = () => {
    return (
        <Box />
    )
}

export default Loader