import React from "react";
import Chart from "react-apexcharts";

function Barchart(job) {
  return (
    <div className="Barchart">
      <Chart
        type="bar"
        width={600}
        height={600}
        series={[
          {
            name: "Job",
            data: [job.education, job.medical, job.social, job.fund, job.other],
          },
        ]}
        options={{
          xaxis: {
            categories: ["Education", "Medical", "Social", "Fund", "Other"],
          },
          title: {
            text: "Job Chart",
          },
<<<<<<< HEAD
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
>>>>>>> 13692cbba9e36ef66fccecf3d0119046e5656052
        }}
      ></Chart>
    </div>
  );
}

export default Barchart;
