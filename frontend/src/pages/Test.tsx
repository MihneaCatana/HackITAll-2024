import Axios from "axios";
import {dataServiceURL} from "../const.ts";
import {useEffect, useState} from "react";


export const Test = () => {

    const [spaces, setSpaces] = useState([]);

    useEffect(() => {
        const email = localStorage.getItem("email");
        setInterval(() => {
            Axios.get(`${dataServiceURL}/users/${email}/spaces`).then(res => {
                setSpaces(res.data)
            })
        }, 5000)


    }, []);


    return (
        <div>
            {spaces.map(space => <p>{JSON.stringify(space)}</p>)}
        </div>
    )
}