/* eslint-disable no-unused-vars */
import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const LyingLegCurls = () => {

    const data = [
        {
            "name": "Aug 8",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400,
            "num": 10
        },
        {
            "name": "Aug 10",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210,
            "num": 9.5
        },
        {
            "name": "Aug 12",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290,
            "num": 8
        },
        {
            "name": "Aug 14",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000,
            "num": 7
        },
        {
            "name": "Aug 16",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181,
            "num": 5.5
        },
        {
            "name": "Aug 18",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500,
            "num": 5
        },
        {
            "name": "Aug 20",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100,
            "num": 5
        },
        {
            "name": "Aug 20",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100,
            "num": 5
        },
    ]

    return (
        <div className='flex flex-col gap-5'>
            <div className='w-2/3 border rounded-md '>
                <div className='flex justify-between p-5'>
                    <div>
                        <h2 className='text-xl font-semibold'>Lying Leg Curls</h2>
                        <h2 className='text-sm'>1M / 2M / 6M /1Y</h2>
                    </div>
                    <div>
                        <h2 className='text-3xl font-semibold text-green-400'>20%</h2>
                        <h2>17.7%</h2>
                    </div>
                </div>

                <div className='p-10'>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart width="100%" height={250} data={data}
                            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            {/* <XAxis dataKey={{}} /> */}
                            {/* <YAxis /> */}
                            <CartesianGrid strokeDasharray="2 0" vertical={false} horizontal={true} />
                            <Tooltip />

                            {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
                            <Area type="monotone" dataKey="num" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" activeDot={{ r: 5 }} dot={{ stroke: '#82ca9d', strokeWidth: 3 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='w-2/3 border rounded-md '>
                <div className='flex justify-between p-5'>
                    <div>
                        <h2 className='text-xl font-semibold'>Lying Leg Curls</h2>
                        <h2 className='text-sm'>1M / 2M / 6M /1Y</h2>
                    </div>
                    <div>
                        <h2 className='text-3xl font-semibold text-green-400'>20%</h2>
                        <h2>17.7%</h2>
                    </div>
                </div>

                <div className='p-10'>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart width="100%" height={250} data={data}
                            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            {/* <XAxis dataKey={{}} /> */}
                            {/* <YAxis /> */}
                            <CartesianGrid strokeDasharray="2 0" vertical={false} horizontal={true} />
                            <Tooltip />

                            {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
                            <Area type="monotone" dataKey="num" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" activeDot={{ r: 5 }} dot={{ stroke: '#82ca9d', strokeWidth: 3 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default LyingLegCurls;