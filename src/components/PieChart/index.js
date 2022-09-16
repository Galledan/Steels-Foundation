import React from 'react'
import Chart from 'react-apexcharts'

function Piechart(donation) {
  return (
    <div className='Piechart'>
        <Chart
        type='pie'
        width={600}
        height={600}
        series={[donation.once,donation.monthly]}
        options={{
            labels:['Once', 'Monthly'],
            title:{
                text:'Donation Chart'
            },
            colors:['#00385C','#5C0F00']
        }}
        >

        </Chart>
    </div>
  )
}

export default Piechart