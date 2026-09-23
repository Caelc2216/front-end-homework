import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Character from './Character.tsx'
import { type CharacterClass } from './Character.tsx'
import './App.css'

function App() {
const [playerName, setPlayerName] = useState("Player")
const [classType, setClassType] = useState<CharacterClass>("Barbarian")
const [playerLevel, setPlayerLevel] = useState(1)
const [playerTitle, setPlayerTitle] = useState("")
const [startingHealth, setStartingHealth] = useState(100)
const [currentHealth, setCurrentHealth] = useState(startingHealth)


  return (
    <>
      <label>Player Name:</label>
      <input onChange={(event) => setPlayerName(event.target.value)} placeholder='Player Name'></input>
      <label>Class Type</label>
      <select onChange={(event) => setClassType(event.target.value)}>
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
      <input datatype="number" onChange={(event) => setStartingHealth(Number(event.target.value))} placeholder='Starting Health'></input>
      <br/>
      <br/>
      <br/>
      <Character 
        name={playerName} 
        class={classType}
        title={playerTitle}
        health={currentHealth}
        level={playerLevel} />
    </>
  )
}

export default App
