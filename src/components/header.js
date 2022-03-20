import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import styledComponents from "styled-components";
import Loader from "./Loader";
import { logout } from "../firebase";

export const H1 = styledComponents.h1`
font-weight:700;
font-size:2rem;
letter-spacing:1rem;
color:white;
`;

export const Theme = styledComponents.div`
img{
  height:1.5rem;
  cursor:pointer;
}
`;

const Profile = styledComponents.section`
height:2rem;
position:relative;
color:white;
img{
  position:cover;
  height:100%;
  border-radius:50%;
}
.options{
  position:absolute;
  top:0%;
  left:110%;
  background:linear-gradient(145deg,hsl(192, 100%, 67%),hsl(280, 87%, 65%));
  color:white;
  margin-top:none;
  padding :.5rem;
  display:none;
  border-radius:.2rem;
  postition:absolute;
  z-index:100;
}
.show{
  display:block;
}
&:hover{
  cursor:pointer;
  
}
`;

export const Container = styledComponents.header`
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:1rem 0;
`;

const Header = ({ img,changeTheme }) => {
  const user = useSelector((state) => state.user)
  const [ visible,setVisible ] = useState(false)
  const loading = useSelector((state) => state.isLoading);
  const logoutHandler = () => {
    logout()
  }
  useEffect(() => {
  },[ loading,user ])

  return (
    <Container>
      <H1>TODO</H1>
      {loading && <Loader />}
      {user && <Profile onClick={() => setVisible(!visible)}><img src={user.photoURL || "./images/user.png"} alt="options" /><div onClick={logoutHandler} className={`options ${visible ? "show" : ""}`}>Logout</div></Profile>}
      <Theme>
        <img alt="themeImg" src={img} onClick={changeTheme} />
      </Theme>
    </Container>
  );
};

export default Header;
