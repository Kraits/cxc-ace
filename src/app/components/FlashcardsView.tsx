'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useStore, LoadingSpinner, fadeIn, scaleIn, SUBJECT_ICONS,
  type Deck,
} from '@/app/lib/store';
import { ArrowLeft, Layers, Clock, Plus, ChevronRight, Play } from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function FlashcardsView() {
  const { user, subjects } = useStore();
  const { toast } = useToast();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSubjectId, setNewSubjectId] = useState('');
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewCards, setReviewCards] = useState<Array<{ id: string; front: string; back: string; deck?: { id: string; title: string; subject?: { name: string; color: string } } }>>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [dueCount, setDueCount] = useState(0);

  const loadDecks = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/flashcards?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setDecks(data.decks || []);
      }
      const dueRes = await fetch(`/api/flashcards?userId=${user.id}&view=due`);
      if (dueRes.ok) {
        const dueData = await dueRes.json();
        setDueCount(dueData.dueCount || 0);
      }
      setLoading(false);
    } catch { setLoading(false); }
  }, [user?.id]);

  useEffect(() => { loadDecks(); }, [loadDecks]);

  const createDeck = async () => {
    if (!user?.id || !newTitle.trim()) return;
    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'createDeck', userId: user.id, title: newTitle, description: newDesc, subjectId: newSubjectId || undefined }),
      });
      setShowCreate(false);
      setNewTitle('');
      setNewDesc('');
      setNewSubjectId('');
      toast({ title: 'Deck created!' });
      loadDecks();
    } catch (e) { console.error(e); }
  };

  const addCard = async () => {
    if (!activeDeck || !cardFront.trim() || !cardBack.trim()) return;
    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addCard', deckId: activeDeck.id, front: cardFront, back: cardBack }),
      });
      setAddCardOpen(false);
      setCardFront('');
      setCardBack('');
      toast({ title: 'Card added!' });
      loadDecks();
    } catch (e) { console.error(e); }
  };

  const startReview = async (deck?: Deck) => {
    if (!user?.id) return;
    try {
      if (deck) {
        const res = await fetch(`/api/flashcards?userId=${user.id}`);
        const data = await res.json();
        const d = data.decks?.find((dk: Deck) => dk.id === deck.id);
        if (d && d.cards && d.cards.length > 0) {
          setReviewCards(d.cards.map(c => ({ ...c, deck: { title: deck.title, subject: deck.subject as { name: string; color: string } } })));
          setReviewMode(true);
          setCurrentCard(0);
          setFlipped(false);
          return;
        }
      }
      // Due cards review
      const res = await fetch(`/api/flashcards?userId=${user.id}&view=due`);
      const data = await res.json();
      if (data.dueCards && data.dueCards.length > 0) {
        setReviewCards(data.dueCards);
        setReviewMode(true);
        setCurrentCard(0);
        setFlipped(false);
      } else {
        toast({ title: 'No cards to review!', description: 'All caught up! 🎉' });
      }
    } catch (e) { console.error(e); }
  };

  const rateCard = async (quality: number) => {
    if (!user?.id || !reviewCards[currentCard]) return;
    const card = reviewCards[currentCard];
    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'review', userId: user.id, deckId: card.deck?.id || activeDeck?.id || '', cardId: card.id, quality }),
      });
      if (currentCard < reviewCards.length - 1) {
        setCurrentCard(c => c + 1);
        setFlipped(false);
      } else {
        setReviewMode(false);
        toast({ title: 'Review complete! Great job! 🎉' });
        loadDecks();
      }
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner />;

  // Review Mode
  if (reviewMode && reviewCards.length > 0) {
    const card = reviewCards[currentCard];
    return (
      <div className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setReviewMode(false)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Exit
          </Button>
          <Badge variant="secondary">{currentCard + 1}/{reviewCards.length}</Badge>
        </div>
        <Progress value={((currentCard + 1) / reviewCards.length) * 100} className="h-2" />

        <AnimatePresence mode="wait">
          <motion.div key={currentCard} {...scaleIn}>
            <motion.div
              className="min-h-[280px] rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 flex items-center justify-center p-6 cursor-pointer"
              onClick={() => setFlipped(!flipped)}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`text-center ${flipped ? 'hidden' : ''}`}>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Front</p>
                <p className="text-lg font-medium">{card.front}</p>
              </div>
              <div className={`text-center absolute ${flipped ? '' : 'hidden'}`} style={{ transform: 'rotateY(180deg)' }}>
                <p className="text-xs text-emerald-600 mb-2 uppercase tracking-wider">Back</p>
                <p className="text-lg font-medium">{card.back}</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-sm text-muted-foreground">Tap the card to flip</p>

        {flipped && (
          <motion.div {...fadeIn} className="space-y-2">
            <p className="text-center text-xs text-muted-foreground mb-2">How well did you know this?</p>
            <div className="grid grid-cols-5 gap-2">
              {[
                { q: 1, label: '💀', color: 'bg-red-500 hover:bg-red-600' },
                { q: 2, label: '😟', color: 'bg-orange-500 hover:bg-orange-600' },
                { q: 3, label: '🤔', color: 'bg-yellow-500 hover:bg-yellow-600' },
                { q: 4, label: '😊', color: 'bg-lime-500 hover:bg-lime-600' },
                { q: 5, label: '🤩', color: 'bg-emerald-500 hover:bg-emerald-600' },
              ].map(btn => (
                <Button key={btn.q} className={`${btn.color} text-white py-4 text-lg`} onClick={() => rateCard(btn.q)}>
                  {btn.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Deck Detail
  if (activeDeck) {
    return (
      <div className="space-y-4 pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setActiveDeck(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold">{activeDeck.title}</h2>
            <p className="text-xs text-muted-foreground">{activeDeck.cardCount} cards</p>
          </div>
        </div>

        {activeDeck.cards && activeDeck.cards.length > 0 && (
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => startReview(activeDeck)}>
            <Play className="w-4 h-4 mr-2" /> Review Cards ({activeDeck.cards.length})
          </Button>
        )}

        <Dialog open={addCardOpen} onOpenChange={setAddCardOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Card</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Card</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Front (Question)</Label>
                <Textarea value={cardFront} onChange={e => setCardFront(e.target.value)} placeholder="What is...?" />
              </div>
              <div>
                <Label>Back (Answer)</Label>
                <Textarea value={cardBack} onChange={e => setCardBack(e.target.value)} placeholder="The answer is..." />
              </div>
              <Button onClick={addCard} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={!cardFront.trim() || !cardBack.trim()}>
                Add Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {activeDeck.cards && activeDeck.cards.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Cards</h3>
            {activeDeck.cards.map(card => (
              <Card key={card.id} className="p-3">
                <p className="text-sm font-medium">{card.front}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.back}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Deck List
  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" /> Flashcards
        </h2>
        {dueCount > 0 && (
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600" onClick={() => startReview()}>
            <Clock className="w-4 h-4 mr-1" /> {dueCount} Due
          </Button>
        )}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogTrigger asChild>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" /> Create New Deck
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Deck</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Biology Chapter 1" />
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Brief description" />
            </div>
            <div>
              <Label>Subject (optional)</Label>
              <Select value={newSubjectId} onValueChange={setNewSubjectId}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={createDeck} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={!newTitle.trim()}>
              Create Deck
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {decks.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No decks yet. Create your first deck!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {decks.map(deck => (
            <motion.div key={deck.id} {...fadeIn} whileTap={{ scale: 0.98 }}>
              <Card
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => { setActiveDeck(deck); loadDecks(); }}
              >
                <div className="flex items-center gap-3">
                  {deck.subject ? (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: deck.subject.color + '20' }}>
                      {SUBJECT_ICONS[deck.subject.name] || '📚'}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-emerald-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{deck.title}</h4>
                    <p className="text-xs text-muted-foreground">{deck.cardCount} cards · {deck.subject?.name || 'General'}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
