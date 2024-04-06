import axios from "axios"
import { useForm } from "react-hook-form"
import { dataServiceURL } from "../const"
import CreateButton from "../components/buttons/CreateButton"

function CreateSpace() {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
        spaceName: ""
    }
  })

  async function createSpace(data: { spaceName: string }){
    try{
        // axios.post(`${dataServiceURL}/users/email`, {
        //     headers: {
        //         "Authorization": `Bearer ${"test"}`,
        //         "Content-Type": "application/json"
        //     },
        //     data: {
        //         spaceName: data.spaceName
        //     }
        // })

        console.log(data.spaceName)
        setValue("spaceName", "")
    }catch(error){

    }
  }

  return (
    <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-[5vh]">Create Space</h1>

         <form onSubmit={handleSubmit(createSpace)}>
            <label className="w-full max-w-xs form-control">
                <div className="label">
                    <span className="label-text">Space name</span>
                </div>
                <input
                {...register("spaceName")} 
                type="text" 
                placeholder="Type here" 
                className="w-full max-w-xs input input-bordered" />
            </label>

            <CreateButton text="Create space" />
         </form>
    </div>
  )
}

export default CreateSpace