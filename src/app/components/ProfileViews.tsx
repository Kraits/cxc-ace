'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  useStore, LoadingSpinner, fadeIn, SUBJECT_ICONS,
  type ExamCountdown, type SBATemplate,
} from '@/app/lib/store';
import {
  Calendar, Plus, Trash2, FileText, ChevronDown,
  BookMarked, ShoppingBag, Shield, Coins, Flame,
  Download, ChevronRight, LogOut, Moon, Sun, HelpCircle,
} from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

function ExamCountdownsView() {
  const { user, subjects } = useStore();
  const { toast } = useToast();
  const [countdowns, setCountdowns] = useState<ExamCountdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examSubjectId, setExamSubjectId] = useState('');

  const loadCountdowns = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/exams?userId=${user.id}`);
      if (res.ok) setCountdowns(await res.json().then(d => d.countdowns || []));
      setLoading(false);
    } catch { setLoading(false); }
  }, [user?.id]);

  useEffect(() => { loadCountdowns(); }, [loadCountdowns]);

  const addCountdown = async () => {
    if (!user?.id || !examName.trim() || !examDate) return;
    try {
      await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, examName, examDate, subjectId: examSubjectId || undefined }),
      });
      toast({ title: 'Countdown added!' });
      setShowAdd(false); setExamName(''); setExamDate(''); setExamSubjectId('');
      loadCountdowns();
    } catch (e) { console.error(e); }
  };

  const deleteCountdown = async (id: string) => {
    if (!user?.id) return;
    try {
      await fetch(`/api/exams?id=${id}&userId=${user.id}`, { method: 'DELETE' });
      toast({ title: 'Countdown removed' });
      loadCountdowns();
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-red-500" /> Exam Countdowns
        </h2>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Exam Countdown</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Exam Name</Label>
              <Input value={examName} onChange={e => setExamName(e.target.value)} placeholder="e.g. CSEC Mathematics Paper 2" />
            </div>
            <div>
              <Label>Exam Date</Label>
              <Input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
            </div>
            <div>
              <Label>Subject (optional)</Label>
              <Select value={examSubjectId} onValueChange={setExamSubjectId}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addCountdown} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={!examName.trim() || !examDate}>
              Add Countdown
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {countdowns.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No exam countdowns yet.</p>
          <p className="text-xs mt-1">Add your upcoming exams to track preparation time.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {countdowns.map(c => (
            <motion.div key={c.id} {...fadeIn}>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 ${
                    c.isPast ? 'bg-gray-100 text-gray-400 dark:bg-gray-800' :
                    c.daysRemaining < 7 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                    c.daysRemaining < 30 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {c.isPast ? '✓' : c.daysRemaining}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{c.examName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {c.subject?.name || 'General'} · {new Date(c.examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {c.isPast ? 'Completed' : `${c.daysRemaining} days remaining`}
                    </p>
                  </div>
                  {!c.isPast && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteCountdown(c.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
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

function SBATemplatesView() {
  const { subjects } = useStore();
  const [templates, setTemplates] = useState<SBATemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  useEffect(() => {
    const params = selectedSubject ? `?subjectId=${selectedSubject}` : '';
    fetch(`/api/sba${params}`)
      .then(r => r.json())
      .then(d => { setTemplates(d.templates || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [selectedSubject]);

  if (loading) return <LoadingSpinner />;

  const parseStructure = (str: string) => {
    try { return JSON.parse(str); }
    catch { return null; }
  };

  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <FileText className="w-5 h-5 text-emerald-600" /> SBA Templates
      </h2>

      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
        <SelectTrigger><SelectValue placeholder="All subjects" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="">All subjects</SelectItem>
          {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
        </SelectContent>
      </Select>

      {templates.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No SBA templates available yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {templates.map(tmpl => {
            const structure = parseStructure(tmpl.structure);
            const isExpanded = expandedTemplate === tmpl.id;
            return (
              <motion.div key={tmpl.id} {...fadeIn}>
                <Card className="overflow-hidden">
                  <button
                    className="w-full p-4 text-left flex items-center gap-3"
                    onClick={() => setExpandedTemplate(isExpanded ? null : tmpl.id)}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: tmpl.subject.color + '20' }}>
                      {SUBJECT_ICONS[tmpl.subject.name] || '📚'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{tmpl.title}</h4>
                      <p className="text-xs text-muted-foreground">{tmpl.subject.name}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {isExpanded && (
                    <motion.div {...fadeIn} className="px-4 pb-4 border-t">
                      {tmpl.description && <p className="text-sm mt-3 text-muted-foreground">{tmpl.description}</p>}
                      {structure && typeof structure === 'object' && (
                        <div className="mt-3 space-y-2">
                          {Object.entries(structure).map(([key, value]) => (
                            <div key={key} className="bg-muted rounded-lg p-3">
                              <p className="font-medium text-sm capitalize">{key.replace(/_/g, ' ')}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      {typeof structure === 'string' && (
                        <pre className="mt-3 text-xs bg-muted rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
                          {structure}
                        </pre>
                      )}
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProfileView() {
  const { user, setRoute, logout } = useStore();
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();

  const handleExport = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/export?userId=${user.id}`);
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cxc-ace-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'Data exported!' });
    } catch (e) { console.error(e); }
  };

  const menuItems = [
    { icon: BookMarked, label: 'Bookmarks', route: '#bookmarks', color: 'text-yellow-500' },
    { icon: ShoppingBag, label: 'Shop', route: '#shop', color: 'text-amber-500' },
    { icon: Calendar, label: 'Exam Countdowns', route: '#exams', color: 'text-red-500' },
    { icon: FileText, label: 'SBA Templates', route: '#sba', color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-6 pb-4">
      {/* Profile Header */}
      <motion.div {...fadeIn}>
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-emerald-300">
              <AvatarFallback className="bg-emerald-600 text-white text-2xl">
                {user?.name?.charAt(0)?.toUpperCase() || 'S'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              {user?.bio && <p className="text-xs text-muted-foreground mt-1">{user.bio}</p>}
              <div className="flex items-center gap-3 mt-2 text-sm">
                <Badge variant="secondary" className="gap-1"><Shield className="w-3 h-3" /> Level {Math.floor(Math.sqrt((useStore.getState().stats?.totalQuestions || 0) / 5)) + 1}</Badge>
                <Badge variant="secondary" className="gap-1"><Coins className="w-3 h-3" /> {user?.coins}</Badge>
                <Badge variant="secondary" className="gap-1"><Flame className="w-3 h-3" /> {user?.currentStreak}</Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Menu */}
      <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map(item => (
            <motion.button key={item.route} whileTap={{ scale: 0.97 }} onClick={() => setRoute(item.route)}>
              <Card className="p-4 hover:shadow-md transition-shadow h-full">
                <item.icon className={`w-6 h-6 mb-2 ${item.color}`} />
                <p className="font-semibold text-sm">{item.label}</p>
              </Card>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
        <h3 className="font-semibold text-lg mb-3">Settings</h3>
        <Card className="divide-y">
          {/* Dark Mode */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle theme preference</p>
              </div>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
          </div>

          {/* Export Data */}
          <button className="p-4 flex items-center justify-between w-full text-left hover:bg-muted/50 transition-colors" onClick={handleExport}>
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm font-medium">Export Data</p>
                <p className="text-xs text-muted-foreground">Download all your progress</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* About */}
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm font-medium">About CXC Ace</p>
            </div>
            <p className="text-xs text-muted-foreground ml-8">
              Your Caribbean exam prep companion for CSEC and CAPE students.
              Study smarter with AI-powered tutoring, flashcards, quizzes, and progress tracking.
            </p>
            <p className="text-xs text-muted-foreground ml-8 mt-1">Version 1.0.0</p>
          </div>
        </Card>
      </motion.div>

      {/* Logout */}
      <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
        <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </motion.div>
    </div>
  );
}

export { ExamCountdownsView, SBATemplatesView, ProfileView };
