'use client'

import React, {ReactNode} from 'react';
import {useDroppable} from '@dnd-kit/core';
import exp from "constants";

interface DroppableProps {
    children: ReactNode
}

export default function Droppable({children}:DroppableProps) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };


    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}
