import { spaces as DUMMY_SPACES } from "../data/mockOfficev2";
import { mockDataDashboard } from "../data/mockDevices";
import { useEffect, useState } from "react";
import { Space } from "../types/space";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

interface RealtimeData {
    date: string
    consumption: number,
}

interface DashboardData {
    [key: string]: {
        date: string,
        consumption: number
    },
}

function Dashboard() {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [selectedSpace, setSelectedSpace] = useState<string>()
  const [dashboardData, setDashboardData] = useState<RealtimeData[]>([])

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setSelectedSpace(DUMMY_SPACES[0].name)
  }, [])

  useEffect(() => {
    const intervalData = mockDataDashboard.filter((mockData) => {
        const deviceDate = new Date(mockData.timestamp * 1000)

        return deviceDate >= startDate! && deviceDate <= endDate! 
    })

    const dataPoints = intervalData.map((dataPoint) => {
        return {
            date: new Date(dataPoint.timestamp * 1000).toDateString(),
            consumption: dataPoint.consumption
        }
    })
    setDashboardData(dataPoints)
  }, [startDate, endDate, selectedSpace])

  function onStartDateChange(startDate: Date){
    setStartDate(startDate);
  }

  function onEndDateChange(endDate: Date){
    endDate.setDate(endDate.getDate() + 1)
    setEndDate(endDate);
  }

  let data: DashboardData = {}
  for(const dataPoint of dashboardData){
    if(!data[dataPoint.date]){
        data[dataPoint.date] = {
            date: dataPoint.date,
            consumption: dataPoint.consumption
        }
    }else{
        data[dataPoint.date] = {
            date: dataPoint.date,
            consumption: data[dataPoint.date].consumption + dataPoint.consumption
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
                    setSelectedSpace(spaceName)}
                }
                className="w-full max-w-xs select select-bordered"
                >
                    {DUMMY_SPACES.map((space) => {
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
            <h1 className="mb-6 text-2xl font-bold">Energy consumption (KW/day)</h1>

            <BarChart width={730} height={250} data={Object.values(data)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="consumption" />
                <Tooltip />
                <Legend />
                <Bar dataKey="consumption" fill="#23c9cf" />
            </BarChart>
        </div>
    </div>
  )
}

export default Dashboard