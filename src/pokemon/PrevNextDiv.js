import React from 'react'
import { useEffect } from 'react'
import { Link } from "react-router-dom";

import Btn from '../home/Btn'
import GetBackground from '../home/GetBackground'

const PrevNextDiv = ({poke,className, arrow}) => {
    useEffect(()=>{

    console.log(poke)
    },[poke])

  
  return (
    <div className={className}>
      
      
 <h3>{poke.name}</h3>
 <div>
  
 </div>

    </div>
  )
}

export default PrevNextDiv