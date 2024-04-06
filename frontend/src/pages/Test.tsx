import Axios from "axios";
import {dataServiceURL} from "../const.ts";
import {useEffect, useRef, useState} from "react";
import {EnergyEvent} from "../types/energyEvent.ts";


export const Test = () => {

    const [events, setEvents] = useState<EnergyEvent[]>([]);
    const ref = useRef<null | number>(null);

    useEffect(() => {
        const email = localStorage.getItem("email");
        const JWT = localStorage.getItem("token");

        ref.current = setInterval(() => {
            Axios.get(`${dataServiceURL}/users/${email}/spaces`, {
                headers: {
                    "Authorization": `Bearer ${JWT}`,
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.data.length > 0) {
                    setEvents(res.data)
                }
            })
        }, 5000)

        return () => clearInterval(ref.current!);
    }, []);


    return (
        <div>
            {events.map(space => <p
                key={space.space + space.name + space.consumption}>{JSON.stringify(space)}<br/></p>)}
        </div>
    )
}