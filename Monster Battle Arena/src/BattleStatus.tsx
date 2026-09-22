

function BattleStatus(props: BattleStatusProps) {
    return (
        <>
            <p>{props.playerName}: {props.playerHealth}HP</p>
            <p>{props.monsterName}: {props.monsterHealth}HP</p>
        </>
    )
}

type BattleStatusProps = {
    playerName: string, 
    playerHealth: number, 
    monsterName: string, 
    monsterHealth: number
}

export default BattleStatus