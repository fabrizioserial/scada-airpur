'use client'
import React, {useContext, useState} from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {SortableItem} from './SortableItem';
import {BoardContext} from "@/context/BoardContext";

export function SorteableList() {
    const context = useContext(BoardContext)
    const checkpoints = context.board['Top1']?.checkpoints

    const [items, setItems] = useState([1,2, 3, 4]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    console.log(checkpoints.find(node=>node.name === '1'))
    console.log(context.board['Top1'])

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}

            >
                <div className={'flex flex-col gap-3'}>
                    {items.map(id => <SortableItem key={id} id={id} data={checkpoints.find(node => node.name == id.toString())}/>)}
                </div>
            </SortableContext>
        </DndContext>
    );

    function handleDragEnd(event: any) {
        const {active, over} = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}
