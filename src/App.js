import React, { useState } from 'react'
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './home/Home.js'
import Home from './home/Home.js'
import Pokemon from './pokemon/Pokemon.js'

function App() {

  const [poke, setpoke] = useState('')
  const [type, setType] = useState('')

  const getPoke = (poke) =>{


    setpoke(poke)
   

  }

  const getType = arrType =>{
    if(arrType)setType(arrType)
    
  }



  return (
    
    <Router basename={process.env.PUBLIC_URL}>
      <div className='.App'>
      <Routes>
        <Route path='/' element= {<Home
        getPoke={getPoke}
        getType ={type}/>}/>
        {poke && <Route path='pokemon/:id' element= {<Pokemon
        pokemon={poke}
        getType = {getType}
        getPoke ={getPoke}
        />}/>}
      </Routes>
          </div>
      </Router>
  )
}

export default App