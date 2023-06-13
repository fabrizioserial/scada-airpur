'use client'
import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import Draggable from "@/app/components/Draggable";
import Droppable from "@/app/components/Droppable";

export default function TestDND() {
    const [isDropped, setIsDropped] = useState(false);
    const draggableMarkup = (
        <Draggable dragging={false}/>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {!isDropped ? draggableMarkup : null}
            <Droppable>
                {isDropped ? draggableMarkup : 'Drop here'}
            </Droppable>
        </DndContext>
    );

    function handleDragEnd(event:any) {
        if (event.over && event.over.id === 'droppable') {
            setIsDropped(true);
        }
    }
}
