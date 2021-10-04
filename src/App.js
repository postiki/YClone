import './index.scss';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import LogIn from "./components/SignIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import UserRegistration from "./components/Calendar/Calendar";

function App() {
    return (
        // <Router>
        //     <div className="App">
        //         <div className='switcher'>
        //             <Link to='/SignUp'>SignUp</Link>
        //             <Link to='/LogIn'>LogIn</Link>
        //         </div>
        //         <Switch>
        //             <Route path="/SignUp">
        //                 <SignUp />
        //             </Route>
        //             <Route path="/LogIn">
        //                 <LogIn />
        //             </Route>
        //         </Switch>
        //     </div>
        // </Router>
        <div className='App'>
            <UserRegistration />
        </div>
    );
}
export default App;
