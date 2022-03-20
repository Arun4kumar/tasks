import React from 'react'
import styledComponents from 'styled-components'

const Box = styledComponents.div`
position:absolute;
left:50%;
border: .2rem solid #f3f3f3; /* Light grey */
border-top: .2rem solid silver;
background:linear-gradient(145deg,hsl(192, 100%, 67%),hsl(280, 87%, 65%));
border-radius: 50%;
width: 1.5rem;
height: 1.5rem;
animation: spin 2s linear infinite;
@keyframes spin {
    0% { transform: rotate(0deg) ; }
    100% { transform: rotate(360deg); }
}`;

const Loader = () => {
    return (
        <Box />
    )
}

export default Loader