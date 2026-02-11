import { Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(CategoryScale,LinearScale,BarElement,Tooltip,Legend);

export default function ModelChart({stats}){

  const data = {
    labels:Object.keys(stats),
    datasets:[{
      label:"Model Accuracy %",
      data:Object.values(stats),
      backgroundColor:["#22c55e","#3b82f6","#f59e0b"]
    }]
  };

  return(
    <div className="bg-white/5 p-6 rounded-2xl mt-10 border border-white/10">
      <h2 className="mb-4 text-lg">ML Model Comparison</h2>
      <Bar data={data}/>
    </div>
  )
}
