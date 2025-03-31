"use client";
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import removeMarkdown from "markdown-to-text";
import { toast } from 'sonner';

export type MarkdownPanelProps = {
    title: string;
    content: string;
}

export default memo(function MarkdownPanel(props: MarkdownPanelProps) {
    const bareText = removeMarkdown(props.content) + "\nGenerated on " + process.env["NEXT_PUBLIC_APP_URL"];
    const onShare = () => shareText(bareText, props.title);
    const onCopy = () => copyText(props.title + "\n" + bareText)

    return <section className='space-y-2 border border-sidebar-border px-3 py-2 rounded-md'>
        <div className="flex items-center justify-between gap-2">
            <h3 className='font-bold text-lg'>{props.title}</h3>
            <div className='flex items-center gap-1'>
                <Button size="icon" variant="ghost" onClick={onShare}><Share2 /></Button>
                <Button size="icon" variant="ghost" onClick={onCopy}><Copy /></Button>
            </div>
        </div>
        <div className="markdown-root">
            <ReactMarkdown>{props.content}</ReactMarkdown>
        </div>
    </section>
})

const shareText = async (text: string, title: string) => {
    try {
        if (!navigator.share) throw Error("Navigator.share is not available");
        await navigator.share({
            title: title,
            text: text
        });
    } catch (error) {
        console.error('Error sharing content:', error);
        fallbackCopyText(text);
        toast('Copied to clipboard! You can now share it manually.');
    }
};

const copyText = async (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
            .catch((error) => {
                console.error('Error copying content:', error);
                fallbackCopyText(text);
            });
    } else {
        fallbackCopyText(text);
    }
    toast("Copied to clipboard")
};

const fallbackCopyText = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Content copied to clipboard (fallback)');
        } else {
            console.error('Failed to copy content (fallback)');
        }
    } catch (err) {
        console.error('Error during fallback copy:', err);
    }

    document.body.removeChild(textArea);
};
