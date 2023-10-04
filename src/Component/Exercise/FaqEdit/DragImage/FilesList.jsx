import { useMemo } from "react"

function list(files) {
    const label = file => `${file.name} of size ${file.size} and type ${file.type}`
    const preview = file => <img className="w-36 h-36" src={URL.createObjectURL(file)} alt={file.name + 2} />
    return files.map(file => <li className="flex flex-col justify-between items-center gap-y-6" key={file.name}>{label(file)} {preview(file)}</li>)
}

export const FilesList = ({ files }) => {
    if (files.length === 0) {
        return null
        return <div>Nothing to display here....</div>
    }

    const filesList = useMemo(() => list(files), [files])

    return <div>{filesList}</div>
}