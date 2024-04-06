import { useForm } from "react-hook-form"
import TextInput from "../inputs/TextInput"

interface Props {
    officeName: string
}

function OfficeForm({officeName}: Props) {
  const { handleSubmit } = useForm({
    defaultValues: {
        officeName
    }
  })

  async function createOffice(data: Props){
    try{
     
    }catch(error){

    }
  }

  return (
    <form onSubmit={handleSubmit(createOffice)}>
        <TextInput 
        field="officeName"
        label="Office name" 
        value={officeName} />
    </form>
  )
}

export default OfficeForm