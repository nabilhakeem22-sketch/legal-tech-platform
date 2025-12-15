import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, File } from "lucide-react";

interface Document {
    id: number;
    name: string;
    date: string;
    size: string;
}

export function DocumentVault({ data }: { data: Document[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Vault</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {data && data.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-indigo-50 rounded text-indigo-600 mr-3">
                                    <File className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                    <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                                <Download className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
