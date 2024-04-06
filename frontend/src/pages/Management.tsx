import {useState} from "react";
import {timeConverter} from "../util/timeConverter.ts"
import {dataOffice} from "../data/mockOffice.ts"

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
                    <div key={room.id}>
                        <div
                            className="mt-8 flex flex-wrap mr-10">

                            <div className="card w-96 bg-neutral text-neutral-content ">
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{room.roomName}</h2>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary mt-5"
                                                onClick={() => {

                                                    const elem = document.getElementById(room.id.toString());
                                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                    // @ts-expect-error
                                                    elem.showModal();
                                                }}>More
                                            info...
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <dialog id={room.id.toString()} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-lg text-center mb-9">{room.roomName}</h3>
                                <div className="flex flex-col">
                                    {room?.devices?.map(device =>
                                        <div className="mb-4 mx-4" key={device.id}>
                                            <p className="text-2xl">
                                                {device.deviceName}
                                            </p>
                                            <div className="stats shadow">
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
                                                        className="stat-value text-secondary">{device.consumption} KW/h
                                                    </div>
                                                    <div className="stat-desc">Last
                                                        update: {timeConverter(device.timestamp)}</div>
                                                </div>
                                                <div className="stat">
                                                    <div className="stat-figure text-secondary">
                                                    </div>
                                                    <div className="stat-title">Status</div>
                                                    <input type="checkbox" className="toggle"
                                                           defaultChecked={device.status}
                                                           onChange={(e) => {
                                                               // SINGLE TIME USE
                                                               console.log(device.id)
                                                               console.log(e.target.value)
                                                           }}/>
                                                </div>

                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </dialog>
                    </div>
                )}
            </div>
        </>
    )
}