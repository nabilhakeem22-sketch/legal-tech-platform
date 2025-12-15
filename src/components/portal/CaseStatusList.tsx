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
                        <div key={c.id} className="border rounded-lg p-4 bg-gray-50 border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{c.title}</h4>
                                    <p className="text-xs text-gray-500">{c.id}</p>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                    {c.status}
                                </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Next: {c.nextStep} ({c.date})</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <FileText className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Handled by: {c.lawyer}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
