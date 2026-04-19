'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  useStore, LoadingSpinner, fadeIn, NOTE_COLORS, type Note,
} from '@/app/lib/store';
import { StickyNote, Plus, Pin, Share2, Edit3, Trash2 } from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function NotesView() {
  const { user, subjects } = useStore();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [sharedNotes, setSharedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShared, setShowShared] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteColor, setNoteColor] = useState('#ffffff');
  const [noteSubjectId, setNoteSubjectId] = useState('');
  const [noteIsShared, setNoteIsShared] = useState(false);
  const [noteIsPinned, setNoteIsPinned] = useState(false);

  const loadNotes = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/notes?userId=${user.id}`);
      if (res.ok) setNotes(await res.json().then(d => d.notes || []));
      const sharedRes = await fetch('/api/notes?view=shared');
      if (sharedRes.ok) setSharedNotes(await sharedRes.json().then(d => d.notes || []));
      setLoading(false);
    } catch { setLoading(false); }
  }, [user?.id]);

  useEffect(() => { loadNotes(); }, [loadNotes]);

  const openCreate = () => {
    setTitle(''); setContent(''); setNoteColor('#ffffff'); setNoteSubjectId('');
    setNoteIsShared(false); setNoteIsPinned(false); setEditingNote(null);
    setShowCreate(true);
  };

  const openEdit = (note: Note) => {
    setTitle(note.title); setContent(note.content); setNoteColor(note.color);
    setNoteSubjectId(note.subjectId || ''); setNoteIsShared(note.isShared);
    setNoteIsPinned(note.isPinned); setEditingNote(note);
    setShowCreate(true);
  };

  const saveNote = async () => {
    if (!user?.id || !title.trim()) return;
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingNote ? { id: editingNote.id } : {}),
          userId: user.id, title, content, color: noteColor,
          subjectId: noteSubjectId || undefined,
          isShared: noteIsShared, isPinned: noteIsPinned,
        }),
      });
      toast({ title: editingNote ? 'Note updated!' : 'Note created!' });
      setShowCreate(false);
      loadNotes();
    } catch (e) { console.error(e); }
  };

  const deleteNote = async (noteId: string) => {
    if (!user?.id) return;
    try {
      await fetch(`/api/notes?id=${noteId}&userId=${user.id}`, { method: 'DELETE' });
      toast({ title: 'Note deleted' });
      loadNotes();
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner />;

  const displayNotes = showShared ? sharedNotes : notes;

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-emerald-600" /> Notes
        </h2>
        {!showShared && (
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={openCreate}>
            <Plus className="w-4 h-4 mr-1" /> New
          </Button>
        )}
      </div>

      <Tabs value={showShared ? 'shared' : 'mine'} onValueChange={v => setShowShared(v === 'shared')}>
        <TabsList className="w-full">
          <TabsTrigger value="mine" className="flex-1">My Notes</TabsTrigger>
          <TabsTrigger value="shared" className="flex-1">Community</TabsTrigger>
        </TabsList>
      </Tabs>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingNote ? 'Edit Note' : 'New Note'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your note..." rows={8} />
            </div>
            <div>
              <Label>Subject</Label>
              <Select value={noteSubjectId} onValueChange={setNoteSubjectId}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Color</Label>
              <div className="flex gap-2 flex-wrap mt-1">
                {NOTE_COLORS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setNoteColor(c.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${noteColor === c.value ? 'border-emerald-500 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={noteIsPinned} onCheckedChange={setNoteIsPinned} />
                <Label className="text-xs">Pin</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={noteIsShared} onCheckedChange={setNoteIsShared} />
                <Label className="text-xs">Share</Label>
              </div>
            </div>
            <Button onClick={saveNote} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={!title.trim()}>
              {editingNote ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {displayNotes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>{showShared ? 'No shared notes yet' : 'No notes yet. Create your first note!'}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {displayNotes.map(note => (
            <motion.div key={note.id} {...fadeIn}>
              <Card
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                style={{ backgroundColor: showShared ? undefined : note.color === '#ffffff' ? undefined : note.color }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1" onClick={() => !showShared && openEdit(note)}>
                    <div className="flex items-center gap-2 mb-1">
                      {note.isPinned && <Pin className="w-3 h-3 text-amber-500" />}
                      {note.isShared && <Share2 className="w-3 h-3 text-emerald-500" />}
                      {note.subject && (
                        <Badge variant="outline" className="text-xs py-0">{note.subject.code}</Badge>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm">{note.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{note.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {showShared && note.user?.name && `By ${note.user.name} · `}
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {!showShared && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(note)}>
                        <Edit3 className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
