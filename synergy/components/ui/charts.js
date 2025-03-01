"use client";  // Add this line at the top

import { LineChart as LC, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart as PC, Pie, Cell } from "recharts";
import { BarChart as BC, Bar } from "recharts";

export function LineChart({ data, labels }) {
  const formattedData = data.map((value, index) => ({ name: labels[index], value }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LC data={formattedData}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LC>
    </ResponsiveContainer>
  );
}

export function PieChart({ data, labels }) {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a28dcf"];
  const formattedData = data.map((value, index) => ({ name: labels[index], value }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PC>
        <Pie data={formattedData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PC>
    </ResponsiveContainer>
  );
}

export function BarChart({ data, labels }) {
  const formattedData = data.map((value, index) => ({ name: labels[index], value }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BC data={formattedData}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </BC>
    </ResponsiveContainer>
  );
}
