'use client'
import React, {forwardRef, useContext, useMemo} from 'react';
import {useDraggable} from '@dnd-kit/core';
import {ArcherElement} from "react-archer";
import {BoardContext} from "@/context/BoardContext";

interface DraggableProps {
    dragging: boolean
    handle?: boolean
    label?: string
    style?: React.CSSProperties
    buttonStyle?: React.CSSProperties
    transform?: any
    axis?: any
    listeners?: any
    attributes?: any
    id: string
    boardId: string
}

// eslint-disable-next-line react/display-name
const Draggable = forwardRef(
    function ({dragging, style: styleProp, id, boardId}: DraggableProps, ref) {
        const context = useContext(BoardContext)
        const NodeData = useMemo(() => {
            return context.getCheckpointByID({idBoard: boardId, idCheckpoint: id})
        }, [context, id])
        const {attributes, listeners, setNodeRef, transform} = useDraggable({
            id: id,
        });
        const style = transform ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        } : undefined;


        return (
            <ArcherElement
                id={id}
                relations={!dragging ? [
                    {
                        targetId: NodeData?.targetId ?? "",
                        targetAnchor: NodeData?.targetAnchor ?? 'bottom',
                        sourceAnchor: NodeData?.sourceAnchor ?? 'bottom',
                    },
                ] : []}
            >
                <button ref={setNodeRef}
                        style={{position: 'absolute', ...styleProp, ...style}} {...listeners} {...attributes}
                        className={'w-10 h-10 bg-blue-500 rounded-full hover:w-11 hover:h-11 m-4'}>
                    {NodeData?.name}
                </button>
            </ArcherElement>
        );
    }
);

export default Draggable
