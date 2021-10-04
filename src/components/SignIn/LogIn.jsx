import React,{useState} from "react";
import './index.scss'
import axios from "axios";

export default function LogIn () {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])

    let submitButton = () => {
        axios.post('http://localhost:8000/api/auth/login', {
            username: username,
            password: password
        }).then(r => console.log(r)).catch(e => console.log(e))
    }

    return (
        <div className='login'>
            <h1>Please login!</h1>
            <div className='username'>
                <h3>Username</h3>
                <input placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className='password'>
                <h3>Password</h3>
                <input placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={()=> submitButton()}>Submit</button>
        </div>
    )
}