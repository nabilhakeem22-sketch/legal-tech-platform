import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Regulation {
    id: number;
    title: string;
    body: string;
    date: string;
    authority: string;
    impact: string;
}

export function RegulatoryFeed({ data }: { data: Regulation[] }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Regulatory Feed (Global)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((item) => (
                        <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                    {item.authority}
                                </span>
                                <span className="text-xs text-gray-400">{item.date}</span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-500 line-clamp-2">{item.body}</p>
                            <div className="mt-2 text-xs font-medium">
                                Impact: <span className={item.impact === 'High' ? 'text-red-500' : 'text-yellow-500'}>{item.impact}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
