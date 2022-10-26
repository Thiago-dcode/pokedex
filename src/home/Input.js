import React from 'react'

const Input = ({inputType,placeholder,id, label, labelTxt,className, handleInput,handleKeyPress}) => {
  return (
    <div className={className}>
        {label &&<label htmlFor={id}>{labelTxt}</label>}
        <input onKeyDown={(e) => handleKeyPress(e)} type={inputType} onChange={(e) =>{
            handleInput(e.target.value)

        }} placeholder = {placeholder} id = {id} />
    </div>
  )
}

export default Input