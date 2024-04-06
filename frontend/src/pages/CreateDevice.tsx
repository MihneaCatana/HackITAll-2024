import {useForm} from "react-hook-form"
import CreateButton from "../components/buttons/CreateButton"
import {useEffect, useState} from "react"
import Axios from "axios"
import {dataServiceURL} from "../const"
import {Space} from "../types/space"
import {toast, ToastContainer} from "react-toastify";

function CreateDevice() {
    const [spaces, setSpaces] = useState<Space[]>([])
    const [selectedSpace, setSelectedSpace] = useState("");
    const JWT = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const {register, handleSubmit, setValue} = useForm({
        defaultValues: {
            spaceID: "",
            deviceName: ""
        }
    })

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
    }, [])

    async function createDevice(data: { spaceID: string, deviceName: string }) {

        if (!selectedSpace) {
            toast.error('Space must be selected!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })

        } else if (!data.deviceName) {
            toast.error('Device must be named!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
        } else {


            await Axios.post(`${dataServiceURL}/users/${email}/${selectedSpace}`,
                {
                    spaceId: data.spaceID,
                    name: data.deviceName

                }, {
                    headers: {
                        "Authorization": `Bearer ${JWT}`,
                        "Content-Type": "application/json"
                    }
                })

            console.log(data)
            toast.success('The device was created!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
            setValue("spaceID", "")
            setValue("deviceName", "")
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center mb-[5vh]">Create Device</h1>

            <form onSubmit={handleSubmit(createDevice)}>
                <label className="w-full max-w-xs form-control">
                    <div className="label">
                        <span className="label-text">Select space</span>
                    </div>

                    <select className="w-full max-w-xs select select-bordered" defaultValue={"Select Space"}
                            onChange={(e) => setSelectedSpace(e.target.value)}>
                        <option disabled>Select Space</option>
                        {spaces && spaces.map((space) => {
                            return <option value={space.name} id={space.name}
                                           key={space.id}>{space.name}</option>
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
                        className="w-full max-w-xs input input-bordered"/>
                </label>

                <CreateButton text="Create device"/>

            </form>
            <ToastContainer/>
        </div>
    )
}

export default CreateDevice