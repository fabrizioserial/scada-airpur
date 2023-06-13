import {createContext, ReactNode, useState} from "react";

interface BoardContextProps {
    board: { [BoardsIDs in string]: BoardType }
    updateCheckpointPosition: (props:{idBoard: BoardsIDs, idCheckpoint: string, position: {x: number, y: number}}) => void
    getCheckpointByID: ({idBoard,idCheckpoint}:{idBoard: string, idCheckpoint: string}) => CheckPointType
}

export const BoardContext = createContext<BoardContextProps>({
    board: {},
    updateCheckpointPosition: (() => {}),
    getCheckpointByID: (() => ({} as CheckPointType)),
})

export type BoardsIDs = 'Top1' | 'Right1' | 'Front1'

export type AnchorEnum = 'top' | 'bottom' | 'left' | 'right'

export type CheckPointType = {
    id: string
    name: string
    position: {
        x: number
        y: number
    },
    targetId?: string,
    targetAnchor?: AnchorEnum,
    sourceAnchor?: AnchorEnum,

}

export type BoardType = {
    id: BoardsIDs
    name: string
    checkpoints: CheckPointType[]
}

interface BoardProviderProps {
    children: ReactNode
}

export const BoardProvider = ({children}: BoardProviderProps) => {
    const [board, setBoard] = useState<{ [BoardsIDs in string]: BoardType }>({
        Top1: {
            id: 'Top1',
            name: 'Top',
            checkpoints: [
                {
                    id: 'draggable1',
                    name: '1',
                    position: {
                        x: 0,
                        y: 0
                    },
                    targetId: 'draggable2',
                    targetAnchor: 'top',
                    sourceAnchor: 'bottom',
                },
                {
                    id: 'draggable2',
                    name: '2',
                    position: {
                        x: 0,
                        y: 0
                    },
                    targetId: 'draggable3',
                    targetAnchor: 'top',
                    sourceAnchor: 'bottom',
                },
                {
                    id: 'draggable3',
                    name: '3',
                    position: {
                        x: 0,
                        y: 0
                    },
                    targetId: 'draggable4',
                    targetAnchor: 'top',
                    sourceAnchor: 'bottom',
                },
                {
                    id: 'draggable4',
                    name: '4',
                    position: {
                        x: 0,
                        y: 0
                    },
                    targetId: undefined,
                    targetAnchor: 'top',
                    sourceAnchor: 'bottom',
                }
            ]
        }
    })

    function updateCheckpointPosition({idBoard, idCheckpoint, position}:{ idBoard: BoardsIDs, idCheckpoint: string, position: { x: number, y: number } }) {
        // setBoard({
        //         ...board,
        //         [idBoard]: {
        //             ...board[idBoard],
        //             checkpoints: board[idBoard].checkpoints.map(checkpoint => {
        //                 if (checkpoint.id === idCheckpoint) {
        //                     return {
        //                         ...checkpoint,
        //                         position: {
        //                             x: position.x,
        //                             y: position.y
        //                         }
        //                     }
        //                 }
        //                 return checkpoint
        //             })
        //
        //         }
        //     }
        // )
        updateArrowPosition({idBoard,idCheckpoint,position})
    }

    function getCheckpointByID({idBoard,idCheckpoint}:{idBoard: string, idCheckpoint: string}):CheckPointType {
        return board[idBoard].checkpoints.find(checkpoint => checkpoint.id === idCheckpoint) as CheckPointType
    }

    function updateArrowPosition({idBoard,idCheckpoint,position}:{idBoard: string, idCheckpoint: string,position:{x:number,y:number}}){
        const updateTargetDirection = (position1: {x: number, y: number}, position2: {x: number, y: number}) => {
            if(!position2 || !position1) return 'top'
            if(position1.x === position2.x ) {
                if(position1.y > position2.y ) return 'bottom'
                else return 'top'
            }
            if (position1.x > position2.x ) {
                if(Math.abs(position1.x - position2.x) > Math.abs(position1.y - position2.y)) return 'right'
                if(position1.y > position2.y ) return 'bottom'
                else return 'top'
            }
            if (position1.x < position2.x) {
                if(Math.abs(position1.x - position2.x) < Math.abs(position1.y - position2.y)) return 'left'
                if(position1.y > position2.y ) return 'bottom'
                else return 'top'
            }
        }

        const updateSourceDirection = (position1: {x: number, y: number}, position2: {x: number, y: number}) => {
            if(!position2 || !position1) return 'top'

            if(position1.x === position2.x ) {
                if(position1.y > position2.y ) return 'top'
                else return 'bottom'
            }

            if (position1.x > position2.x ) {
                if(position1.x - position2.x > Math.abs(position1.y - position2.y)) return 'left'
                if(position1.y > position2.y ) return 'top'
                else return 'bottom'
            }
            if (position1.x < position2.x) {
                if(position1.x - position2.x < Math.abs(position1.y - position2.y)) return 'right'
                if(position1.y > position2.y ) return 'bottom'
                else return 'top'
            }
        }
        const checkpoints = board[idBoard].checkpoints
        const currentCheckpoint = getCheckpointByID({idBoard,idCheckpoint})
        const sourceCheckpoint = checkpoints.find(checkpoint => checkpoint.targetId === idCheckpoint) as CheckPointType
        const targetCheckpoint = checkpoints.find(checkpoint => checkpoint.id === currentCheckpoint.targetId ) as CheckPointType

        const updatedArrowPositionCurrent:CheckPointType = {
            ...currentCheckpoint,
            position: {
                x: position.x,
                y: position.y
            },
            sourceAnchor: updateSourceDirection(currentCheckpoint.position, targetCheckpoint?.position),
            targetAnchor: updateTargetDirection(currentCheckpoint?.position, targetCheckpoint?.position),

        }

        setBoard(
            {
                ...board,
               [idBoard]: {
                    ...board[idBoard],
                   checkpoints: board[idBoard].checkpoints.map(checkpoint => {
                          if (checkpoint.id === idCheckpoint) {
                            return updatedArrowPositionCurrent
                          }
                          return checkpoint
                   })
               }
            }
        )

    }

    return (
        <BoardContext.Provider value={{updateCheckpointPosition, board,getCheckpointByID}}>
            {children}
        </BoardContext.Provider>
    )
}
