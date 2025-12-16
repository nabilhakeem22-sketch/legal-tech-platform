import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, MessageCircle, Mail, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";

interface Task {
    id: number;
    title: string;
    due: string;
    completed: boolean;
    clientName?: string; // Optional for now, assuming context or adding it
}

export function ComplianceChecklist({ data }: { data: Task[] }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [nudgeTask, setNudgeTask] = useState<Task | null>(null);

    useEffect(() => {
        setTasks(data || []);
    }, [data]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const progress = tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

    const handleNudge = (task: Task, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling the task
        setNudgeTask(task);
    };

    const sendNudge = (method: 'whatsapp' | 'email') => {
        if (!nudgeTask) return;

        const clientName = nudgeTask.clientName || "Client"; // Default
        const message = `Dear ${clientName}, this is a gentle reminder regarding the compliance task: "${nudgeTask.title}" which is due on ${nudgeTask.due}. Please ensure this is addressed to avoid penalties.`;

        if (method === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        } else {
            window.open(`mailto:?subject=Compliance Reminder: ${nudgeTask.title}&body=${encodeURIComponent(message)}`);
        }
        setNudgeTask(null);
    };

    return (
        <>
            <Card className="h-full border-border bg-card">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center text-foreground">
                        <span>Action Required</span>
                        <span className="text-sm font-normal text-muted-foreground">{progress}% Complete</span>
                    </CardTitle>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors group"
                            >
                                <div
                                    className="flex items-start space-x-3 cursor-pointer flex-1"
                                    onClick={() => toggleTask(task.id)}
                                >
                                    {task.completed ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground/30 mt-0.5 shrink-0" />
                                    )}
                                    <div className="flex-1">
                                        <p className={cn("text-sm font-medium", task.completed ? "text-muted-foreground line-through" : "text-foreground")}>
                                            {task.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                                    </div>
                                </div>

                                {!task.completed && (
                                    <button
                                        onClick={(e) => handleNudge(task, e)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-primary hover:bg-primary/10 rounded-full"
                                        title="Nudge Client"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Modal
                isOpen={!!nudgeTask}
                onClose={() => setNudgeTask(null)}
                title="Send Client Nudge"
            >
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Choose a channel to send a reminder to <span className="font-medium text-foreground">{nudgeTask?.clientName || "the client"}</span> for <span className="font-medium text-foreground">"{nudgeTask?.title}"</span>.
                    </p>

                    <div className="bg-muted p-3 rounded-md text-sm italic text-muted-foreground border border-border">
                        "Dear {nudgeTask?.clientName || "Client"}, this is a gentle reminder regarding the compliance task: "{nudgeTask?.title}" which is due on {nudgeTask?.due}..."
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                            onClick={() => sendNudge('whatsapp')}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors font-medium text-sm"
                        >
                            <MessageCircle className="h-4 w-4" /> WhatsApp
                        </button>
                        <button
                            onClick={() => sendNudge('email')}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-sm"
                        >
                            <Mail className="h-4 w-4" /> Email
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
