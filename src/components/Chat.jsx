import React, { useState, useEffect, useRef } from 'react';
import Logout from './Logout';
import { auth, store } from '../firebase';
import SendMsg from './SendMsg';

const Chat = () => {
    const scroll = useRef()
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        store.collection("messages").orderBy("createdAt").limit(30).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()));
        })
    },[]) // no need to add messages to the second argument because onSnapshot takes care of running useEffect according to collections only
    return (
        <div>
            <Logout />
            
            <div className = "messages">
            {messages.map(({id, text, photoURL,displayName, uid}) =>
                // unique id for each document 
                <div>
                    <div key = {id} className = {`message ${uid === auth.currentUser.uid ? "sent" : "received"}`}> 
                    <img src={photoURL} alt=""/>
                    <div className="displayName">{displayName}</div>
                    <p>{text}</p>
                    </div>
                </div>
            )}
            </div>
            <SendMsg scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    );
}

export default Chat;
