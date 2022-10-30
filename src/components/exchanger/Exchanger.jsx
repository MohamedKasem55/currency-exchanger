import React, { useEffect, useMemo, useState } from 'react'
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { convert, fetchSymbols } from '../../services/currency.service';
import SelectButton from '../selectButton/selectButton';
import "./exchanger.css"
const formInitialValue = {
    amount: "",
    from: "EUR",
    to: "USD"
}
function Exchanger() {
    const [form, setForm] = useState(formInitialValue)
    const [convertion, setConvertion] = useState({result:"",rate:""})
    const [symbols, setSymbols] = useState({})
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(form);
         convert(form.amount,form.from,form.to).then(data=>data.json()).then(data=>{
            console.log(data);
            setConvertion({result:Math.trunc(data.result*100)/100,rate:Math.trunc(data.info.rate*10000)/10000});
         })
    }
    
    const formUpdater = (event) => {
        console.log(event.target.name, event.target.value);
        setForm(previousValue => ({ ...previousValue, [event.target.name]: event.target.value }))
    }
    const getSymbols = () => {
        fetchSymbols().then(data => data.json()).then(data=>setSymbols(data.symbols)).catch(error=>console.log(error))
    }
    const symbolsArr = useMemo(() => {
        let arr = []
        for (const key in symbols) {
            arr.push(key);
        }
        return arr
    }, [symbols])
    const swap=()=>{
        let temp = form.to;
        setForm(previousForm=>({...previousForm,to:form.from,from:temp}))
    }
    useEffect(() => {
        getSymbols()
    }, [])

    return (
        <div className="mx-md-5 mt-3">
            <h3>Currency Exchanger</h3>
            <form onSubmit={submitHandler} onChange={formUpdater}  >
                <div className="row justify-content-between bg-dark p-3 border-white mt-3">
                    <div className='col-5 d-flex flex-column justify-content-between' >
                        <input className='amountInput' name='amount' type='number' required />
                        <p className='pt-3 result ' >{convertion.rate==""?"Rate":1+""+form.from+"="+convertion.rate+"*"+form.to} </p>
                    </div>
                    <div className='col-7 ' >
                        <div className='col-12 mb-4 mx-0 row justify-content-between'>
                            <div className="col-sm-5 grid">
                            <SelectButton  initialValue={form.from} options={symbolsArr} name="from" required={true} />
                            </div>
                            <div className='col-sm-2 grid' >
                                <button onClick={swap} > SWAP </button>
                            </div>
                            <div className="col-sm-5 grid">
                            <SelectButton initialValue={form.to} options={symbolsArr} name="to" required={true} />
                            </div>
                        </div>
                        <input className='col-12 convert-btn' type="submit" value="Convert" />
                        <div className='col-12  mt-4 mx-0 row justify-content-between align-items-baseline'>
                            <p className='pt-3 result col-sm-6 grid' >{convertion.result==""?"Result":convertion.result+""+form.to}</p>
                            <button className='col-sm-5 convert-btn grid ' >More Details</button>
                        </div>

                    </div>

                </div>
            </form>
        </div>
    )
}

export default Exchanger