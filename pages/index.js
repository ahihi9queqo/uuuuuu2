import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Import biểu đồ động để tránh lỗi SSR
const Highcharts = dynamic(() => import('highcharts'), { ssr: false });
const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const temp = Math.floor(Math.random() * 10 + 25); // nhiệt độ giả 25–35°C
      const time = new Date().toLocaleTimeString();
      setData(prev => [...prev.slice(-19), [time, temp]]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    title: { text: 'Biểu đồ nhiệt độ ESP32 (mô phỏng)' },
    xAxis: { categories: data.map(d => d[0]), title: { text: 'Thời gian' } },
    yAxis: { title: { text: 'Nhiệt độ (°C)' } },
    series: [{
      name: 'Nhiệt độ',
      data: data.map(d => d[1]),
    }]
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Giám sát nhiệt độ ESP32</h2>
      {typeof window !== "undefined" && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
}

