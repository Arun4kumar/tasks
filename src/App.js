import { useEffect,useState } from "react";
import Header from "./components/header";
import theme from "./constants/theme";
import { createGlobalStyle,ThemeProvider } from "styled-components";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Background from "./components/containers";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import { useDispatch,useSelector } from "react-redux";
import { getToken } from "firebase/messaging";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const GlobalStyles = createGlobalStyle`
* {
 margin: 0;
  padding: 0;
  font-family: "Josefin Sans";
  box-sizing: border-box;
}`;

function App() {
  const mode = useSelector((state) => state.darkMode)
  const [ curTheme,setCurTheme ] = useState("light")
  // const [ show,setShow ] = useState(false);
  // const [ notification,setNotification ] = useState({ title: "",body: "" });
  // const [ isTokenFound,setTokenFound ] = useState(false);
  // const token = getToken(setTokenFound);
  // onMessageListener()
  //   .then((payload) => {
  //     setShow(true);
  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ",err));
  useEffect(() => {
    setCurTheme(mode ? "dark" : "light")
  },[ mode ])

  const dispatch = useDispatch();
  const changeTheme = () => {
    dispatch({ type: "changeTheme" })
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Background
          backgroundImage={theme[ curTheme ].imgMoblie}
          backgroundImageDesktop={theme[ curTheme ].imgDesktop}>
          <Header changeTheme={changeTheme} img={theme[ curTheme ].themeIcon} />
          <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<Login mode={mode} />} />
              <Route exact path="/register" element={<Register mode={mode} />} />
              <Route exact path="/reset" element={<Reset mode={mode} />} />
              <Route exact path="/" element={<Home mode={mode} />} />
            </Routes>
            <NotificationContainer />
          </BrowserRouter>
        </Background>
      </ThemeProvider>
    </>
  );
}

export default App;
