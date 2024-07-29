import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface TimerContextType {
    duration :number;
    setDuration : Dispatch<SetStateAction<number>>
    time:boolean;
    setTime:Dispatch<SetStateAction<boolean>>
}

export const TimeContext = createContext<TimerContextType>({
    duration:10,
    setDuration : ()=>{},
    time:true,
    setTime:()=>{},
})

interface TimerProviderProps {
    children:ReactNode;
}

const TimerProvider = ({children}:TimerProviderProps) => {
    const [duration,setDuration ] = useState(10);
     const [time,setTime] = useState<boolean>(true)
    return (
        <TimeContext.Provider value={{duration,setDuration,time,setTime}}>
            {children}
        </TimeContext.Provider>
    )
}

export default TimerProvider