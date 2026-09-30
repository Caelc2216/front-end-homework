import { useState } from "react"

function Quest(props: QuestProps) {
    const [questComplete, setQuestComplete] = useState(props.completed)
    return (
        <>
            <h3 style={{marginBottom: '0rem'}}>Quest: {props.name}</h3>
            <p>Difficulty: {props.difficulty}</p>
            <p>Reward: {props.reward} Gold</p>
            <p>Completed: {questComplete ? "Yes" : "No"}</p>
            {questComplete ? null : <button onClick={() => setQuestComplete(true)}>Mark Complete</button>}
        </>

    )
}


type QuestProps = {
    name: string
    difficulty: Difficulty
    reward: number
    completed: boolean
}

type Difficulty = "Easy" | "Medium" | "Hard"


export default Quest