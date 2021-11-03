import './index.scss';

import UserService from "../../service/userService";
import {useEffect, useState} from "react";

export default function Home() {
    const [content , setContent] = useState()

    useEffect(() => {
        UserService.getPublicContent().then(
            response => {
                setContent(response.data)
            },
            error => {
                setContent(error.data)
            })
    },[])

    return(
        <div className='home'>
            <h1>home page</h1>
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    )
}
