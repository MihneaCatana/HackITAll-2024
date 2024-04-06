import { useForm } from "react-hook-form"
import CreateButton from "../components/buttons/CreateButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { dataServiceURL } from "../const"
import { spaces as DUMMY_SPACES } from "../data/mockOfficev2"
import { Space } from "../types/space"

function CreateDevice() {
  const [spaces, setSpaces] = useState<Space[]>([])

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      spaceID: "",
      deviceName: ""
    }
  })

  useEffect(() => {
    // axios.get(`${dataServiceURL}/users/email`, {
    //   headers: {
    //       "Authorization": `Bearer ${"test"}`,
    //       "Content-Type": "application/json"
    //   }
      
    // }).then((spacesResponse) => {
    //   const spaces = spacesResponse.data
    //   setSpaces(spaces)
    // })
    setSpaces(DUMMY_SPACES)
  }, [])

  async function createDevice(data: { spaceID: string, deviceName: string }){
      //   await axios.post(`${dataServiceURL}`, {
      //     headers: {
      //       "Authorization": `Bearer ${"test"}`,
      //       "Content-Type": "application/json"
      //     },
      //     data: {
      //       spaceId: data.spaceID,
      //       deviceName: data.deviceName
      //     }
      //   })

      console.log(data)

        setValue("spaceID", "")
        setValue("deviceName", "")
  }

  return (
    <div className="flex flex-col items-center">
    <h1 className="text-2xl font-bold text-center mb-[5vh]">Create Device</h1>

     <form onSubmit={handleSubmit(createDevice)}>
        <label className="w-full max-w-xs form-control">
            <div className="label">
                <span className="label-text">Select space</span>
            </div>
            <select className="w-full max-w-xs select select-bordered">
              <option disabled selected></option>
              {spaces.map((space) => {
                return <option value={space.id} id={space.spaceName} key={space.id}>{space.spaceName}</option>
              })}
            </select>
        </label>

        <label className="w-full max-w-xs mt-4 form-control">
            <div className="label">
                <span className="label-text">Device name</span>
            </div>
            <input
            {...register("deviceName")} 
            type="text" 
            placeholder="Type here" 
            className="w-full max-w-xs input input-bordered" />
        </label>

        <CreateButton text="Create device" />
     </form>
</div>
  )
}

export default CreateDevice