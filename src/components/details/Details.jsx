import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { getChart } from '../../services/currency.service'
function Details() {
    let location = useLocation()
    useEffect(() => {
        drawChart()
    }, [location])
    const drawChart = async () => {
        let chartData= await getChart(location.state.base,location.state.to)
        console.log(chartData);
        if(chartData){
            let ctx = document.getElementById("examChart").getContext("2d");
        new Chart(ctx, {
            type: 'line',
            options: {
                legend: {display: false},
                scales: {
                    xAxes: [{
                        type: 'time',
                    }]
                }
            },
            data: {
                datasets: [{
                    fill: false,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    label: `showing the ${location.state.to} changes against 1 ${location.state.base}`,
                    data: chartData
                }]
            }
        });
        }
        else
            {
                document.getElementById('error').classList.remove('d-none')
                document.getElementById('error').classList.add('d-flex')
                document.getElementById('description').classList.add('d-none')
                document.getElementById('examChart').classList.add('d-none')

            }
    }
    return (
        <div className="mx-md-5 mt-3">
            <div>
                <div className="row ">
                    <div className="container">
                        <h3 id="description"className='text-center'>{`showing the ${location.state.to} changes against 1 ${location.state.base}`}</h3>
                        <canvas id="examChart" ></canvas>
                        <div id='error' className="w-100 d-none justify-content-center">
                        <img style={{objectFit:'contain',width:"400px",height:"300px"}} src='data:image/jpeg;base64,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'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details