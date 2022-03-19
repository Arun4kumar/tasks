import { getToken } from './firebase'
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Notifications = (props) => {
    const [ isTokenFound,setTokenFound ] = useState(false);
    console.log("Token found",isTokenFound);
    useEffect(() => {
        let data;
        async function tokenFunc() {
            data = await getToken(setTokenFound);
            if (data) {
                console.log("Token is",data);
            }
            return data;
        }
        tokenFunc();
    },[ setTokenFound ]);
    return <></>;
};
export const ReactNotificationComponent = ({ title,body }) => {
    toast.info(<Display />);
    function Display() {
        return (
            <div>
                <h4>{title}</h4>
                <p>{body}</p>
            </div>
        );
    }
    return (
        <ToastContainer />
    );
};
