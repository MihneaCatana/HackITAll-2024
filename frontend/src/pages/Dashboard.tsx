import { spaces as DUMMY_SPACES } from "../data/mockOfficev2";
import { useEffect, useState } from "react";
import { Space } from "../types/space";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';


function Dashboard() {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [selectedSpaceID, setSelectedSpaceID] = useState<number>()

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setSelectedSpaceID(DUMMY_SPACES[0].id)
  }, [])

  function onStartDateChange(startDate: Date){
    setStartDate(startDate);
  }

  function onEndDateChange(endDate: Date){
    setEndDate(endDate);
  }

  return (
    <div className="flex flex-wrap items-end justify-evenly">
        <label className="w-full max-w-xs form-control">
            <div className="label">
                <span className="label-text">Select space</span>
            </div>

            <select
            onChange={(event) => {
                const spaceID = Number(event.target.value)
                setSelectedSpaceID(spaceID)}
            }
            className="w-full max-w-xs select select-bordered"
            >
                {DUMMY_SPACES.map((space) => {
                    return <option key={space.id} value={space.id}>{space.spaceName}</option>
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

        <button className="btn btn-primary">View consumption</button>
    </div>
  )
}

export default Dashboard