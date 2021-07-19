import React from 'react';
import firebase from 'firebase/app';
import { auth } from '../firebase';
import {Button} from "@material-ui/core";

const Login = () => {
    const googleLogin = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
            <Button style={{ padding: '30px', fontSize: '20px', borderRadius: '0', fontWeight: '600' }} onClick = {googleLogin}>Login with Google</Button>
        </div>
    );
}

export default Login;
