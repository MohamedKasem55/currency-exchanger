import React from 'react'
import "./selectButton.css"
function SelectButton({initialValue,name,options,required}) {
  
  return (
    <div>
        <select className='col-lg-12 select-btn' name={name} required={required}>
            {options.map(option=>(
              <option className='option' key={option} value={option} selected={initialValue===option} >  {option} </option>
            ))}
        </select>
    </div>
  )
}

export default SelectButton