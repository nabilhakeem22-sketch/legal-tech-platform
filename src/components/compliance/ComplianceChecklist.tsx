"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, MessageCircle, Mail, Send, UserPlus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { mockTeamMembers } from "@/lib/mock-data";

interface Task {
    id: number;
    title: string;
    due: string;
    completed: boolean;
    clientName?: string;
    blockedBy?: string; // "Client" | "Internal" | "Authority"
    assignee?: string;
    assigneeInitials?: string;
}

export function ComplianceChecklist({ data, compact = false }: { data: Task[], compact?: boolean }) {
    const [tasks, setTasks] = useState<Task[]>(data || []);
    const [nudgeTask, setNudgeTask] = useState<Task | null>(null);
    const [assignTask, setAssignTask] = useState<Task | null>(null);

    // Update tasks if prop data changes significantly
    useEffect(() => {
        if (JSON.stringify(data) !== JSON.stringify(tasks)) {
            setTasks(data || []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const progress = tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

    const handleNudge = (task: Task, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling the task
        setNudgeTask(task);
    };

    const handleAssignClick = (task: Task, e: React.MouseEvent) => {
        e.stopPropagation();
        setAssignTask(task);
    };

    const assignMember = (member: typeof mockTeamMembers[0]) => {
        if (!assignTask) return;
        setTasks(tasks.map(t =>
            t.id === assignTask.id
                ? { ...t, assignee: member.name, assigneeInitials: member.initials }
                : t
        ));
        setAssignTask(null);
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

    const getBlockerBadge = (blocker?: string) => {
        if (!blocker) return null;
        switch (blocker) {
            case "Client":
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Waiting on Client</span>;
            case "Internal":
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Internal Review</span>;
            case "Authority":
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Gov. Processing</span>;
            default:
                return null;
        }
    };

    return (
        <>
            <Card className="h-full border-border bg-card">
                <CardHeader className={compact ? "pb-2" : ""}>
                    <CardTitle className="flex justify-between items-center text-foreground">
                        <span className={compact ? "text-lg" : ""}>{compact ? "Pending Tasks" : "Action Required"}</span>
                        {!compact && <span className="text-sm font-normal text-muted-foreground">{progress}% Complete</span>}
                    </CardTitle>
                    {!compact && (
                        <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                    )}
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
                                    <div className="flex-1 w-full">
                                        <div className="flex items-center justify-between w-full pr-2">
                                            <p className={cn("text-sm font-medium pr-2", task.completed ? "text-muted-foreground line-through" : "text-foreground")}>
                                                {task.title}
                                            </p>
                                            {getBlockerBadge(task.blockedBy)}
                                        </div>

                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                Due: {task.due}
                                            </p>
                                            {task.assignee ? (
                                                <div className="flex items-center gap-1.5 bg-primary/10 px-1.5 py-0.5 rounded-full" title={`Assigned to ${task.assignee}`}>
                                                    <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                                                        {task.assigneeInitials || task.assignee.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <span className="text-[10px] font-medium text-primary">{task.assignee.split(' ')[0]}</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={(e) => handleAssignClick(task, e)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary"
                                                >
                                                    <UserPlus className="h-3 w-3" /> Assign
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {!task.completed && (
                                    <div className="flex items-center gap-1">
                                        {/* Only show assign button here if it's already assigned, to allow re-assignment */}
                                        {task.assignee && (
                                            <button
                                                onClick={(e) => handleAssignClick(task, e)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                                                title="Re-assign"
                                            >
                                                <UserPlus className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={(e) => handleNudge(task, e)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-primary hover:bg-primary/10 rounded-full"
                                            title="Nudge Client"
                                        >
                                            <Send className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Nudge Modal */}
            <Modal
                isOpen={!!nudgeTask}
                onClose={() => setNudgeTask(null)}
                title="Send Client Nudge"
            >
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Choose a channel to send a reminder to <span className="font-medium text-foreground">{nudgeTask?.clientName || "the client"}</span> for <span className="font-medium text-foreground">&quot;{nudgeTask?.title}&quot;</span>.
                    </p>

                    <div className="bg-muted p-3 rounded-md text-sm italic text-muted-foreground border border-border">
                        &quot;Dear {nudgeTask?.clientName || "Client"}, this is a gentle reminder regarding the compliance task: &quot;{nudgeTask?.title}&quot; which is due on {nudgeTask?.due}...&quot;
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

            {/* Assign Task Modal */}
            <Modal
                isOpen={!!assignTask}
                onClose={() => setAssignTask(null)}
                title="Assign Task"
            >
                <div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Select a team member to assign to <span className="font-medium text-foreground">&quot;{assignTask?.title}&quot;</span>.
                    </p>

                    <div className="space-y-2">
                        {mockTeamMembers.map((member) => (
                            <button
                                key={member.id}
                                onClick={() => assignMember(member)}
                                className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/20">
                                        {member.initials}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    </div>
                                </div>
                                {assignTask?.assignee === member.name && (
                                    <Check className="h-4 w-4 text-primary" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
}
