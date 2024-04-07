import {useEffect, useRef, useState} from "react";
import {Space} from "../types/space";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";
import Axios from "axios";
import {dataServiceURL} from "../const.ts";
import {EnergyEvent} from "../types/energyEvent.ts";
import "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js"

interface groupedByDevice {
    [key: string]: {
        deviceName: string,
        minute: string,
        consumption: number
    }[]
}

function generatePDF(data: { minute: string; consumption: number, deviceName: string; }[], spaceName: string) {
    const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a5',
        putOnlyUsedFonts: true
    });

    const groupedByDeviceName: groupedByDevice = {}

    for (const event of data) {
        if (!groupedByDeviceName[event.deviceName]) {
            groupedByDeviceName[event.deviceName] = [{
                deviceName: event.deviceName,
                minute: event.minute,
                consumption: event.consumption
            }]
        } else {
            groupedByDeviceName[event.deviceName].push({
                deviceName: event.deviceName,
                minute: event.minute,
                consumption: event.consumption
            })
        }
    }

    pdf.text("Energy Buddy", 50, 10)
    pdf.text("Email: " + localStorage.getItem("email"), 15, 30);
    pdf.text("Space: " + spaceName, 15, 40)
    for (const device of Object.values(groupedByDeviceName)) {
        let index = 0
        pdf.text(`Device ${index + 1}: ` + device[0].deviceName, 25, 50)
        for (const event of device) {
            pdf.text("Minute: " + event.minute + ", Consumption: " + event.consumption.toFixed(2) + " KW", 35, 60 + index * 10)
            index++
        }
    }
    // pdf.text(data, 20, 20);
    pdf.save('Report_Energy_Buddy.pdf');
}


interface RealtimeData {
    date: string
    consumption: number,
    deviceName: string
}

interface DashboardData {
    [key: string]: {
        minute: string,
        consumption: number,
        deviceName: string
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
                consumption: dataPoint.consumption,
                deviceName: dataPoint.name
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
                consumption: dataPoint.consumption / 720,
                deviceName: dataPoint.deviceName
            }
        } else {
            data[dataPointMinutes] = {
                minute: dataPointMinutes,
                consumption: data[dataPointMinutes].consumption + (dataPoint.consumption / 720),
                deviceName: dataPoint.deviceName
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
                <h1 className="mb-6 text-2xl font-bold">Energy consumption (KW/minutes)</h1>

                <BarChart width={730} height={250} data={Object.values(data)}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="minute"/>
                    <YAxis dataKey="consumption"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="consumption" fill="#23c9cf"/>
                </BarChart>
            </div>

            <div className="flex justify-end mt-[10vh] px-[15%]">
                <button className="btn btn-primary"
                        onClick={() => generatePDF(Object.values(data), selectedSpace!)}>Export report
                </button>
            </div>
        </div>
    )
}

export default Dashboard