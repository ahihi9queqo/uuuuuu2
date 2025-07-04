import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function Home() {
  const options = {
    title: {
      text: 'Biểu đồ nhiệt độ ESP32'
    },
    series: [{
      name: 'Nhiệt độ',
      data: [25, 26, 27, 28, 29, 30] // dữ liệu giả lập
    }]
  };

  return (
    <div>
      <h1>Giám sát nhiệt độ ESP32</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
