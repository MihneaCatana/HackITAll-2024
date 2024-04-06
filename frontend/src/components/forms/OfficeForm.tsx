import {FormProvider, useForm} from "react-hook-form"
import TextInput from "../inputs/TextInput"
// import axios from "axios"
// import {dataServiceURL} from "../../const"
import CreateButton from "../buttons/CreateButton"

interface UserProps {
    officeName: string,
    noFloors: string,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

interface FormProps {
    officeName: string
    noFloors: string
}

function OfficeForm({officeName, setCurrentStep}: UserProps) {
    const methods = useForm({
        defaultValues: {
            officeName,
            noFloors: ""
        }
    })

    async function createOffice(data: FormProps) {
        try {
            //  await axios.post(`${dataServiceURL}/1/offices`, {
            //     headers: {
            //         "Authorization": `Bearer ${"JWT"}`,
            //         "Content-Type": "application/json"
            //     },
            //     data
            //  })

            setCurrentStep((prevValue) => prevValue + 1)
            console.log(data)
        } catch (error) {

        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(createOffice)}
                  className="flex flex-col gap-4"
            >
                <TextInput
                    field="officeName"
                    label="Office name"
                />

                <TextInput
                    field="noFloors"
                    label="Number of floors"
                />

                <CreateButton text="Create office"/>
            </form>
        </FormProvider>
    )
}

export default OfficeForm