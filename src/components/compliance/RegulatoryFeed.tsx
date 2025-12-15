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
                        <div key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                    {item.authority}
                                </span>
                                <span className="text-xs text-muted-foreground">{item.date}</span>
                            </div>
                            <h4 className="text-sm font-medium text-foreground mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.body}</p>
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
