import './index.scss'
import React, {useState} from "react";
import {connect} from "react-redux";
import {login} from "../../redux/actions/auth";
import {Redirect} from "react-router-dom";

function LogIn({user, dispatch, history}) {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let submitButton = () => {
        setLoading(true)

        dispatch(login(username, password))
            .then(() => {
                history.push("/profile");
                window.location.reload();
            })
            .catch(() => setLoading(false));
    }

    if (user.isLoggedIn) {
        return <Redirect to="/profile" />;
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
            <button onClick={() => submitButton()}>Submit</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.auth,
        message: state.message
    };
}

export default connect(mapStateToProps)(LogIn)