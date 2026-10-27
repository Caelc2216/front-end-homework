import { useEffect, useState } from 'react'
import API_URL from './charcterAPI'
import './App.css'
import Character from './Character'
import { type CharacterProps } from './Character'
import { type CharacterData } from './Character'


function App() {
  const [characters, setCharacters] = useState<CharacterData[] | null>(null)
  const [characterName, setCharacterName] = useState("Character")
  const [characterClass, setCharacterClass] = useState("Warrior")
  const [characterHealth, setCharacterHealth] = useState(100)
  const [characterLevel, setCharacterLevel] = useState(1)
  const [characterMana, setCharacterMana] = useState(1)
  const [editingID, setEditingID] = useState("")
  const validClasses: string[] = ["Warrior", "Mage", "Rogue", "Archer"]

  useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`${API_URL}/api/Characters`)
      if (!response.ok) {
        const body = await response.json()
        alert(`failed to get characters: ${getErrorMessage(body)}`)
      }
      else {
        const data: CharacterData[] = await response.json()
        setCharacters(data)
      }
    }
    getCharacters()
  }, [])

function getErrorMessage(body: any): string {
  if (body?.error) return body.error
  if (body?.errors) return Object.values(body.errors).flat().join(" ")
  return body?.title ?? "Unknown error"
}

  async function addCharacter() {
    const newCharacter: CharacterProps = { name: characterName, class: characterClass, health: characterHealth, level: characterLevel, mana: characterMana }
    const response = await fetch(`${API_URL}/api/Characters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCharacter)
    })

    const body = await response.json()
    if (!response.ok) {
      alert(`Creation failed: ${getErrorMessage(body)}`)
      throw new Error(`Creation Failed: ${getErrorMessage(body)}`)
    }

    const created: CharacterData = body
    setCharacters(prev => [...(prev ?? []), created])
  }

  async function updateCharacter(c_id: string, updatedCharacter: CharacterProps) {
    const response = await fetch(`${API_URL}/api/Characters/${c_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updatedCharacter, id: c_id })
    })

    if (!response.ok) {
      const body = await response.json()
      alert(`update failed: ${getErrorMessage(body)}`)
      throw new Error(`update failed: ${getErrorMessage(body)}`)
    }
    else {
      setCharacters(prev =>
        prev?.map((c) => (c.id === c_id ? { ...c, ...updatedCharacter } : c)) ?? null
      )
      setEditingID("")
    }
  }

  function EditCharacter({ character }: { character: CharacterData }) {
    const [updatedName, setUpdatedName] = useState(character.name)
    const [classSelection, setClassSelection] = useState(character.class)
    const [updatedLevel, setUpdatedLevel] = useState(character.level)
    const [updatedHealth, setUpdatedHealth] = useState(character.health)
    const [updatedMana, setUpdatedMana] = useState(character.mana)
    const newCharacter: CharacterProps = {
      name: updatedName,
      class: classSelection,
      health: updatedHealth,
      level: updatedLevel,
      mana: updatedMana

    }

    return (
      <>
        <br></br>
        <br></br>

        <div>
          <label className='i_label'>Name:</label>
          <input onChange={(event) => setUpdatedName(event?.target.value)} defaultValue={character.name} />
        </div>
        <div>
          <label className='i_label'>Class:</label>
          <select onChange={(event) => setClassSelection(event.target.value)} value={classSelection}>
            <option value="Warrior">Warrior</option>
            <option value="Mage">Mage</option>
            <option value="Rogue">Rogue</option>
            <option value="Archer">Archer</option>
            {!validClasses.includes(classSelection) && <option value={classSelection}>{classSelection}</option>}
          </select>
        </div>
        <div>
          <label className='i_label'>Level:</label>
          <input onChange={(event) => setUpdatedLevel(event?.target.valueAsNumber)} defaultValue={character.level} type='number' />
        </div>
        <div>
          <label className='i_label'>Health:</label>
          <input onChange={(event) => setUpdatedHealth(event?.target.valueAsNumber)} defaultValue={character.health} type='number' />
        </div>
        <div>
          <label className='i_label'>Mana:</label>
          <input onChange={(event) => setUpdatedMana(event?.target.valueAsNumber)} defaultValue={character.mana} type='number' />
        </div>
        <div>
          <button style={{ margin: "1rem", backgroundColor: "red" }} onClick={() => setEditingID("")}>Cancel</button>
          <button style={{ margin: "1rem" }} onClick={() => updateCharacter(character.id, newCharacter)}>Update</button>
        </div>
        <br></br>
        <br></br>
      </>
    )
  }

  async function deleteCharacter(c_id: string) {
    const response = await fetch(`${API_URL}/api/Characters/${c_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })

    if (!response.ok) {
      const body = await response.json()
      alert(`deletion failed: ${getErrorMessage(body)}`)
      throw new Error(`deletion failed: ${getErrorMessage(body)}`)
    }
    else {
      setCharacters((prev) => prev?.filter(c => c.id != c_id) ?? null)
    }
  }

  return (
    <>
      <h2>Add a Character</h2>
      <form onSubmit={(event) => { event.preventDefault(); addCharacter() }}>
        <div>
          <label className='i_label'>Character Name:</label>
          <input onChange={(event) => setCharacterName(event.target.value)} placeholder={characterName} required />
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
        <button type="submit">Add Character</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <h2>Characters</h2>
      {characters == null && <p>Loading...</p>}
      {characters && [...characters].reverse().map((c) =>
      (
        <>
          <Character key={c.id} name={c.name} class={c.class} health={c.health} level={c.level} mana={c.mana} />
          <div>
            <button style={{ margin: "1rem" }} onClick={() => setEditingID(c.id)}>Edit Character</button>
            <button style={{ margin: "1rem", backgroundColor: "red" }} onClick={() => deleteCharacter(c.id)}>Delete</button>
          </div>
          {editingID == c.id && <EditCharacter character={c}></EditCharacter>}
        </>
      ))}
    </>
  )
}

export default App
