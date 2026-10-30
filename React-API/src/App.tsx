import { useEffect, useState } from 'react'
import { type PokemonData } from './PokemonData'
import PokemonCard from './PokemonCard'
import Tanstack from './TanStack'
import './App.css'

function App() {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null)
  const [pokemonHealth, setPokemonHealth] = useState(100)
  const [usingTanStack, setUsingTanStack] = useState(false)
   const [pokemonID, setPokemonID] = useState(Math.floor(Math.random() * 1000) + 1)





  async function getPokemonData() {
    let pokemonNumber: number = Math.floor(Math.random() * 1000) + 1
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
    const data = await response.json();

    const newPokemonData: PokemonData = {
      name: data.name,
      image: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
      base_experience: data.base_experience
    }
    setPokemonData(newPokemonData)
  }

  useEffect(() => {
    getPokemonData()
  }, [])

  useEffect(() => {
    if (pokemonHealth <= 0) {
      alert(`${pokemonData?.name} has fainted!`)
      setPokemonHealth(100)

      getPokemonData()

    }
  }, [pokemonHealth])

  return (
    <>
      <div style={{display: 'flex'}}>
        <h3 style={{margin: '1rem', color: !usingTanStack ? 'blue' : 'grey', cursor: 'pointer'}} onClick={ () => setUsingTanStack(false)}>Regular Fetch</h3>
        <h3 style={{margin: '1rem', color: usingTanStack ? 'blue' : 'grey', cursor: 'pointer'}} onClick={ () => setUsingTanStack(true)}>TanStack Query</h3>
      </div>
      {usingTanStack && <Tanstack id={pokemonID} setID={setPokemonID}/>}




        {!usingTanStack &&
        <>
          {!pokemonData && <p>Loading...</p>}
          <PokemonCard
          name={pokemonData?.name || ''}
          image={pokemonData?.image || ''}
          health={pokemonHealth}
          height={pokemonData?.height || 0}
          weight={pokemonData?.weight || 0}
          base_experience={pokemonData?.base_experience || 0}
          />
          <button onClick={(getPokemonData)}>Get Random Pokemon</button>
          <button onClick={() => setPokemonHealth(prev => prev - 10)}>Decrease Health</button>
        </>
        }
    </>
  )
}

export default App
