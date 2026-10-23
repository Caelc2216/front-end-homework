import { useEffect, useState } from 'react'
import API_URL from './charcterAPI'
import './App.css'
import Character from './Character'
import { type CharacterProps } from './Character'



function App() {
  const [characters, setCharacters] = useState<CharacterProps | null>(null)
  
  useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`${API_URL}/api/Characters`)
      const data: CharacterData[] = await response.json()
      // setCharacters(data)
    }
    getCharacters()
  }, [])

  return (
    <>
      
    </>
  )
}

export default App
