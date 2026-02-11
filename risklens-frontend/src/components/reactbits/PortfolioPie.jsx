import { Pie } from "react-chartjs-2";
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(ArcElement,Tooltip,Legend);

export default function PortfolioPie({portfolio}){

  if(!portfolio) return null;

  // simple demo allocation
  const allocation = {
    Stocks:40,
    MutualFunds:25,
    Bonds:20,
    Gold:10,
    Cash:5
  };

  const data = {
    labels:Object.keys(allocation),
    datasets:[{
      data:Object.values(allocation),
      backgroundColor:[
        "#a855f7",
        "#6366f1",
        "#22c55e",
        "#f59e0b",
        "#38bdf8"
      ]
    }]
  };

  return(
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-10">
      <h2 className="text-lg mb-4 text-purple-300">AI Portfolio Allocation</h2>

      <div className="h-[300px] w-[350px] mx-auto">
        <Pie data={data}/>
      </div>
    </div>
  )
}
