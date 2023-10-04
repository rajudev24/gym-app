import React, { useCallback, useContext, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TargetBox } from './TargetBox'
import { FilesList } from './FilesList'
import { FaqContext } from '../../../../Pages/Exercise Pages/FormsQuestions/SpecificQuestionPage/SpecificQuestionPage'

export const DragImage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <DragAndDropFile />
        </DndProvider>
    )
}

const DragAndDropFile = () => {
    const [droppedFiles, setDroppedFiles] = useState([]);

    const handleFileDrop = useCallback((item) => {
        if (item) {
            const files = item.files
            // console.log(item, "ietm", files)
            setDroppedFiles(files)
        }
    }, [setDroppedFiles])

    const { handleAdvancedSettings, currentlyViewing } = useContext(FaqContext)

    const handleClickedSave = () => {
        handleAdvancedSettings(currentlyViewing?.quId, { image: droppedFiles[0] })
    }

    return (
        <div className='flex gap-x-6 items-center'>
            <TargetBox onDrop={handleFileDrop} />
            <div className='flex flex-col gap-y-4'>
                <FilesList files={droppedFiles} />
                {
                    droppedFiles?.length
                    ? <button className='btn btn-primary btn-xs' onClick={handleClickedSave}>Save</button>
                    : null
                }
            </div>
        </div>
    )
}

function Bucket() {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'BOX',
        // Props to collect
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    return (
        <div
            ref={drop}
            role={'Dustbin'}
            style={{ backgroundColor: isOver ? 'red' : 'white' }}
        >
            {canDrop ? 'Release to drop' : 'Drag a box here'}
        </div>
    )
}

function Box() {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'BOX',
        // The collect function utilizes a "monitor" instance (see the Overview for what this is)
        // to pull important pieces of state from the DnD system.
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    console.log(isDragging, "isDragging")

    return (
        <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div role='Handle' ref={drag}>BOX BOX</div>
        </div>
    )
    // return (
    //     {/* This is optional. The dragPreview will be attached to the dragSource by default */ }
    //     <div
    //     ref = { dragPreview } 
    //     style = {{ opacity: isDragging ? 0.5 : 1 }}
    //     >
    // {/* The drag ref marks this node as being the "pick-up" node */ }
    // < div role = "Handle" ref = { drag } />
    //   </div >
    // )
}