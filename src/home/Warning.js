import React from 'react'

const Warning = ({message}) => {
  return (
    <div className='warning'>
        {message.toLowerCase() === 'loading'&& <p className='loading'>{message}</p>}
        {message.toLowerCase() !== 'loading'&& <p className='no-loading'>{message}</p>}
        
    </div>
  )
}

export default Warning                                                  