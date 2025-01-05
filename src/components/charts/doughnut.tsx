import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ["High", "Low", "Average"],
//   datasets: [
//     {
//       label: "Tutees Performace",
//       data: [50, 20, 30],
//       backgroundColor: [
//         "rgba(18, 183, 106, 1)",
//         "rgba(97, 114, 243, 1)",
//         "rgba(247, 144, 9, 1)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: false,
      text: "",
    },
  },
};

export function DoughnutChart({
  data,
}: {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}) {
  return <Doughnut options={options} data={data} />;
}
