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
<<<<<<< HEAD
            colors:['#00385C','#5C0F00'],
            responsive: [
              {
                breakpoint: 1024,
                options: {
                  chart: {
                    width: 400,
                    height: 400
                  }
                }
              }
            ]
=======
            colors:['#00385C','#5C0F00']
>>>>>>> 13692cbba9e36ef66fccecf3d0119046e5656052
        }}
        >

        </Chart>
    </div>
  )
}

export default Piechart