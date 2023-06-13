'use client'

import {ArcherContainer} from "react-archer";
import {SnapToGrid} from "@/app/components/SnapToGrid";

export default function ContainerTop() {
    return(
        <ArcherContainer strokeColor="#4C4C4C">

            <div className={"w-[440px] h-[660px] bg-[#E9E9E9] rounded-xl "}>
                <div className={"w-[370px] h-[590px] z-0 absolute top-0 left-0 bg-[url('../public/pattern_dot.png')] m-[35px]"}></div>

                <SnapToGrid/>

            </div>
        </ArcherContainer>
    )
}
