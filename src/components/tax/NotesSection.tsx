"use client";

import { Send } from "lucide-react";
import { useState } from "react";

interface Note {
    id: number;
    user: string;
    text: string;
    date: string;
}

const mockNotes: Note[] = [
    { id: 1, user: "Ahmed Legal", text: "Requested variable salary data from HR.", date: "2 hours ago" },
    { id: 2, user: "System", text: "Filing status changed to 'Preparation'", date: "1 day ago" },
];

export function NotesSection() {
    const [notes, setNotes] = useState<Note[]>(mockNotes);
    const [input, setInput] = useState("");

    const addNote = () => {
        if (!input.trim()) return;
        const newNote: Note = {
            id: Date.now(),
            user: "You",
            text: input,
            date: "Just now",
        };
        setNotes([newNote, ...notes]);
        setInput("");
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm h-full flex flex-col">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Activity & Notes</h3>

            <div className="flex-1 overflow-y-auto max-h-[300px] space-y-6 mb-4 pr-2">
                {notes.map((note) => (
                    <div key={note.id} className="flex gap-3">
                        <div className="flex-none h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                            {note.user.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-semibold text-gray-900">{note.user}</span>
                                <span className="text-xs text-gray-500">{note.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{note.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative mt-auto">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addNote()}
                    className="block w-full rounded-md border-0 py-2.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Add a note..."
                />
                <button
                    onClick={addNote}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 hover:text-indigo-500"
                >
                    <Send className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
