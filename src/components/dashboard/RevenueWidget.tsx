import { RevenueTrendChart } from "./RevenueTrendChart";

interface Task {
    id: number;
    client: string;
    service: string;
    date: string;
}

interface RevenueWidgetProps {
    unbilledTasks: Task[];
}

export function RevenueWidget({ unbilledTasks }: RevenueWidgetProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Revenue Opportunity</h3>
                    <p className="text-sm text-gray-500">Tasks ready for invoicing</p>
                </div>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    8 Tasks Ready
                </span>
            </div>

            <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
                {/* List Section */}
                <div className="flex-1 overflow-auto">
                    <ul role="list" className="divide-y divide-gray-100">
                        {unbilledTasks.map((task) => (
                            <li key={task.id} className="flex justify-between gap-x-6 py-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{task.service}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{task.client}</p>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">Completed</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {task.date}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-50">
                        <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-500">
                            Generate All Invoices &rarr;
                        </button>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="flex-1 min-h-[200px] border-l border-gray-100 pl-0 lg:pl-6 bg-gray-50/50 rounded-r-lg -mr-6 -my-6 p-6 flex flex-col justify-center">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Projected Income</h4>
                    <RevenueTrendChart />
                </div>
            </div>
        </div>
    );
}
