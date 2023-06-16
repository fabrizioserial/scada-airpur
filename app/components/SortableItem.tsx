import React, {useContext} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {BoardContext} from "@/context/BoardContext";

export function SortableItem(props:any) {
    console.log(props)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const context = useContext(BoardContext)

    console.log(context.getCheckpointByID({idBoard:'Top1', idCheckpoint:props.data.id.toString()}))
    const position = context.getCheckpointByID({idBoard:'Top1', idCheckpoint:props.data.id.toString()})?.position ?? {x:1,y:1,z:1}

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div  style={{...style,cursor:'default'}} ref={setNodeRef} {...attributes} className={'flex flex-row items-center justify-between px-2 py-2 rounded-xl border-2 border-gray-200'}>
           <div className={'flex flex-row'}>
               <div className={'w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-[#5188DC] text-white'}>
                   {props.data?.name}
               </div>
               <div className={'flex flex-row px-2 gap-4'}>
                   <input placeholder={'X'} value={position.x} className={'w-[64px] px-4 py-2 h-[40px] rounded-lg border-2 border-gray-200'}/>
                   <input placeholder={'Y'} value={position.y} className={'w-[64px] px-4 py-2 h-[40px] rounded-lg border-2 border-gray-200'}/>
                   <input placeholder={'Z'} value={position.z} className={'w-[64px] px-4 py-2 h-[40px] rounded-lg border-2 border-gray-200'}/>
               </div>
           </div>

            {/*// @ts-ignore*/}
            <button  cursor="grab" className={'p-2 rounded-md w-[36px] h-[40px]'}  {...listeners}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99902 1.99999C6.73631 2.00006 6.47619 2.05187 6.2335 2.15246C5.99082 2.25306 5.77032 2.40047 5.5846 2.58628C5.39889 2.77209 5.25159 2.99266 5.15111 3.2354C5.05064 3.47813 4.99896 3.73828 4.99902 4.00099C4.99909 4.2637 5.0509 4.52383 5.15149 4.76651C5.25209 5.0092 5.3995 5.2297 5.58531 5.41541C5.77112 5.60113 5.99169 5.74843 6.23443 5.84891C6.47716 5.94938 6.73731 6.00106 7.00002 6.00099C7.53059 6.00086 8.03937 5.78997 8.41444 5.41471C8.78952 5.03945 9.00016 4.53056 9.00002 3.99999C8.99989 3.46943 8.789 2.96065 8.41374 2.58557C8.03848 2.2105 7.52959 1.99986 6.99902 1.99999ZM6.99902 7.99999C6.73631 8.00006 6.47619 8.05187 6.2335 8.15246C5.99082 8.25306 5.77032 8.40047 5.5846 8.58628C5.39889 8.77209 5.25159 8.99266 5.15111 9.2354C5.05064 9.47813 4.99896 9.73828 4.99902 10.001C4.99909 10.2637 5.0509 10.5238 5.15149 10.7665C5.25209 11.0092 5.3995 11.2297 5.58531 11.4154C5.77112 11.6011 5.99169 11.7484 6.23443 11.8489C6.47716 11.9494 6.73731 12.0011 7.00002 12.001C7.53059 12.0009 8.03937 11.79 8.41444 11.4147C8.78952 11.0394 9.00016 10.5306 9.00002 9.99999C8.99989 9.46943 8.789 8.96064 8.41374 8.58557C8.03848 8.2105 7.52959 7.99986 6.99902 7.99999ZM6.99902 14C6.46846 14.0001 5.95968 14.211 5.5846 14.5863C5.20953 14.9615 4.99889 15.4704 4.99902 16.001C4.99916 16.5316 5.21005 17.0403 5.58531 17.4154C5.96057 17.7905 6.46946 18.0011 7.00002 18.001C7.53059 18.0009 8.03937 17.79 8.41444 17.4147C8.78952 17.0394 9.00016 16.5306 9.00002 16C8.99989 15.4694 8.789 14.9606 8.41374 14.5856C8.03848 14.2105 7.52959 13.9999 6.99902 14ZM12.999 5.99999C13.2617 5.99993 13.5219 5.94812 13.7645 5.84752C14.0072 5.74693 14.2277 5.59952 14.4134 5.41371C14.5992 5.2279 14.7465 5.00733 14.8469 4.76459C14.9474 4.52185 14.9991 4.2617 14.999 3.99899C14.999 3.73628 14.9471 3.47616 14.8466 3.23347C14.746 2.99079 14.5985 2.77029 14.4127 2.58457C14.2269 2.39886 14.0064 2.25155 13.7636 2.15108C13.5209 2.05061 13.2607 1.99893 12.998 1.99899C12.4675 1.99913 11.9587 2.21002 11.5836 2.58528C11.2085 2.96054 10.9979 3.46943 10.998 3.99999C10.9982 4.53056 11.209 5.03934 11.5843 5.41441C11.9596 5.78949 12.4685 6.00013 12.999 5.99999ZM12.999 7.99999C12.7363 8.00006 12.4762 8.05187 12.2335 8.15246C11.9908 8.25306 11.7703 8.40047 11.5846 8.58628C11.3989 8.77209 11.2516 8.99266 11.1511 9.2354C11.0506 9.47813 10.999 9.73828 10.999 10.001C10.9991 10.2637 11.0509 10.5238 11.1515 10.7665C11.2521 11.0092 11.3995 11.2297 11.5853 11.4154C11.7711 11.6011 11.9917 11.7484 12.2344 11.8489C12.4772 11.9494 12.7373 12.0011 13 12.001C13.5306 12.0009 14.0394 11.79 14.4144 11.4147C14.7895 11.0394 15.0002 10.5306 15 9.99999C14.9999 9.46943 14.789 8.96064 14.4137 8.58557C14.0385 8.2105 13.5296 7.99986 12.999 7.99999ZM12.999 14C12.4685 14.0001 11.9597 14.211 11.5846 14.5863C11.3989 14.7721 11.2516 14.9927 11.1511 15.2354C11.0506 15.4781 10.999 15.7383 10.999 16.001C10.9991 16.2637 11.0509 16.5238 11.1515 16.7665C11.2521 17.0092 11.3995 17.2297 11.5853 17.4154C11.9606 17.7905 12.4695 18.0011 13 18.001C13.5306 18.0009 14.0394 17.79 14.4144 17.4147C14.7895 17.0394 15.0002 16.5306 15 16C14.9999 15.4694 14.789 14.9606 14.4137 14.5856C14.0385 14.2105 13.5296 13.9999 12.999 14Z" fill="#E4E4E4"/>
                </svg>
            </button>
        </div>

    );
}
