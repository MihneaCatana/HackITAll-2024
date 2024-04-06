import {useState} from "react";
import {dataOffice} from "../data/mockOffice.js"

export const Management = () => {

    const [selectedFloor, setSelectedFloor] = useState("");

    const cond = parseInt(selectedFloor && selectedFloor.split(" ")[1]) - 1

    return (
        <>

            <div className="flex items-center justify-between">
                <select className="select select-accent w-full max-w-xs" defaultValue={"Select Floor"}
                        onChange={(e) => setSelectedFloor(e.target.value)}>
                    <option disabled>Select Floor</option>
                    {dataOffice.floors.map((floor) => <option key={floor.id}> Floor {floor.floorNumber}</option>)}
                </select>

            </div>
            <div className="flex flex-wrap">

                {selectedFloor && dataOffice.floors[cond]?.rooms.map(room =>
                    <div
                        className="mt-8 flex flex-wrap mr-10" key={room.id}>

                        <div className="card w-96 bg-neutral text-neutral-content ">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{room.roomName}</h2>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary mt-5" onClick={() => console.log(room.id)}>More
                                        info...
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/*ROOMS / Floor*/}
        </>
    )
}