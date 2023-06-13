'use client'

import React from 'react'
import {BoardProvider} from "@/context/BoardContext";

export const Wrapper = ({children}: { children:React.ReactNode }) => {
    return(
        <BoardProvider>
            <>
                {children}
            </>
        </BoardProvider>
        )
}
