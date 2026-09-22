import Character from './Character'
import './App.css'

function App() {


  return (
    <>
      <h1>Adventurer Roster</h1>
      <br></br>
      <div style={{justifyContent: 'center', display: 'flex', gap: '1rem'}}>

        <Character name='Sayor' level={1} health={120} class='Paladin'></Character>

        <Character
          name='Tyrone'
          title='Tyronie the homie'
          level={1}
          health={60}
          class='Ranger'>

        </Character>

        <Character
          name='Jack'
          level={2}
          health={100}
          class = 'Barbarian'>

          </Character>

          <Character
          name='Thorin'
          title='Thorin the terrible'
          class='Paladin'
          level={10}
          health={145}>

          </Character>
      </div>
    </>
  )
}

export default App
