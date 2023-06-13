import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props:any) {
    console.log(props)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div  style={{...style,cursor:'default'}} ref={setNodeRef} {...attributes} className={'flex flex-row items-center justify-between px-4 py-2 rounded-xl border-2 border-gray-200'}>
            <div>
                {props.data?.name}
            </div>
            {/*// @ts-ignore*/}
            <button  cursor="grab" className={'p-2 bg-blue-50 rounded-md'}  {...listeners}>
                <svg viewBox="0 0 20 20" width="12">
                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                </svg>
            </button>
        </div>

    );
}
