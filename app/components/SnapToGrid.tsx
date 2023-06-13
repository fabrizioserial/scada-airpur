'use client'
import React, {useMemo, useState} from "react";
import {createSnapModifier} from "@dnd-kit/modifiers";
import {DraggableStory} from "@/app/components/DraggableStory";

export const SnapToGrid = () => {
    const [gridSize, setGridSize] = useState(10);
    const style = {
        alignItems: 'flex-start',
    };
    const buttonStyle = {
        marginLeft: gridSize - 20 + 1,
        marginTop: gridSize - 20 + 1,
        width: 440,
        height: 660,
    };
    const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

    return (
        <div className={'relative'}>
            <p className={'absolute top-3 left-3 text-xs'}>TOP</p>
            <DraggableStory
                modifiers={[snapToGrid]}
                style={style}
                buttonStyle={buttonStyle}
                key={gridSize}
            />
            {/*<Grid size={gridSize} onSizeChange={setGridSize} />*/}
        </div>
    );
};
