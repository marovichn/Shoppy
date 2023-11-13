import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const PieChartGender = ({ data }: { data: any }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (index: number) => {
    setActiveIndex(index);
  };
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={12} className="text-4xl font-bold" textAnchor='middle' fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill='none'
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill='#333'
        >{`Users: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill='#999'
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <>
      <Heading
        description='Data visualization pie'
        title='Gender Data'
      ></Heading>
      <ResponsiveContainer
        className='dark:bg-white rounded-xl border-[1px] border-[#F05454]'
        width='100%'
        height={350}
      >
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={100}
            outerRadius={120}
            fill='#F05454'
            dataKey='value'
          />
        </PieChart>
      </ResponsiveContainer>
      <Button
        onClick={() => {
          if (activeIndex === data.length - 1) {
            onPieEnter(data[0].index);
          } else if (activeIndex <= data.length - 1) {
            onPieEnter(data[activeIndex + 1].index);
          }
        }}
      >
        Next Gender
      </Button>
    </>
  );
};

export default PieChartGender;
