import Axios from "axios"
import {useForm} from "react-hook-form"
import {dataServiceURL} from "../const"
import CreateButton from "../components/buttons/CreateButton"
import {toast, ToastContainer} from "react-toastify";

function CreateSpace() {
    const {register, handleSubmit, setValue} = useForm({
        defaultValues: {
            spaceName: ""
        }
    })

    async function createSpace(data: { spaceName: string }) {
        const email = localStorage.getItem("email");
        const JWT = localStorage.getItem("token");
        try {
            await Axios.post(`${dataServiceURL}/users/${email}/spaces`, {
                name: data.spaceName
            }, {
                headers: {
                    "Authorization": `Bearer ${JWT}`,
                },

            })
            toast.success('The space was created!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
            console.log(data.spaceName)
            setValue("spaceName", "")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center mb-[5vh]">Create Space</h1>
            <ToastContainer/>
            <form onSubmit={handleSubmit(createSpace)}>
                <label className="w-full max-w-xs form-control">
                    <div className="label">
                        <span className="label-text">Space name</span>
                    </div>
                    <input
                        {...register("spaceName")}
                        type="text"
                        placeholder="Type here"
                        className="w-full max-w-xs input input-bordered"/>
                </label>

                <CreateButton text="Create space"/>
            </form>
        </div>
    )
}

export default CreateSpace