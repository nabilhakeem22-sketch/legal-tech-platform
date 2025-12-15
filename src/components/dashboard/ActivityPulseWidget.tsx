"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip, YAxis } from "recharts";

const data = [
    { name: "Last Week", completed: 12 },
    { name: "This Week", completed: 18 },
];

export function ActivityBarChart() {
    return (
        <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" barSize={30} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide width={100} />
                    {/* Hiding YAxis labels to save space, will use custom layout or legend if needed, but simple bars are clean */}
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Bar dataKey="completed" fill="#4f46e5" radius={[0, 4, 4, 0]} background={{ fill: '#f3f4f6' }} />
                </BarChart>
            </ResponsiveContainer>

            {/* Custom Legend / Labels below to make it very clear */}
            <div className="flex flex-col gap-2 mt-4 px-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Last Week</span>
                    <span className="font-bold text-gray-700">12 Tasks</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-gray-300 h-2 rounded-full" style={{ width: '66%' }}></div>
                </div>

                <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-500">This Week</span>
                    <span className="font-bold text-indigo-600">18 Tasks</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>
        </div>
    );
}

// Rewriting ActivityBarChart to be simpler and use standard HTML for the bars if Recharts is overkill for just 2 bars, 
// BUT user asked for visualizations. 
// Let's stick to Recharts but properly configured.
// Actually, for just 2 bars comparing "This Week" vs "Last Week", a simple progress bar comparison is often cleaner design-wise than a full chart.
// I'll leave the code above but actually, I will REPLACE it with a purely HTML/Tailwind implementation which is more robust and cleaner for this specific comparison.
// It matches the "Activity Pulse" requirement well.

export function ActivityPulseWidget() {
    return (
        <div className="space-y-6 pt-2">
            {/* Metric 1 */}
            <div>
                <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-gray-600">This Week</span>
                    <span className="text-lg font-bold text-indigo-600">18</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
            </div>

            {/* Metric 2 */}
            <div>
                <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-gray-500">Last Week</span>
                    <span className="text-lg font-bold text-gray-600">12</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-gray-300 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-green-600 font-medium flex items-center">
                    +50% Productivity increase
                </p>
            </div>
        </div>
    );
}
