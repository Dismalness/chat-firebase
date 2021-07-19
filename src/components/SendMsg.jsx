import React, {useState} from 'react';
import { Button, Input } from '@material-ui/core';
import firebase from 'firebase';
import {store, auth} from "../firebase"

const SendMsg = ({scroll}) => {
    const [message, setMessage] = useState(" ");

    async function sendMessage(e){
        e.preventDefault(); //prevents the send button from refreshing the page
        const {uid, photoURL, displayName}  = auth.currentUser //information about the current user
        await store.collection("messages").add({
            text: message,
            photoURL,
            displayName,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMessage('') //empty input
        scroll.current.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <div className = "sendMessage">
            <form onSubmit = {sendMessage}>
                <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} value = {message} onChange = {(e) => setMessage(e.target.value)} placeholder = "Type Here!" />
                <Button style={{ width: '18%', fontSize: '20px', fontWeight: '600', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
            </form>
        </div>
    );
}

export default SendMsg;
