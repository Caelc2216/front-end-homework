import { useState, useEffect } from 'react'
import Character from './Character.tsx'
import { type CharacterClass } from './Character.tsx'
import Quest from './Quest.tsx'
import './App.css'
import InventoryItem from './InventoryItem.tsx'
import { type InventoryItemProps } from './InventoryItem.tsx'

function App() {
  const [playerName, setPlayerName] = useState("Player")
  const [classType, setClassType] = useState<CharacterClass>("Barbarian")
  const [playerLevel, setPlayerLevel] = useState(1)
  const [playerTitle, setPlayerTitle] = useState<string | null>(null)
  const [startingHealth, setStartingHealth] = useState(100)
  const [currentHealth, setCurrentHealth] = useState(startingHealth)
  const [inventory, setInventory] = useState<InventoryItemProps[]>([])
  const [inventoryItemName, setInventoryItemName] = useState("")
  const [inventoryItemValue, setInventoryItemValue] = useState(0)
  const [inventoryItemDescription, setInventoryItemDescription] = useState("")

  function reset() {
    setPlayerName("Player")
    setClassType("Barbarian")
    setPlayerLevel(1)
    setPlayerTitle(null)
    setCurrentHealth(startingHealth)
  }

  function addToInventory(name: string, value: number, description: string) {

    setInventory(() => [
      ...inventory,
      {
        name: name,
        value: value,
        description: description
      }
    ])
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
      <input type='number' onChange={(event) => setPlayerLevel(Number(event.target.value))} placeholder='Player Level'></input>
      <label>Title:</label>
      <input onChange={(event) => setPlayerTitle(event.target.value)} placeholder='Player Title'></input>
      <label>Starting Health:</label>
      <input type="number" onChange={(event) => { setStartingHealth(Number(event.target.value)); setCurrentHealth(Number(event.target.value)) }} placeholder='Starting Health'></input>
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
      <br />
      <br />
      <br />
      <input onChange={(event) => setInventoryItemName(event.target.value)} placeholder='Item Name'></input>
      <input type='number' onChange={(event) => setInventoryItemValue(Number(event.target.value))} placeholder='Item Value'></input>
      <input onChange={(event) => setInventoryItemDescription(event.target.value)} placeholder='Item Description'></input>
      <button onClick={() => addToInventory(inventoryItemName, inventoryItemValue, inventoryItemDescription)}>Add To Inventory</button>
      {inventory.map((item) => (
        <InventoryItem
          name={item.name}
          value={item.value}
          description={item.description}
        />
      ))}
    </>
  )
}

export default App
