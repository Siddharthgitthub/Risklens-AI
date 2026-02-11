import { Line } from "react-chartjs-2";
import {
Chart as ChartJS,
LineElement,
CategoryScale,
LinearScale,
PointElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement,Tooltip,Legend);

export default function MonteCarlo(){

  const labels = Array.from({length:25},(_,i)=>i+1);

  const data={
    labels,
    datasets:[
      {
        label:"AI Portfolio Simulation",
        data: labels.map(x=>10000 + x*800 + Math.random()*3000),
        borderColor:"#22c55e",
        tension:0.4
      }
    ]
  };

  return(
    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
      <h2 className="mb-4 text-lg">Monte Carlo Simulation</h2>
      <Line data={data}/>
    </div>
  )
}
