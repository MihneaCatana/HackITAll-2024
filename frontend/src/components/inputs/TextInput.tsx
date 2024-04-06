import { useFormContext } from "react-hook-form"

interface Props {
    label: string,
    field: string
}

function TextInput({label, field}: Props) {
  const { register } = useFormContext()

  return (
    <label className="max-w-xs form-control min-w-[280px] w-[40vw]">
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <input 
        {...register(`${field}`)} 
        type="text" 
        placeholder="Type here" 
        className="w-full max-w-xs input input-bordered" />
    </label>
  )
}

export default TextInput