function PokemonCard(props: PokemonCardProps) {
    return (
        <>
            <div className="pokemon-card">
                <h2>{props.name}</h2>
                <img src={props.image} alt={props.name} />
                <p>health: {props.health}</p>
                <p>Height: {props.height}</p>
                <p>Weight: {props.weight}</p>
                <p>Base Experience: {props.base_experience}</p>
            </div>
        </>
    )
}

type PokemonCardProps = {
    name: string;
    image: string;
    health: number;
    height: number;
    weight: number;
    base_experience: number;
}

export default PokemonCard

