import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Import dynamic vì Highcharts chỉ chạy trên trình duyệt
const Highcharts = dynamic(() => import('highcharts'), { ssr: false });
const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });

export default function Home() {
  const [chartData, setChartData] = useState([25, 26, 27, 28, 29, 30]); // Dữ liệu giả lập

  // (Có thể thêm useEffect ở đây nếu bạn muốn lấy từ API sau này)

  const options = {
    title: {
      text: 'Biểu đồ nhiệt độ ESP32'
    },
    xAxis: {
      title: { text: 'Lần đo' },
      categories: chartData.map((_, i) => `Lần ${i + 1}`)
    },
    yAxis: {
      title: { text: 'Nhiệt độ (°C)' }
    },
    series: [{
      name: 'Nhiệt độ',
      data: chartData
    }]
  };

  return (
    <div>
      <h1>Giám sát nhiệt độ ESP32</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
