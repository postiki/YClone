import './index.scss'
import React, {useState} from "react";
import {connect} from "react-redux";
import {register} from "../../redux/actions/auth";

function SignUp ({dispatch}) {
    const [successful, setSuccessful] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   let submitButton = () => {
        setSuccessful(false)

        dispatch(register(username, email, password))
            .then(() => setSuccessful(true))
            .catch(() => setSuccessful(false))
   }

    return (
        <div className='signup'>
            <h1>Please signup!</h1>
            <div className='username'>
                <h3>Username</h3>
                <input placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
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

function mapStateToProps(state) {
    return {
        message: state.message
    };
}

export default connect(mapStateToProps)(SignUp)