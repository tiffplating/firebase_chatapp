import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { onSnapshot, query, where, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, orderBy } from "firebase/firestore";
import Cookies from "universal-cookie";
// import { Auth } from "./components/Auth";


export const Chat = (props) => {
    const {room} = props;
    const [newMsg, setNewMsg] = useState("");
    const [messages, setMessages] = useState([]);

    const msgRef = collection(db, "messages");

    useEffect(() => {
        const queryMsg = query(msgRef, where("room", "==", room), orderBy("createdAt")
        )
        const unsubscribe = onSnapshot(queryMsg, (snapshot) => {
            let messages= [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessages(messages);
            // console.log(messages)
        });

        return () => unsubscribe();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMsg === "") return;

        const newMsgData = {
            text: newMsg,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room,
            uid: auth.currentUser.uid
        }
        // console.log(newMsgData.createdAt)
        await addDoc(msgRef, newMsgData)

        setNewMsg("")
    }

    function convertDate(time) {
        //time should be server timestamp seconds only
        let dateInMillis = time * 1000
        let date = new Date(dateInMillis);
        let mm = date.getMonth();
        let dd = date.getDate();
        let myTime = date.toLocaleTimeString()
        // myDate = myDate.replaceAll('/', '-')
        
        return mm + "-" + dd + " " + myTime
    }

    function msgStyling(user) {
        if (user === auth.currentUser.uid) {
            return 'rightMsg'
        }
    }

    setTimeout(() => {
        const msgWindow = document.querySelector(".messages")
        // allow 1px inaccuracy by adding 1
        let isScrolledToBottom = msgWindow.scrollHeight - msgWindow.clientHeight >= msgWindow.scrollTop;
        // console.log(msgWindow.scrollHeight - msgWindow.clientHeight,  msgWindow.scrollTop);
        
        // scroll to bottom if isScrolledToBottom
        if(isScrolledToBottom)
        msgWindow.scrollTop = msgWindow.scrollHeight - msgWindow.clientHeight;
    },100)

    return (
    <div className="chat-app">Start Chatting
        <div className="header">
            <h2>{room}</h2>
        </div>
        <div className={"messages"+" "+(messages.length>5 && 'scroll')}> 
            {messages.map((message) => (
                <div className={'msg'+' '+msgStyling(message.uid)} key={message.id}>
                    <p className="user">{message.user} 
                        <span>{convertDate(message.createdAt)}</span>
                    </p>
                    <p className={'msgText'}>{message.text}</p>
                </div>
            ))}
        </div>
        <form className="new-msg-form" onSubmit={handleSubmit}>
            <input 
                className="new-msg-input" 
                placeholder="Enter message"
                onChange={(e) => setNewMsg(e.target.value)}
                value={newMsg}
            ></input>
            <button type="submit">Send</button>
        </form>
    </div>
    )
}