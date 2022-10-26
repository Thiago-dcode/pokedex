import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils'
import React from 'react'
import Btn from './Btn'

const LoadSection = ({charge,handleLoad,length}) => {

  return (
    
    <div className="load-btn">
        {length >= charge && (
          < Btn
            className="btn-load-more"
            content="Load more"
            btnType="button"
            handle={handleLoad}
            arg="more"
          />
        )}
        {charge > 6 && (
          <Btn
            className="btn-load-less"
            content="Load less"
            btnType="button"
            handle={handleLoad}
            arg="less"
          />
        )}
      </div>
  )
}

export default LoadSection