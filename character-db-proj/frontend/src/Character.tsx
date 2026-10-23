function Character(props: CharacterProps){

    return (
        <>
            <h3>Name: {props.name}</h3>
            <p>Class: {props.class}</p>
            <p>Level: {props.level}</p>
            <p>Health: {props.health}</p>
            <p>Mana: {props.mana}</p>
        </>
    )
}

type CharacterProps = {
    name:string,
    class: string,
    level: number,
    health: number,
    mana: number
}

export default Character
export {type CharacterProps}