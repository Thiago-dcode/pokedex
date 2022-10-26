import React from 'react'
import './btn.css'

const Btn = ({className, btnType, handle,content, arg,style }) => {
  return (
    <div  className= {className}>

        <button style={style} type={btnType} onClick ={(e)=>{handle(arg?arg:e.currentTarget)}}>{content}</button>
    </div>
  )
}

export default Btn