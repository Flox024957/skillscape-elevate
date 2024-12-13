import { chartColors } from './chart-colors';

export const chartConfig = {
  line: {
    stroke: chartColors.primary.light,
    strokeWidth: 2,
    activeDot: {
      r: 8,
      strokeWidth: 2,
      stroke: chartColors.primary.dark,
      fill: chartColors.primary.light,
    },
    dot: {
      r: 4,
      strokeWidth: 2,
      stroke: chartColors.primary.dark,
      fill: chartColors.primary.light,
    },
  },
  area: {
    fill: `url(#colorGradient)`,
    stroke: chartColors.primary.light,
    strokeWidth: 2,
  },
  bar: {
    fill: chartColors.secondary.light,
    radius: [4, 4, 0, 0],
  },
  tooltip: {
    contentStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      border: `1px solid ${chartColors.primary.light}`,
      borderRadius: '8px',
      padding: '12px',
      boxShadow: `0 0 20px ${chartColors.primary.light}40`,
    },
    itemStyle: {
      color: '#fff',
    },
    cursor: {
      stroke: chartColors.primary.light,
      strokeWidth: 1,
      strokeDasharray: '4 4',
    },
  },
  xAxis: {
    stroke: chartColors.muted.light,
    strokeWidth: 1,
    style: {
      fontSize: '12px',
      fill: chartColors.muted.light,
    },
  },
  yAxis: {
    stroke: chartColors.muted.light,
    strokeWidth: 1,
    style: {
      fontSize: '12px',
      fill: chartColors.muted.light,
    },
  },
  grid: {
    stroke: `${chartColors.muted.light}20`,
    strokeWidth: 1,
    strokeDasharray: '4 4',
  },
  legend: {
    iconSize: 10,
    iconType: 'circle',
    align: 'right',
    verticalAlign: 'middle',
    style: {
      fontSize: '12px',
      fill: chartColors.muted.light,
    },
  },
};