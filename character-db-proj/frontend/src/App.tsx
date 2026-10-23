import { useEffect, useState } from 'react'
import API_URL from './charcterAPI'
import './App.css'
import Character from './Character'
import { type CharacterProps } from './Character'

type CharacterData = CharacterProps & { id: string }

function App() {
  const [characters, setCharacters] = useState<CharacterData[] | null>(null)
  const [characterName, setCharacterName] = useState("Character")
  const [characterClass, setCharacterClass] = useState("Warrior")
  const [characterHealth, setCharacterHealth] = useState(100)
  const [characterLevel, setCharacterLevel] = useState(1)
  const [characterMana, setCharacterMana] = useState(1)
  useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`${API_URL}/api/Characters`)
      const data: CharacterData[] = await response.json()
      setCharacters(data)
    }
    getCharacters()
  }, [])

  async function addCharacter() {
    const newCharacter: CharacterProps = { name: characterName, class: characterClass, health: characterHealth, level: characterLevel, mana: characterMana }
    const response = await fetch(`${API_URL}/api/Characters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCharacter)
    })

    const body = await response.json()
    if (!response.ok) { 
      alert(`Creation failed: ${body.error}`)
      throw new Error(`Creation Failed: ${body.error}`)
    }
    
    const created: CharacterData = body
    setCharacters(prev => [...(prev ?? []), created])
  }

  return (
    <>
      <h2>Add a Character</h2>
      <div>
        <div>
          <label className='i_label'>Character Name:</label>
          <input onChange={(event) => setCharacterName(event.target.value)} placeholder={characterName}/>
        </div>
        <div>
          <label className='i_label'>Class:</label>
          <select onChange={(event) => setCharacterClass(event.target.value)} value={characterClass}>
            <option value="Warrior">Warrior</option>
            <option value="Mage">Mage</option>
            <option value="Rogue">Rogue</option>
            <option value="Archer">Archer</option>
          </select>
        </div>
        <div>
          <label className='i_label'>Level:</label>
          <input onChange={(event) => setCharacterLevel(event.target.valueAsNumber)} type="number" placeholder="1" />
        </div>
        <div>
          <label className='i_label'>Health:</label>
          <input onChange={(event) => setCharacterHealth(event.target.valueAsNumber)} type="number" placeholder="100" />
        </div>
        <div>
          <label className='i_label'>Mana:</label>
          <input onChange={(event) => setCharacterMana(event.target.valueAsNumber)} type="number" placeholder="1" />
        </div>
        <button onClick={() => addCharacter() }>Add Character</button>
      </div>
      <h2>Characters</h2>
      {characters && [...characters].reverse().map((c) =>
      (
        <Character key={c.id} name={c.name} class={c.class} health={c.health} level={c.level} mana={c.mana} />
      ))}
    </>
  )
}

export default App
