import {useState} from "react";
import {spaces} from "../data/mockOfficev2.ts";
import {timeConverter} from "../util/timeConverter.ts";

export const Management = () => {

    const [selectedSpace, setSelectedSpace] = useState("");

    function filterBySelected() {
        return spaces.filter(space => space.spaceName == selectedSpace)[0];
    }

    return (
        <>

            <div className="flex items-center justify-between mb-8">
                <select className="select select-accent w-full max-w-xs" defaultValue={"Select Space"}
                        onChange={(e) => setSelectedSpace(e.target.value)}>
                    <option disabled>Select Space</option>
                    {spaces.map((space) => <option key={space.id}>{space.spaceName}</option>)}
                </select>
            </div>


            <div className="flex flex-wrap flex-col ">
                {selectedSpace && filterBySelected().devices && filterBySelected().devices.map(device =>
                    <div key={device.id}>
                        <div className="collapse collapse-arrow bg-base-200 ">
                            <input type="radio" name="my-accordion-2"/>
                            <div className="collapse-title text-xl font-medium">
                                {device.deviceName}
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

                            </div>

                        </div>


                    </div>
                )}
            </div>

        </>
    )
}