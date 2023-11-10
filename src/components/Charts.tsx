/** @format */

//Importing required packages
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
//declaring the colors for the chart
const COLORS = [
  '#361495',
  '#c71585',
  '#7518A1',
  '#017EFA',
  '#0B3B82',
  '#6D3277',
  '#f23384',
  '#002147',
  '#551a8b',
  '#003366',
  '#702963',
  '#f5f5dc',
];
const style = {
  top: '3vh',
  right: '-4.2vw',
  lineHeight: '30px',
  backgroundColor: 'white',
  padding: '4px',
  fontSize: '13px',
  borderRadius: '5px',
};

// function for chart
export default function Charts(
  indata: any[],
  value: string,
  hei: number,
  wid: number,
  legendbool: boolean
) {
  return (
    <PieChart
      width={wid}
      height={hei}>
      {indata && (
        <Pie
          dataKey={value}
          labelLine={false}
          isAnimationActive={true}
          data={indata}
          cx='50%'
          innerRadius={50}
          outerRadius={110}>
          {indata.map((entry, index) => (
            <Cell
              key={`cell-${entry}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      )}
      {legendbool && (
        <Legend
          iconSize={10}
          layout='vertical'
          verticalAlign='middle'
          wrapperStyle={style}
        />
      )}
      <Tooltip />
    </PieChart>
  );
}
