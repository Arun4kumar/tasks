import React,{ useEffect,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { auth,logInWithEmailAndPassword as signInWithEmailAndPassword,signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container,Flex,FlexColumn,InputContainer } from "../components/containers";
import { StyledLink } from "../components/containers";
import { Button } from "../components/input";


import { useDispatch } from "react-redux";
import { ListContainer,ListContainerCont } from "../components/containers";
function Login({ mode }) {
    const [ email,setEmail ] = useState("");
    const [ password,setPassword ] = useState("");
    const dispatch = useDispatch()
    const [ user,loading,error ] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            return;
        }
        dispatch({ type: "addUser",user })
        if (user) navigate("/");
    },[ user,loading ]);
    return (

        <ListContainerCont mode={mode}>

            <InputContainer mode={mode}> <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
            /></InputContainer>

            <InputContainer mode={mode}><input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            </InputContainer>

            <Flex>
                <Button
                    onClick={() => signInWithEmailAndPassword(email,password)}
                >
                    Login
                </Button>
                <Button onClick={signInWithGoogle}>
                    Login with Google
                </Button>
            </Flex>

            <Container style={{ justifyContent: "center",height: "100%" }}>


                <StyledLink mode={mode}><Link to="/reset">Forgot Password</Link></StyledLink>

                <StyledLink mode={mode}>
                    Don't have an account? <Link to="/register">Register</Link> now.

                </StyledLink>
            </Container >
        </ListContainerCont>





    );
}

export default Login;