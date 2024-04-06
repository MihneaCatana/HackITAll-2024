import { useFormContext } from "react-hook-form"

interface Props {
    label: string,
    value: string,
    field: string
}

function TextInput({label, value, field}: Props) {
  const { register } = useFormContext()

  return (
    <label className="w-full max-w-xs form-control">
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <input 
        {...register(`${field}`)}
        value={value} 
        type="text" 
        placeholder="Type here" 
        className="w-full max-w-xs input input-bordered" />
    </label>
  )
}

export default TextInput