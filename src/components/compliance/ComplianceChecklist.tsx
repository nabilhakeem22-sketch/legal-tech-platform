"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Task {
    id: number;
    title: string;
    due: string;
    completed: boolean;
}

export function ComplianceChecklist({ data }: { data: Task[] }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTasks(data || []);
    }, [data]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const progress = tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Action Required</span>
                    <span className="text-sm font-normal text-muted-foreground">{progress}% Complete</span>
                </CardTitle>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-start space-x-3 p-2 rounded hover:bg-muted cursor-pointer transition-colors"
                            onClick={() => toggleTask(task.id)}
                        >
                            {task.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            ) : (
                                <Circle className="h-5 w-5 text-muted-foreground/30 mt-0.5" />
                            )}
                            <div className="flex-1">
                                <p className={cn("text-sm font-medium", task.completed ? "text-muted-foreground line-through" : "text-foreground")}>
                                    {task.title}
                                </p>
                                <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
