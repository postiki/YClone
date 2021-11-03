import './index.scss'

import {useEffect, useState} from "react";
import {createBrowserHistory} from "history";
import {BrowserRouter, Router, Route, Link} from 'react-router-dom'

import {connect} from "react-redux";
import { logout } from "./redux/actions/auth";
import { clearMessage } from "./redux/actions/message";

import Home from "./pages/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Profile from "./pages/Profile/Profile";

import User from "./pages/User/User";

import BoardAdmin from "./pages/content/board-admin.component";
import BoardModerator from "./pages/content/board-moderator.component";

export const history = createBrowserHistory();

function App({dispatch, user}) {

    const [currentUser, setCurrentUser] = useState()
    const [showModeratorBoard, setShowModeratorBoard] = useState(false)
    const [showAdminBoard, setShowAdminBoard] = useState(false)

    useEffect(() => {
        setCurrentUser(user.user)
        if(user.roles?.includes("ROLE_MODERATOR")){
            setShowModeratorBoard(true)
        }
        if(user.roles?.includes("ROLE_ADMIN")){
            setShowAdminBoard(true)
        }
    },[user])

    function logOut(){
        dispatch(logout())
    }

    history.listen((location) => {
        dispatch(clearMessage()); // clear message when changing location
    })

    return (
        <div className='app'>
            <Router history={history}>
                <BrowserRouter>
                    <h1>app</h1>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            bezKoder
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                    Home
                                </Link>
                            </li>

                            {showModeratorBoard && (
                                <li className="nav-item">
                                    <Link to={"/mod"} className="nav-link">
                                        Moderator Board
                                    </Link>
                                </li>
                            )}

                            {showAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link">
                                        Admin Board
                                    </Link>
                                </li>
                            )}

                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/user"} className="nav-link">
                                        Create a appointment
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>
                    <Route exact path={["/", "/home"]} component={Home}/>
                    <Route exact path="/login" component={LogIn}/>
                    <Route exact path="/register" component={SignUp}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route path="/user" component={User} />
                    <Route path="/mod" component={BoardModerator} />
                    <Route path="/admin" component={BoardAdmin} />
                </BrowserRouter>
            </Router>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.auth,
    };
}

export default connect(mapStateToProps)(App);
