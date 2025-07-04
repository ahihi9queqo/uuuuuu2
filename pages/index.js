import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), { ssr: false });
const Highcharts = dynamic(() => import("highcharts"), { ssr: false });

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/net");
      const json = await res.json();
      const points = json.map(d => [new Date(d.time).getTime(), d.temp]);
      setData(points);
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    title: { text: "Biểu đồ nhiệt độ" },
    xAxis: { type: "datetime" },
    yAxis: { title: { text: "Nhiệt độ (°C)" } },
    series: [{ name: "ESP32", data, type: "line" }]
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Giám sát nhiệt độ ESP32</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
