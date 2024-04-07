import {useEffect, useRef, useState} from "react";
import {Space} from "../types/space";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";
import Axios from "axios";
import {dataServiceURL} from "../const.ts";
import {EnergyEvent} from "../types/energyEvent.ts";

interface RealtimeData {
    date: string
    consumption: number,
}

interface DashboardData {
    [key: string]: {
        minute: string,
        consumption: number
    },
}

function Dashboard() {
    const [spaces, setSpaces] = useState<Space[]>([])
    const [events, setEvents] = useState<EnergyEvent[]>([])
    const ref = useRef<null | number>(null)
    const [selectedSpace, setSelectedSpace] = useState<string>()
    const [dashboardData, setDashboardData] = useState<RealtimeData[]>([])

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const JWT = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    useEffect(() => {
        // setSelectedSpace(DUMMY_SPACES[0].name)

        Axios.get(`${dataServiceURL}/users/${email}`, {
            headers: {
                "Authorization": `Bearer ${JWT}`,
                "Content-Type": "application/json"
            }

        }).then((spacesResponse: { data: { spaces: Space[] } }) => {
            const spaces = spacesResponse.data.spaces
            setSpaces(spaces)
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

    useEffect(() => {
        const intervalData = events.filter((event) => {
            const deviceDate = new Date(event.timestamp)

            return deviceDate >= startDate! && deviceDate <= endDate! && event.space === selectedSpace
        })

        const dataPoints = intervalData.map((dataPoint) => {
            return {
                date: new Date(dataPoint.timestamp).toString(),
                consumption: dataPoint.consumption
            }
        })
        setDashboardData(dataPoints)
    }, [startDate, endDate, selectedSpace, events])

    function onStartDateChange(startDate: Date) {
        setStartDate(startDate);
    }

    function onEndDateChange(endDate: Date) {
        endDate.setDate(endDate.getDate() + 1)
        setEndDate(endDate);
    }

    const data: DashboardData = {}
    for (const dataPoint of dashboardData) {
        const dataPointMinutes = new Date(dataPoint.date).getMinutes().toString()

        if (!data[dataPointMinutes]) {
            data[dataPointMinutes] = {
                minute: dataPointMinutes,
                consumption: (dataPoint.consumption)
            }
        } else {
            data[dataPointMinutes] = {
                minute: dataPointMinutes,
                consumption: (data[dataPointMinutes].consumption + dataPoint.consumption)
            }
        }
    }

    return (
        <div>
            <div className="flex flex-wrap items-end justify-evenly">
                <label className="w-full max-w-xs form-control">
                    <div className="label">
                        <span className="label-text">Select space</span>
                    </div>

                    <select
                        onChange={(event) => {
                            const spaceName = event.target.value
                            setSelectedSpace(spaceName)
                        }
                        }
                        className="w-full max-w-xs select select-bordered"
                        defaultValue={"Select Space"}
                    >
                        <option disabled>Select Space</option>
                        {spaces.map((space) => {
                            return <option key={space.id} value={space.name}>{space.name}</option>
                        })}
                    </select>
                    {/*{console.log(spaces)}*/}
                </label>

                <div className="w-full max-w-xs mt-2 ml-4 form-control">
                    <label htmlFor="start-date" className="label">
                        Start date
                    </label>

                    <DatePicker
                        id="start-date"
                        selected={startDate}
                        onChange={onStartDateChange}
                        maxDate={new Date()}
                    />
                </div>

                <div className="w-full max-w-xs mt-2 form-control">
                    <label htmlFor="end-date" className="label">
                        End date
                    </label>

                    <DatePicker
                        id="end-date"
                        selected={endDate}
                        onChange={onEndDateChange}
                        maxDate={new Date()}
                    />
                </div>
            </div>

            <div className="mt-[10vh] flex flex-col items-center">
                <h1 className="mb-6 text-2xl font-bold">Energy consumption (KW/minute)</h1>

                <BarChart width={730} height={250} data={Object.values(data)}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="minute"/>
                    <YAxis dataKey="consumption"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="consumption" fill="#23c9cf"/>
                </BarChart>
            </div>
        </div>
    )
}

export default Dashboard