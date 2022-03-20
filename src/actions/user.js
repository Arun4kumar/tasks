import { addDoc,collection,getDocs,updateDoc,doc,deleteDoc } from "firebase/firestore"
import { db } from "../firebase"

export const populateState = (user) => async (dispatch) => {
    dispatch({ type: "setLoading" })
    const coll = collection(db,user);
    const req = await getDocs(coll);
    const data = [];
    req.docs.map((doc) => {
        data.push({ ...doc.data(),id: doc.id,notified: false });
    })
    dispatch({ type: "populate",state: data });
    dispatch({ type: "remLoading" })
}

export const addTask = (user,data) => async (dispatch) => {
    dispatch({ type: "add",task: data });
    dispatch({ type: "setLoading" })
    const coll = collection(db,user);
    await addDoc(coll,{ ...data,notified: false });
    dispatch({ type: "remLoading" })
}

export const updateHandler = (user,id,data) => async (dispatch) => {
    dispatch({ type: "status",id })
    dispatch({ type: "setLoading" })
    const task = doc(db,user,id);
    await updateDoc(task,data)
    dispatch({ type: "remLoading" })

};

export const deleteTask = (user,id) => async (dispatch) => {
    dispatch({ type: "remove",id })
    dispatch({ type: "setLoading" })
    const task = doc(db,user,id);
    await deleteDoc(task)
    dispatch({ type: "remLoading" })

};