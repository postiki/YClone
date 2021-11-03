import './index.scss';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

function Profile({user}) {

    if (!user.user) {
        return <Redirect to="/login" />;
    }

    return(
        <div className='profile'>
            <h1>profile page</h1>
            <header className="jumbotron">
                <h3>
                    <strong>{user.user.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong>{user.user.accessToken.substring(0, 20)} ...{" "}
                {user.user.accessToken.substr(user.user.accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {user.user.id}
            </p>
            <p>
                <strong>Email:</strong> {user.user.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {user.user.roles &&
                user.user.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.auth,
    };
}

export default connect(mapStateToProps)(Profile);