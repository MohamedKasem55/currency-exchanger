import React, { useEffect, useMemo, useState } from 'react'
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
    const [result, setResult] = useState("")
    const [symbols, setSymbols] = useState({})
    const submitHandler = () => {
        event.preventDefault()
        console.log(form);
        /*  convert(form.amount,form.from,form.to).then(data=>{
             console.log(data);
             setResult(data.result);
         }) */
    }
    const formUpdater = (event) => {
        console.log(event.target.name, event.target.value);
        setForm(previousValue => ({ ...previousValue, [event.target.name]: event.target.value }))
    }
    const getSymbols = () => {
        fetchSymbols().then(data => {
            console.log(data);
            setSymbols(data)
        })
    }
    const symbolsArr = useMemo(() => {
        let arr = []
        for (const key in symbols) {
            arr.push(key);
        }
        return arr
    }, [symbols])

    useEffect(() => {
        getSymbols()
    }, [])

    return (
        <div className="mx-md-5 mt-3">
            <h3>Currency Exchanger</h3>
            <form onSubmit={submitHandler} onChange={formUpdater}  >
                <div className="row justify-content-between bg-dark p-3 border-white mt-3">
                    <div className='col-5' >
                        <input className='amountInput' name='amount' type='number' required />
                    </div>
                    <div className='col-7 ' >
                        <div className='col-12 mb-4 mx-0 row'>
                            <div className="col-sm-5 grid">
                            <SelectButton  initialValue="EUR" options={['one', 'two', 'EUR', 'four', 'five']} name="from" required={true} />
                            </div>
                            <div className='col-sm-2 grid' >
                                space
                            </div>
                            <div className="col-sm-5 grid">
                            <SelectButton initialValue="USD" options={['one', 'two', 'three', 'four', 'USD']} name="to" required={true} />
                            </div>
                        </div>
                        <input className='col-12 convert-btn' type="submit" value="Convert" />


                    </div>

                </div>
            </form>
        </div>
    )
}

export default Exchanger