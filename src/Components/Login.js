import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';
import './Login.css';

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn= () => {
        auth.signInWithPopup(provider).then(res => {
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user,
            });
        }).catch(err => {
            alert(err.message);
        })
    }

    return (
		<div className='login'>
			<div className='login__container'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/239px-WhatsApp.svg.png'
					alt=''
				/>
				<div className='login__text'>
					<h1>Sign In to WhatsApp</h1>
				</div>
				<Button onClick={signIn}>Sign In with Google</Button>
			</div>
		</div>
	);
}

export default Login;