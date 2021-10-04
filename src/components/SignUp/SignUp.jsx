import React, {useState} from "react";
import axios from "axios";
import './index.scss'

export default function SignUp () {
    const [login, setLogin] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])

   let submitButton = () => {
        axios.post('http://localhost:8000/api/auth/signup', {
            username: login,
            email: email,
            password: password,
            roles: ['user']
        }).then(r => console.log(r)).catch(e => console.log(e))
   }

    return (
        <div className='signup'>
            <h1>Please signup!</h1>
            <div className='username'>
                <h3>Username</h3>
                <input placeholder='username' onChange={(e) => setLogin(e.target.value)}/>
            </div>
            <div className='email'>
                <h3>Email</h3>
                <input placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='password'>
                <h3>Password</h3>
                <input placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={()=> submitButton()}>Submit</button>
        </div>
    )
}