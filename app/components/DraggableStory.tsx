'use client'
import React, {useContext} from 'react'
import {
    DndContext,
    KeyboardSensor,
    Modifiers,
    MouseSensor,
    PointerActivationConstraint,
    TouchSensor,
    useDraggable,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import Draggable from "@/app/components/Draggable";
import {BoardContext} from "@/context/BoardContext";

interface Props {
    activationConstraint?: PointerActivationConstraint;
    modifiers?: Modifiers;
    buttonStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    label?: string;
}

const defaultCoordinates = {

};

export function DraggableStory({
                                   activationConstraint,
                                   modifiers,
                                   style,
                                   buttonStyle,
                               }: Props) {
    // const [coordinates, setCoordinates] = useState<{ [key in string]: Coordinates }>(defaultCoordinates);
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint,
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint,
    });
    const keyboardSensor = useSensor(KeyboardSensor, {});
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const context = useContext(BoardContext)

    // console.log(coordinates)
    console.log(context.board)

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={({delta, ...others}) => {
                context.updateCheckpointPosition({
                    idBoard: 'Top1',
                    idCheckpoint: others.active.id.toString(),
                    position: {
                        x: context.getCheckpointByID({idBoard:'Top1', idCheckpoint:others.active.id.toString()}).position.x + delta.x,
                        y: context.getCheckpointByID({idBoard:'Top1', idCheckpoint:others.active.id.toString()}).position.y + delta.y,
                    }
                })
            }}
            modifiers={modifiers}
        >
            {
                    context?.board['Top1'].checkpoints.map((checkpoint,index) => {
                        return (<DraggableItem
                            key={'drag-Top1-'+index}
                            id={checkpoint.id}
                            top={checkpoint.position.y}
                            left={checkpoint.position.x}
                            style={style}
                            boardId={'Top1'}
                            buttonStyle={buttonStyle}
                        />)
                    })
            }
        </DndContext>
    );
}

interface DraggableItemProps {
    handle?: boolean;
    style?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    top?: number;
    left?: number;
    boardId: string;
    id: string
}


function DraggableItem({
                           style,
                           top,
                           left,
                           handle,
                           buttonStyle,
                           id,
                           boardId
                       }: DraggableItemProps) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
    } = useDraggable({
        id: id,
    });

    return (
        <Draggable
            boardId={boardId}
            ref={setNodeRef}
            dragging={isDragging}
            handle={handle}
            id={id}
            listeners={listeners}
            style={{...style, top, left}}
            buttonStyle={buttonStyle}
            transform={transform}
            {...attributes}
        />
    );
}
