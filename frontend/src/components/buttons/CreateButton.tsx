interface Props {
    text: string
}

function CreateButton({ text }: Props) {
  return (
    <button type="submit" className="w-full mt-4 btn btn-primary">{text}</button>
  )
}

export default CreateButton