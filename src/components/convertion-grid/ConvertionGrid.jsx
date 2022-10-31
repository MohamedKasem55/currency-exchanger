import React ,{useEffect,useContext}from 'react'
import { convertionGrid } from '../../services/currency.service'
import { Temp } from '../../staticData'
import convertionContex from '../context/convertionContex'
import './convertionGrid.css'
function ConvertionGrid() {
    const ctx = useContext(convertionContex)
    const temp = Temp
  return (
    <div className="mx-md-5 mt-3">
    <div className='row row-cols-sm-3 row-cols-1 ' >
        { ctx.convertionGrid.length !=0 &&
            ctx.convertionGrid.map(convertion=>(
                <div className='col' >
                    <div className="card mb-4 text-center bg-dark text-white pt-2">
                    {convertion}
                        </div> 
                </div>
            ))
        }
        { ctx.convertionGrid.length ==0 &&
            temp.map(convertion=>(
                <div className='col' >
                    <div className="card mb-4 text-center bg-dark text-white pt-2">
                    {convertion}
                        </div> 
                </div>
            ))
        }
    </div>
    </div>
  )
}

export default ConvertionGrid