import { useEffect, useState } from 'react'
import Character from './Character.tsx'
import { type CharacterClass } from './Character.tsx'
import Quest from './Quest.tsx'
import './App.css'

function App() {
  const [playerName, setPlayerName] = useState("Player")
  const [classType, setClassType] = useState<CharacterClass>("Barbarian")
  const [playerLevel, setPlayerLevel] = useState(1)
  const [playerTitle, setPlayerTitle] = useState<string | null>(null)
  const [startingHealth, setStartingHealth] = useState(100)
  const [currentHealth, setCurrentHealth] = useState(startingHealth)

  function reset() {
    setPlayerName("Player")
    setClassType("Barbarian")
    setPlayerLevel(1)
    setPlayerTitle(null)
    setCurrentHealth(startingHealth)
  }

  // This runs when currentHealth changes
  useEffect(() => {
    if (currentHealth == 0) {
      alert(`${playerName} has died`)
    }
  }, [currentHealth])

  return (
    <>
      <label>Player Name:</label>
      <input onChange={(event) => setPlayerName(event.target.value)} placeholder='Player Name'></input>
      <label>Class Type</label>
      <select onChange={(event) => setClassType(event.target.value as CharacterClass)}>
        <option value={"Barbarian"}>Barbarian</option>
        <option value={"Ranger"}>Ranger</option>
        <option value={"Wizard"}>Wizard</option>
        <option value={"Paladin"}>Paladin</option>
      </select>
      <label>Level:</label>
      <input datatype='number' onChange={(event) => setPlayerLevel(Number(event.target.value))} placeholder='Player Level'></input>
      <label>Title:</label>
      <input onChange={(event) => setPlayerTitle(event.target.value)} placeholder='Player Title'></input>
      <label>Starting Health:</label>
      <input datatype="number" onChange={(event) => { setStartingHealth(Number(event.target.value)); setCurrentHealth(Number(event.target.value)) }} placeholder='Starting Health'></input>
      <br />
      <br />
      <br />
      <Character
        name={playerName}
        class={classType}
        title={playerTitle}
        health={currentHealth}
        level={playerLevel} />
      <div>
        <button onClick={() => setCurrentHealth(Math.max((currentHealth - 10), 0))}>Take Damage</button>
        <button onClick={() => setCurrentHealth(currentHealth + 10)}>Heal</button>
        <button onClick={() => setPlayerLevel(playerLevel + 1)}>Gain a level</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
      <Quest
        name='Defeat the Cave Troll'
        difficulty='Hard'
        reward={500}
        completed={false} />
      <Quest
        name='Defeat the Dragon'
        difficulty='Hard'
        reward={1000}
        completed={false} />
      <Quest
        name='Explore the Tavern'
        difficulty='Easy'
        reward={50}
        completed={false} />
    </>
  )
}

export default App
