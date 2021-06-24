import React, { useState } from 'react'
import firebase from '../config/firebase'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const hundleSubmit = (e) => {
        e.preventDefaule()
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
            console.log(err)
        }) 

    }
    return (
        <>
            <h1>Login</h1>        
            <form onSubmit={hundleSubmit}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='Email'
                        value={email}
                        onChange ={(e)=>{
                         setEmail(e.target.value)
                        }}
                        
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password' 
                        id='password' 
                        name='password'
                        placeholder='password' 
                        value={password}
                        onChange = {(e)=> {
                            setPassword(e.target.value)
                        }}
                        
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}


export default Login;