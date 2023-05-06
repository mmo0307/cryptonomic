import React from 'react';
import ReactApexChart from 'react-apexcharts';

import styles from './spline.module.scss';

type ChartData = {
  name: string;
  data: number[];
};

type ChartOptions = {
  chart: {
    width?: string | number;
    height?: string | number;
    type:
      | 'area'
      | 'line'
      | 'bar'
      | 'pie'
      | 'donut'
      | 'radialBar'
      | 'scatter'
      | 'bubble'
      | 'heatmap'
      | 'treemap'
      | 'boxPlot'
      | 'candlestick'
      | 'radar'
      | 'polarArea'
      | 'rangeBar'
      | 'rangeArea';
  };
  dataLabels: {
    enabled: boolean;
  };
  stroke: {
    curve: 'smooth';
  };
  xaxis: {
    type: 'datetime';
    categories: string[];
  };
  tooltip: {
    x: {
      format: string;
    };
  };
};

type ApexChartProps = {
  series: ChartData[];
  options: ChartOptions;
};

const ApexChart: React.FC<ApexChartProps> = ({ options, series }) => {
  return (
    <div className={styles.chart}>
      <ReactApexChart options={options} series={series} type='area' />
    </div>
  );
};

export default ApexChart;
