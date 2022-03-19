import { useState,useEffect } from 'react';
import { auth,sendPasswordReset as sendPasswordResetEmail } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link,useNavigate } from 'react-router-dom'
import { Container,Flex,InputContainer,ListContainerCont,StyledLink } from '../components/containers';
import { Button } from '../components/input';

function Reset({ mode }) {
    const [ email,setEmail ] = useState("");
    const [ user,loading,error ] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    },[ user,loading ]);
    return (
        <ListContainerCont mode={mode}>
            <InputContainer mode={mode}>
                <input
                    type="text"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
            </InputContainer>
            <Flex>
                <Button onClick={() => sendPasswordResetEmail(email)}>
                    Send password reset email
                </Button>
            </Flex>
            <Container style={{ justifyContent: "center",height: "100%" }}>
                <StyledLink mode={mode}>   Don't have an account? <Link to="/register">Register</Link> now.       </StyledLink>
            </Container >
        </ListContainerCont>
    );
}

export default Reset;