"use client";

import { CloudUpload, FileText, X } from "lucide-react";
import { useState } from "react";

export function FileUpload() {
    const [files, setFiles] = useState<string[]>([]);

    const handleUpload = () => {
        // Mock upload
        const newFile = `Tax_Return_v${files.length + 1}.pdf`;
        setFiles([...files, newFile]);
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Documents</h3>

            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={handleUpload}
            >
                <CloudUpload className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
            </div>

            {files.length > 0 && (
                <ul className="mt-4 divide-y divide-gray-100">
                    {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{file}</span>
                            </div>
                            <button
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
