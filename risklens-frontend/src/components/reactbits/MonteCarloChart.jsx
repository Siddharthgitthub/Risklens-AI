import { Line } from "react-chartjs-2";
import {
Chart as ChartJS,
LineElement,
PointElement,
LinearScale,
CategoryScale,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
LineElement,
PointElement,
LinearScale,
CategoryScale,
Tooltip,
Legend
);

export default function MonteCarloChart({data}){

  if(!data) return null;

  const chartData = {
    labels:["Worst","Median","Best"],
    datasets:[{
      label:"Portfolio Projection ₹",
      data:[
        data.worst,
        data.median,
        data.best
      ],
      borderColor:"#a855f7",
      backgroundColor:"rgba(168,85,247,0.2)",
      tension:0.4,
      fill:true
    }]
  };

  return(
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-10">
      <h2 className="text-lg mb-4 text-purple-300">Monte Carlo Portfolio Projection</h2>

      <div className="h-[300px]">
        <Line 
          data={chartData}
          options={{
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
              legend:{display:true}
            }
          }}
        />
      </div>
    </div>
  )
}
