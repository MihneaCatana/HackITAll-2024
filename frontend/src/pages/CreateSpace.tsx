import {useState} from "react"
import OfficeForm from "../components/forms/OfficeForm"

function CreateSpace() {
    const [currentStep, setCurrentStep] = useState(1)

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-[5vh]">Create Space</h1>

            <div className="flex flex-col items-center w-full">
                <ul className="w-full steps max-w-[700px]">
                    <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>Office</li>
                    <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>Floors</li>
                    <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>Rooms</li>
                    <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>Devices</li>
                </ul>

                <div className="mt-[5vh] w-full flex justify-center">
                    {currentStep === 1 && <OfficeForm noFloors="" officeName="" setCurrentStep={setCurrentStep}/>}
                    {currentStep === 2 && <OfficeForm noFloors="" officeName="" setCurrentStep={setCurrentStep}/>}
                    {currentStep === 3 && <OfficeForm noFloors="" officeName="" setCurrentStep={setCurrentStep}/>}
                    {currentStep === 4 && <OfficeForm noFloors="" officeName="" setCurrentStep={setCurrentStep}/>}
                </div>
            </div>
        </div>
    )
}

export default CreateSpace