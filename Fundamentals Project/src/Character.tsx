
function Character(props: CharacterProps) {
    return (
        <div className='characterCard'>
            <h2>{props.name}</h2>
            {props.title != null && <h3 style={{marginTop: '0rem', marginBottom: '0rem'}}>{props.title}</h3>}
            <p>Class: {props.class}</p>
            <p>Level: {props.level}</p>
            <p>Health: {props.health}</p>
        </div>

    )
}

type CharacterClass = "Barbarian" | "Ranger" | "Wizard" | "Paladin"

type CharacterProps = {
    name: string;
    title?: string
    class: CharacterClass;
    level: number
    health: number
}

export default Character
export type {CharacterClass}