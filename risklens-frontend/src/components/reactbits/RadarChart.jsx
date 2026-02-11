import { Radar } from "react-chartjs-2";
import {
Chart as ChartJS,
RadialLinearScale,
PointElement,
LineElement,
Filler,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
RadialLinearScale,
PointElement,
LineElement,
Filler,
Tooltip,
Legend
);

export default function RadarChart({score}){

  const data = {
    labels: [
      "Risk Taking",
      "Discipline",
      "Emotional Control",
      "Market Knowledge",
      "Patience"
    ],
    datasets: [{
      label: "Investor Personality",
      data: [
        score%100,
        (score*1.2)%100,
        (score*0.9)%100,
        (score*1.1)%100,
        (score*0.8)%100
      ],
      backgroundColor:"rgba(34,197,94,0.2)",
      borderColor:"#22c55e"
    }]
  };

  return(
    <div className="bg-white/5 p-6 rounded-2xl mt-10 border border-white/10">
      <h2 className="mb-4 text-lg">Investor Personality Analysis</h2>
      <Radar data={data}/>
    </div>
  )
}
