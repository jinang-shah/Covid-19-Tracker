import React,{useEffect,useState} from 'react'
import {Line} from 'react-chartjs-2'
 
function LineGraph() {

    const [data, setdata] = useState({});

    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    },[])

    return (
        <div>
            Hello Line
        </div>
    )
}

export default LineGraph
