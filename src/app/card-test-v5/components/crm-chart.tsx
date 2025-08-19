"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";

const chartData = [
  { name: "Leads", value: 82, change: "+12%", icon: Users },
  { name: "Opportunity", value: 83, change: "+8%", icon: Target },
  { name: "Sales", value: 75, change: "+15%", icon: DollarSign },
];

const chartConfig: ChartConfig = {
  Leads: {
    label: "Open Leads",
    color: "#3b82f6", // Blue
  },
  Opportunity: {
    label: "Open Opportunities",
    color: "#10b981", // Green
  },
  Sales: {
    label: "Closed Sales",
    color: "#8b5cf6", // Purple
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = chartData.find((item) => item.name === label);
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-2xl font-bold" style={{ color: payload[0].color }}>
          {payload[0].value}
        </p>
        <p className="text-sm text-green-600 font-medium">
          {data?.change} from last month
        </p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ item, config }) => {
  const Icon = item.icon;
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${config[item.name].color}20` }}
          >
            <Icon size={20} style={{ color: config[item.name].color }} />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {config[item.name].label}
          </span>
        </div>
        <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
          {item.change}
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-800">{item.value}</div>
    </div>
  );
};

const CrmChart = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">
          CRM Performance Dashboard
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {chartData.map((item) => (
          <StatCard key={item.name} item={item} config={chartConfig} />
        ))}
      </div>

      {/* Main Chart */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <span>Pipeline Overview</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Current month performance metrics
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barCategoryGap="25%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                  tickLine={{ stroke: "#d1d5db" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                  tickLine={{ stroke: "#d1d5db" }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartConfig[entry.name].color}
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="text-blue-600" size={16} />
          <span className="text-sm font-semibold text-blue-800">
            Key Insights
          </span>
        </div>
        <p className="text-sm text-blue-700">
          Strong performance across all metrics with Opportunities leading at 83
          units. Sales showing excellent growth at +15% compared to last month.
        </p>
      </div>
    </div>
  );
};

export default CrmChart;
