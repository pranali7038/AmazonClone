import React from 'react'

const Option = () => {
  return (
    <div className='add_remove_select'>
      <select>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
      </select>
      <p style={{cursor:"pointer"}}>Delete</p><span>|</span>
      <p className='forremovemedia'>Save Or Later</p><span>|</span>
      <p className='forremovemedia'>See More like this</p>
    </div>
  )
}

export default Option
