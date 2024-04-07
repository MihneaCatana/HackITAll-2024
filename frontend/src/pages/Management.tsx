import {useEffect, useRef, useState} from "react";
import {Space} from "../types/space.ts";
import Axios from "axios";
import {dataServiceURL} from "../const.ts";
import {EnergyEvent} from "../types/energyEvent.ts";
import {toast, ToastContainer} from "react-toastify";

function getLatestConsumptionEvent(events: EnergyEvent[], spaceNameSelected: string, nameDevice: string) {
    const devicesSpace = events.filter(event => event.space === spaceNameSelected);
    const deviceEvents = devicesSpace.filter(event => event.name === nameDevice);
    return deviceEvents[deviceEvents.length - 1]?.consumption
}

export const Management = () => {
    const [spaces, setSpaces] = useState<Space[]>([])
    const [selectedSpace, setSelectedSpace] = useState("");

    const [events, setEvents] = useState<EnergyEvent[]>([]);
    const ref = useRef<null | number>(null);

    const JWT = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    function filterBySelected(spaces: Space[]): Space {
        return spaces.filter(space => space.name == selectedSpace)[0];
    }

    useEffect(() => {
        Axios.get(`${dataServiceURL}/users/${email}`, {
            headers: {
                "Authorization": `Bearer ${JWT}`,
                "Content-Type": "application/json"
            }

        }).then((spacesResponse) => {
            const spaces = spacesResponse.data
            setSpaces(spaces.spaces)
        })

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
    }, [])

    return (
        <>

            <div className="flex items-center justify-between mb-8">
                <select className="select select-accent w-full max-w-xs" defaultValue={"Select Space"}
                        onChange={(e) => setSelectedSpace(e.target.value)}>
                    <option disabled>Select Space</option>
                    {spaces.map((space) => <option key={space.id}>{space.name}</option>)}
                </select>
            </div>

            <div className="flex flex-wrap flex-col ">
                {selectedSpace && filterBySelected(spaces).devices && filterBySelected(spaces).devices?.map(device =>
                    <div key={device.id}>
                        <div className="collapse collapse-arrow bg-base-200 ">
                            <input type="radio" name="my-accordion-2"/>
                            <div className="collapse-title text-xl font-medium">
                                {device.name}
                            </div>
                            <div className="collapse-content">
                                <div className="mb-4 mx-4 " key={device.id}>
                                    <div className="stats shadow ">

                                        <div className="stat">
                                            <div className="stat-figure text-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24"
                                                     className="inline-block w-8 h-8 stroke-current">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                                </svg>
                                            </div>
                                            <div className="stat-title">Consumption</div>
                                            <div
                                                className="stat-value text-secondary">{getLatestConsumptionEvent(events, selectedSpace, device.name)?.toFixed(2)} KW/h
                                            </div>
                                        </div>
                                        <div className="stat">
                                            <div className="stat-figure text-secondary">
                                            </div>
                                            <div className="stat-title">Status</div>
                                            <input type="checkbox" className="toggle"
                                                   checked={Number.parseFloat(getLatestConsumptionEvent(events, selectedSpace, device.name)?.toFixed(2)) > 0}
                                                   onChange={() => {
                                                       Axios.put(`http://localhost:8080/events/${email}/${device.name}`, {status: !(Number.parseFloat(getLatestConsumptionEvent(events, selectedSpace, device.name)?.toFixed(2)) > 0)}).then(() => {
                                                           toast.success(`The device will be ${!(Number.parseFloat(getLatestConsumptionEvent(events, selectedSpace, device.name)?.toFixed(2)) > 0) ? "activated" : "deactivated"} soon!`, {
                                                               position: "top-right",
                                                               autoClose: 5000,
                                                               hideProgressBar: true,
                                                               closeOnClick: true,
                                                               pauseOnHover: true,
                                                               draggable: false,
                                                               progress: undefined,
                                                               theme: "colored",
                                                           })
                                                       }).catch(err => console.log(err))

                                                   }}/>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <ToastContainer/>
                    </div>
                )}

            </div>

            {selectedSpace && !filterBySelected(spaces).devices?.length &&
                <p className="text-center">There are no devices in this space!</p>}
        </>
    )
}