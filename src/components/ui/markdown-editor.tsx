"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { Button } from "@/components/ui/button";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Enter your markdown content...", 
  className = "" 
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Button
          type="button"
          variant={!isPreview ? "default" : "outline"}
          size="sm"
          onClick={() => setIsPreview(false)}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant={isPreview ? "default" : "outline"}
          size="sm"
          onClick={() => setIsPreview(true)}
        >
          Preview
        </Button>
        <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
          Supports markdown formatting
        </div>
      </div>
      
      {!isPreview ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-48 font-mono text-sm"
          rows={12}
        />
      ) : (
        <div className="min-h-48 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          {value.trim() ? (
            <MarkdownRenderer content={value} />
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No content to preview
            </p>
          )}
        </div>
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <details>
          <summary className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
            Markdown help
          </summary>
          <div className="mt-2 space-y-1">
            <div><code># Header 1</code> → Large heading</div>
            <div><code>## Header 2</code> → Medium heading</div>
            <div><code>**bold**</code> → <strong>bold text</strong></div>
            <div><code>*italic*</code> → <em>italic text</em></div>
            <div><code>`code`</code> → <code>inline code</code></div>
            <div><code>- Item</code> → Bullet point</div>
            <div><code>[Link](url)</code> → Clickable link</div>
            <div><code>![Alt](image-url)</code> → Image</div>
          </div>
        </details>
      </div>
    </div>
  );
}
