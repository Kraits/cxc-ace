'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, scaleIn, fadeIn } from '@/app/lib/store';
import { AlertTriangle } from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setUserId, setUser, setRoute } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'register',
          name: !isLogin ? name : undefined,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      setUserId(data.user.id);
      setUser(data.user);
      setRoute('#home');
      toast({ title: isLogin ? 'Welcome back!' : 'Account created!', description: `Hello, ${data.user.name}!` });
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <motion.div {...scaleIn} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div
            className="text-5xl mb-3 inline-block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🎓
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
            CXC Ace
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Your Caribbean Exam Prep Companion</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
            <CardDescription className="text-center">
              {isLogin ? 'Sign in to continue studying' : 'Join thousands of Caribbean students'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="student@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              </div>

              {error && (
                <motion.div {...fadeIn} className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600" disabled={loading}>
                {loading ? (
                  <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                ) : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium">
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
