import React, { useEffect, useMemo, useState, useContext } from 'react'
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { convert, fetchSymbols } from '../../services/currency.service';
import { useLocation, Link,useNavigate, } from 'react-router-dom'
import convertionContex from '../context/convertionContex';
import SelectButton from '../selectButton/selectButton';
import "./exchanger.css"
const formInitialValue = {
    amount: "",
    from: "EUR",
    to: "USD"
}
function Exchanger() {

    const ctx = useContext(convertionContex)
    let location = useLocation()
    let navigate = useNavigate()
    console.log(location);
    const [form, setForm] = useState(formInitialValue)
    const [convertion, setConvertion] = useState({ result: "", rate: "" })
    const [symbols, setSymbols] = useState({})
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(form);
        convert(form.amount, form.from, form.to).then(data => data.json()).then(data => {
            console.log(data);
            setConvertion({ result: Math.trunc(data.result * 100) / 100, rate: Math.trunc(data.info.rate * 10000) / 10000 });
        })
        ctx.onConvertionGridChange(form);
    }
    const handleNavigate = () => {
        if(location.pathname =="/"){
            let state={
                base:form.from,
                to:form.to,
                detailCurrency:form.from &&symbols? symbols[form.from]:"European Union Euro"
            }
            navigate('/details',{state:state})
        }
        else if(location.pathname =="/details")
            navigate('/',{state:null})
    
    }
    const formUpdater = (event) => {
        console.log(event.target.name, event.target.value);
        setForm(previousValue => ({ ...previousValue, [event.target.name]: event.target.value }))
    }
    const getSymbols = () => {
        fetchSymbols().then(data => data.json()).then(data => setSymbols(data.symbols)).catch(error => console.log(error))
    }
    const symbolsArr = useMemo(() => {
        let arr = []
        if (symbols) {
            for (const key in symbols) {
                arr.push(key);
            }
        }
        else
            arr.push('EUR', 'USD')
        return arr
    }, [symbols])

    const swap = () => {
        let temp = form.to;
        setForm(previousForm => ({ ...previousForm, to: form.from, from: temp }))
    }
    useEffect(() => {
        getSymbols()
    }, [])

    return (
        <div className="mx-md-5 mt-3">
            <h3>{location.state == null ? "Currency Exchanger" : location.state.detailCurrency}</h3>
            <form onSubmit={submitHandler} onChange={formUpdater}  >
                <div className="row justify-content-between bg-dark p-3 border-white mt-3">
                    <div className='col-5 d-flex flex-column justify-content-between' >
                        <input className='amountInput' name='amount' type='number' required />
                        <p className='pt-3 result ' >{convertion.rate == "" ? "Rate" : 1 + "" + form.from + "=" + convertion.rate + "*" + form.to} </p>
                    </div>
                    <div className='col-7 ' >
                        <div className='col-12 mb-4 mx-0 row justify-content-between'>
                            <div className="col-sm-5 grid">
                                <SelectButton initialValue={form.from} options={symbolsArr} name="from" required={true} />
                            </div>
                            <div className='col-sm-2 grid' >
                                <button onClick={swap} disabled={location.pathname !="/"}> SWAP </button>
                            </div>
                            <div className="col-sm-5 grid">
                                <SelectButton initialValue={form.to} options={symbolsArr} name="to" required={true} />
                            </div>
                        </div>
                        <input className='col-12 convert-btn' type="submit" value="Convert" disabled={location.pathname !="/"}/>
                        <div className='col-12  mt-4 mx-0 row justify-content-between align-items-baseline'>
                            <p className='pt-3 result col-sm-6 grid' >{convertion.result == "" ? "Result" : convertion.result + "" + form.to}</p>
                            <button className={'col-sm-5 convert-btn grid '}  onClick={handleNavigate} > 
                            {location.pathname==="/"&&"More Details"}
                            {location.pathname==="/details"&&"Go Back"}
                            {/* disabled={!form.from || !form.to||!symbols} */}
                            </button>
                        </div>

                    </div>

                </div>
            </form>
        </div>
    )
}

export default Exchanger