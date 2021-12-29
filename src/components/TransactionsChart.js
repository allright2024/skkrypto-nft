import { useState } from "react";
import {
    LineChart,
    Line,
    Tooltip,
    YAxis,
    XAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import data from "../assets/data.json";

export default function TransactionsChart() {
    return (
        <ResponsiveContainer width="95%" height={180} debounce={1}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <YAxis />
                <Tooltip
                    itemStyle={{ fontSize: "5px" }}
                    contentStyle={{ fontSize: "0px" }}
                    wrapperStyle={{ padding: 0, border: "none" }}
                />
                <Line
                    dot={false}
                    type="monotone"
                    dataKey="pv"
                    stroke="#4318ff"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
