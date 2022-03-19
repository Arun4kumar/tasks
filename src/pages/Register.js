import React,{ useEffect,useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link,useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../firebase";
import { Container,Flex,InputContainer,ListContainerCont,StyledLink } from "../components/containers";
import { Button } from "../components/input";

function Register({ mode }) {
    const [ email,setEmail ] = useState("");
    const [ password,setPassword ] = useState("");
    const [ name,setName ] = useState("");
    const [ user,loading,error ] = useAuthState(auth);
    const history = useNavigate();
    const register = ({ mode }) => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name,email,password);
    };
    if (error) {
        console.log(error)
    }
    useEffect(() => {
        if (loading) return;
        if (user) history("/");
    },[ user,loading,history ]);
    return (
        <ListContainerCont mode={mode}>
            <InputContainer mode={mode}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
            </InputContainer>
            <InputContainer mode={mode}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
            </InputContainer>
            <InputContainer mode={mode}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </InputContainer>
            <Flex>
                <Button onClick={register}>Register</Button>
                <Button onClick={signInWithGoogle}>Register with Google</Button>
            </Flex>
            <Container style={{ justifyContent: "center",height: "100%" }}>
                <StyledLink mode={mode}>
                    Already have an account? <Link to="/login">Login</Link> now.
                </StyledLink>
            </Container >
        </ListContainerCont>
    );
}
export default Register;