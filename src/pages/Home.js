import { useState,useEffect,Fragment } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
    Container,
    FilterContainer,
    ListContainerCont,
    ListContainer,
    ItemDes
} from "../components/containers";
import { useAuthState } from "react-firebase-hooks/auth";
import Input from "../components/input";
import ListItem from "../components/ListItem";
import theme from "../constants/theme";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { deleteTask,populateState,updateHandler } from "../actions/user";

const Home = ({ curTheme }) => {
    const state = useSelector((state) => state.tasks)
    async function getPer() {
        await Notification.requestPermission()
    }
    getPer();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ user,loading,error ] = useAuthState(auth)
    const [ filter,setFilter ] = useState(0);
    const [ filterdList,setFilterdList ] = useState([]);
    const [ render,setRender ] = useState(false);
    const [ count,setCount ] = useState(1);
    if (error) {
        console.log(error)
    }
    useEffect(() => {
        if (!user) {
            return navigate("/login")
        }
        if (render === false) {
            dispatch(populateState(user.email))
            setRender(true)
        }
        if (filter % 3 === 0) {
            setFilterdList(state);
        }
        else if (filter % 3 === 1) {
            filterList(true);
        }
        else if (filter % 3 === 2) {
            filterList(false)
        }
    },[ user,loading,state,filter,navigate ]);

    const checkHandler = async (id,active) => {
        await dispatch(updateHandler(user.email,id,{ active: !active }))
        setCount(count + 1)
    };

    const removeHandler = (id) => {
        dispatch(deleteTask(user.email,id))
    };

    const clearHandler = () => {
        dispatch({ type: "clear" })
    };

    const filterList = (active) => {
        let cur = state;
        cur = cur.filter((val,ind) => val.active === active);
        setFilterdList(cur);
    };
    const mode = useSelector((state) => state.darkMode)
    return (
        <Fragment>
            <ListContainer mode={mode}>
                <Input
                    mode={mode}
                />
            </ListContainer>
            <ListContainerCont mode={mode}>
                {filterdList &&
                    filterdList.map((item) => (
                        <ListItem
                            mode={mode}
                            remove={removeHandler}
                            check={checkHandler}
                            key={item.id}
                            item={item}
                        />
                    ))}
                <ItemDes key="xyx" mode={mode}>
                    <h1 >{filterdList && filterdList.length} items</h1>
                    <h1 onClick={clearHandler}>Clear Complete</h1>
                </ItemDes>
            </ListContainerCont>
            <ListContainer mode={mode}>
                <FilterContainer
                    mode={mode}
                    active={theme.primary}
                    child={filter}
                >
                    <h1 onClick={() => setFilter(0)}>All</h1>
                    <h1 onClick={() => setFilter(1)}>Active</h1>
                    <h1 onClick={() => setFilter(2)}>Completed</h1>
                </FilterContainer>
            </ListContainer>
            <Container style={{ justifyContent: "center",height: "100%" }}>
                <p style={{ textAlign: "center",alignSelf: "center",color: `${theme[ curTheme ][ 3 ]}` }}>Drag and Drop to reorder list</p>
            </Container>
        </Fragment >
    )
}

export default Home