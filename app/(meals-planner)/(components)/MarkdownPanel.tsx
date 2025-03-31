"use client";
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export type MarkdownPanelProps = {
    title: string;
    content: string;
}

export default function MarkdownPanel(props: MarkdownPanelProps) {
    return <section className='space-y-2 border border-sidebar-border px-3 py-2 rounded-md'>
        <div className="flex items-center justify-between gap-2">
            <h3 className='font-bold text-lg'>{props.title}</h3>
            <div className='flex items-center gap-1'>
                <Button size="icon" variant="ghost"><Share2 /></Button>
                <Button size="icon" variant="ghost"><Copy /></Button>
            </div>
        </div>
        <ReactMarkdown>{props.content}</ReactMarkdown>
    </section>
}