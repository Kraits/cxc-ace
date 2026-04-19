'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore, LoadingSpinner, fadeIn, scaleIn, type LeaderboardEntry, type ShopItem } from '@/app/lib/store';
import { Trophy, Crown, Coins, Check, ShoppingBag } from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export function LeaderboardView() {
  const { userId } = useStore();
  const [period, setPeriod] = useState<'weekly' | 'allTime'>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/leaderboard?period=${period}`)
      .then(r => r.json())
      .then(d => { setEntries(d.entries || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [period]);

  if (loading) return <LoadingSpinner />;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard
      </h2>

      <Tabs value={period} onValueChange={(v) => setPeriod(v as 'weekly' | 'allTime')}>
        <TabsList className="w-full">
          <TabsTrigger value="weekly" className="flex-1">This Week</TabsTrigger>
          <TabsTrigger value="allTime" className="flex-1">All Time</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Top 3 */}
      {entries.length >= 3 && (
        <div className="flex justify-center items-end gap-3 py-4">
          {/* 2nd */}
          <motion.div {...scaleIn} transition={{ delay: 0.1 }} className="text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-lg font-bold mx-auto">
              {entries[1].user.name.charAt(0)}
            </div>
            <p className="text-xs font-medium mt-1 truncate max-w-16">{entries[1].user.name}</p>
            <p className="text-xs text-muted-foreground">{entries[1].score}</p>
            <p className="text-lg">🥈</p>
          </motion.div>
          {/* 1st */}
          <motion.div {...scaleIn} className="text-center -mt-4">
            <Crown className="w-6 h-6 text-yellow-500 mx-auto" />
            <div className="w-18 h-18 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center text-2xl font-bold mx-auto w-[72px] h-[72px]">
              {entries[0].user.name.charAt(0)}
            </div>
            <p className="text-xs font-bold mt-1 truncate max-w-20">{entries[0].user.name}</p>
            <p className="text-xs text-muted-foreground">{entries[0].score}</p>
            <p className="text-lg">🥇</p>
          </motion.div>
          {/* 3rd */}
          <motion.div {...scaleIn} transition={{ delay: 0.2 }} className="text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-lg font-bold mx-auto">
              {entries[2].user.name.charAt(0)}
            </div>
            <p className="text-xs font-medium mt-1 truncate max-w-16">{entries[2].user.name}</p>
            <p className="text-xs text-muted-foreground">{entries[2].score}</p>
            <p className="text-lg">🥉</p>
          </motion.div>
        </div>
      )}

      {/* Rest of entries */}
      <div className="space-y-2">
        {entries.map(entry => {
          const isCurrentUser = entry.user.id === userId;
          return (
            <motion.div key={entry.user.id} {...fadeIn}>
              <Card className={`p-3 flex items-center gap-3 ${isCurrentUser ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : ''}`}>
                <span className="text-sm font-bold w-8 text-center">{getRankIcon(entry.rank)}</span>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={isCurrentUser ? 'bg-emerald-600 text-white text-xs' : 'text-xs'}>
                    {entry.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{entry.user.name} {isCurrentUser && <span className="text-xs text-emerald-600">(You)</span>}</p>
                  <p className="text-xs text-muted-foreground">{entry.user.currentStreak} day streak</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{entry.score}</p>
                  <p className="text-xs text-muted-foreground">coins</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No leaderboard entries yet. Be the first!</p>
        </div>
      )}
    </div>
  );
}

export function ShopView() {
  const { user, refreshUser } = useStore();
  const { toast } = useToast();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/shop?userId=${user?.id || ''}`)
      .then(r => r.json())
      .then(d => { setItems(d.items || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user?.id]);

  const purchase = async (itemId: string) => {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, shopItemId: itemId }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: 'Error', description: data.error, variant: 'destructive' });
        return;
      }
      toast({ title: 'Purchased! 🎉', description: data.message });
      setItems(prev => prev.map(item => item.id === itemId ? { ...item, owned: true } : item));
      refreshUser();
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner />;

  const typeIcons: Record<string, string> = {
    avatar: '🎭', theme: '🎨', boost: '⚡', badge: '🏅', streak_freeze: '❄️', hint_pack: '💡',
  };

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-amber-500" /> Shop
        </h2>
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 gap-1">
          <Coins className="w-3 h-3" /> {user?.coins || 0}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-4 text-center h-full flex flex-col justify-between">
              <div>
                <p className="text-3xl mb-2">{typeIcons[item.type] || '🎁'}</p>
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
              </div>
              <div className="mt-3">
                {item.owned ? (
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 w-full justify-center">
                    <Check className="w-3 h-3 mr-1" /> Owned
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => purchase(item.id)}
                    disabled={(user?.coins || 0) < item.price}
                  >
                    <Coins className="w-3 h-3 mr-1" /> {item.price}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
