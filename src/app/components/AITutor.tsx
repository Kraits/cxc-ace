'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore, SUBJECT_ICONS, type TutorMessage } from '@/app/lib/store';
import { Send } from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function AITutor() {
  const { user, subjects } = useStore();
  const { toast } = useToast();
  const [messages, setMessages] = useState<TutorMessage[]>([
    { role: 'assistant', content: "Hello! 👋 I'm your CXC tutor. Ask me anything about your subjects, and I'll help you understand concepts, solve problems, and prepare for exams. What would you like to study today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const chatMessages = [...messages, { role: 'user', content: userMsg }];
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatMessages.slice(1),
          subject: subjects.find(s => s.id === selectedSubject)?.name || undefined,
          topic: selectedTopic || undefined,
        }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please check your connection and try again.' }]);
    }
    setLoading(false);
  };

  const quickQuestions = [
    "Explain the Pythagorean theorem with an example",
    "What are the main causes of climate change in the Caribbean?",
    "How do I write a good persuasive essay?",
    "Explain photosynthesis in simple terms",
  ];

  const currentSubject = subjects.find(s => s.id === selectedSubject);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Subject/Topic Selector */}
      <div className="flex gap-2 p-3 pb-0 flex-shrink-0">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="flex-1 h-9 text-xs">
            <SelectValue placeholder="Subject context" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(s => <SelectItem key={s.id} value={s.id}>{SUBJECT_ICONS[s.name]} {s.name}</SelectItem>)}
          </SelectContent>
        </Select>
        {currentSubject && (
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="flex-1 h-9 text-xs">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {currentSubject.topics.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'bg-emerald-600 text-white rounded-br-md'
                : 'bg-muted rounded-bl-md'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-muted-foreground/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="flex gap-2 px-3 overflow-x-auto pb-2 flex-shrink-0">
          {quickQuestions.map((q, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { setInput(q); }}
              className="shrink-0 text-xs bg-muted hover:bg-emerald-50 dark:hover:bg-emerald-950/30 px-3 py-1.5 rounded-full transition-colors"
            >
              {q}
            </motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 flex gap-2 flex-shrink-0">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="Ask your tutor..."
          disabled={loading}
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={!input.trim() || loading} size="icon" className="bg-emerald-600 hover:bg-emerald-700 shrink-0">
          {loading ? (
            <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
