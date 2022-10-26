import React from 'react'

const ImgDiv = ({url, alt, className}) => {
  return (
    <div className={`${className} img`}>
    <img
      src={url}
      alt= {alt}
    />
  </div>
  )
}

export default ImgDiv