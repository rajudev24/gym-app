/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ShowChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart
                width="100%"
                height={200}
                data={data}
                margin={{ top: 20, right: 10, left: -30, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" className="text-[10px]" />
                <YAxis className="text-xs" />
                <CartesianGrid
                    strokeDasharray="2 0"
                    vertical={false}
                    horizontal={false}
                />
                <Tooltip />

                {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
                <Area
                    dataKey="value"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                    activeDot={{ r: 5 }}
                    dot={{ stroke: "#82ca9d", strokeWidth: 3 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default ShowChart;