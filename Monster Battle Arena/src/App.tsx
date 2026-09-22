
import { useState } from 'react'
import './App.css'
import Monster from './Monster'
import { type MonsterType } from './Monster'
import BattleStatus from './BattleStatus'
import AttackButton from './AttackButton'

function App() {
  const [playerName, setPlayerName] = useState("")
  const [playerHealth, setPlayerHealth] = useState(100)
  const monster: { name: string; type: MonsterType; startingHealth: number; attackDMG: number } = {
    name: "Troll",
    type: "Beast",
    startingHealth: 100,
    attackDMG: 10,
  }
  const [monsterHealth, setMonsterHealth] = useState(monster.startingHealth)

  return (
    <>
      <label>Player Name:</label>
      <input placeholder='Player Name' onChange={(event) => setPlayerName(event.target.value)}></input>
      <h3>{playerName != "" ? `${playerName}` : "Player"} vs {monster.name}</h3>
      <p>Player Health: {playerHealth}</p>
      <Monster
        name={monster.name}
        type={monster.type}
        startingHealth={monsterHealth}
        attackDMG={monster.attackDMG} />
      <AttackButton onClick={() => setMonsterHealth(health => health - 10)} label="Normal Attack"></AttackButton>
      <AttackButton onClick={() => setMonsterHealth(health => health - 20)} label="Heavy Attack"></AttackButton>
      <AttackButton onClick={() => setMonsterHealth(health => health - 30)} label="Ultimate Attack"></AttackButton>
      <br></br>
      <br></br>
      <p>{monsterHealth <= 0 ? "The monster has been defeated!" : "The monster is still fighting!"}</p>
      <button onClick={() => setPlayerHealth(ph => ph - monster.attackDMG)}>Monster Attack</button>
      <p>{playerHealth <= 0 ? `${playerName != "" ? playerName : "Player"} has been defeated!` : ""}</p>
      <button onClick={() => setPlayerHealth(ph => ph + 20 > 100 ? 100 : ph + 20)}>Drink Potion</button>
      <br></br>
      <h2>BATTLE STATUS</h2>
      <BattleStatus playerName={playerName != "" ? playerName : "Player"} playerHealth={playerHealth} monsterName={monster.name} monsterHealth={monsterHealth}></BattleStatus>

    </>
  )
}

export default App
