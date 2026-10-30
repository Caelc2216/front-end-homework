import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { type PokemonData } from './PokemonData'
import PokemonCard from './PokemonCard'

function Tanstack({ id, setID: f }: { id: number, setID: Function} ) {
    const pokemonQuery = useQuery({ queryKey: ['Pokemon', id], queryFn: ts_getPokemonData, staleTime: 30000 })
    const [ts_pokemonHealth, setTs_PokemonHealth] = useState(100)

    async function ts_getPokemonData(): Promise<PokemonData> {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

        if (!response.ok) {
            alert("Something went wrong")
            throw new Error("Something went wrong")
        }

        const data = await response.json()

        const newPokemon: PokemonData = {
            name: data.name,
            image: data.sprites.front_default,
            height: data.height,
            weight: data.weight,
            base_experience: data.base_experience
        }

        return newPokemon
    }

    useEffect(() => {
        if (ts_pokemonHealth <= 0) {
            if (pokemonQuery != undefined && pokemonQuery.data != undefined) {
                alert(`${pokemonQuery?.data.name} has fainted!`)
            }
            setTs_PokemonHealth(100)
            f(Math.floor(Math.random() * 1000) + 1)
        }
    }, [ts_pokemonHealth])

    return (
        <>
            <p>Using TanStack</p>
            {pokemonQuery.isError && <p>Something went wrong</p>}
            {pokemonQuery.isSuccess &&
                <PokemonCard
                    name={pokemonQuery.data.name}
                    image={pokemonQuery.data.image}
                    health={ts_pokemonHealth}
                    height={pokemonQuery.data.height}
                    weight={pokemonQuery.data.weight}
                    base_experience={pokemonQuery.data.base_experience}
                />
            }
            {pokemonQuery.isPending && <p>Loading...</p>}
            <button onClick={() => f(Math.floor(Math.random() * 1000) + 1)}>Get Random Pokemon</button>
            <button onClick={() => setTs_PokemonHealth(prev => prev - 10)}>Decrease Health</button>
        </>
    )
}

export default Tanstack
