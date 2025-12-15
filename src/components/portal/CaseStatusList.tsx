import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText } from "lucide-react";

interface Case {
    id: string;
    title: string;
    status: string;
    nextStep: string;
    date: string;
    lawyer: string;
}

export function CaseStatusList({ data }: { data: Case[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Cases</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data && data.map((c) => (
                        <div key={c.id} className="border rounded-lg p-4 bg-muted/30 border-border">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-semibold text-foreground">{c.title}</h4>
                                    <p className="text-xs text-muted-foreground">{c.id}</p>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/20">
                                    {c.status}
                                </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-1">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Next: {c.nextStep} ({c.date})</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Handled by: {c.lawyer}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
