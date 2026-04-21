'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, LoadingSpinner } from '@/app/lib/store';
import { HomeIcon, BookOpen, Brain, BarChart3, User } from '@/app/lib/icons';
import AuthScreen from '@/app/components/AuthScreen';
import HomeDashboard from '@/app/components/HomeDashboard';
import { SubjectSelection, QuizConfig, QuizTaking } from '@/app/components/QuizViews';
import { RealExamSelection, RealExamTaking } from '@/app/components/RealExamView';
import { StudyHub } from '@/app/components/StudyViews';
import { ProgressHub } from '@/app/components/ProgressViews';
import { ShopView } from '@/app/components/SocialViews';
import { ExamCountdownsView, SBATemplatesView, ProfileView } from '@/app/components/ProfileViews';

export default function Home() {
  const { userId, route, setRoute, fetchSubjects, setLoading, isLoading } = useStore();

  useEffect(() => {
    const init = async () => {
      await fetchSubjects();
      if (userId) {
        try {
          const res = await fetch(`/api/auth?userId=${userId}`);
          if (res.ok) {
            const data = await res.json();
            useStore.getState().setUser(data.user);
          } else {
            // User not found, clear localStorage
            localStorage.removeItem('cxc-ace-userId');
            useStore.getState().setUserId(''); // trigger re-render
          }
        } catch (e) { console.error(e); }
      }
      setLoading(false);
    };
    init();
  }, []);

  // Hash change listener
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '#home';
      if (hash !== route) setRoute(hash);
    };
    window.addEventListener('hashchange', handleHash);
    // Set initial route from hash
    if (window.location.hash) {
      setRoute(window.location.hash);
    }
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = useCallback((newRoute: string) => {
    window.location.hash = newRoute;
    setRoute(newRoute);
  }, []);

  // Loading screen
  if (isLoading && userId) {
    return <LoadingSpinner text="Loading your data..." />;
  }

  // Not logged in
  if (!userId) {
    return <AuthScreen />;
  }

  // Determine which view to show
  const getView = () => {
    // Quiz routes
    if (route === '#subjects') return <SubjectSelection />;
    if (route.startsWith('#quiz-config-')) {
      const subjectId = route.replace('#quiz-config-', '');
      return <QuizConfig subjectId={subjectId} />;
    }
    if (route.startsWith('#quiz-taking-')) {
      const configStr = route.replace('#quiz-taking-', '');
      return <QuizTaking configStr={configStr} />;
    }
    if (route.startsWith('#quiz-') && route !== '#quiz') {
      // Subject quick-start from home
      const subjectId = route.replace('#quiz-', '');
      if (subjectId.length > 10) return <QuizConfig subjectId={subjectId} />;
    }

    // Real Exam routes
    if (route === '#real-exam') return <RealExamSelection />;
    if (route.startsWith('#real-exam-taking-')) {
      const configStr = route.replace('#real-exam-taking-', '');
      return <RealExamTaking configStr={configStr} />;
    }

    // Study sub-routes (shown inside StudyHub tabs)
    if (route.startsWith('#tutor') || route.startsWith('#notes') || route.startsWith('#timer') || route.startsWith('#flashcard')) {
      return <StudyHub />;
    }

    // Profile sub-routes
    if (route === '#bookmarks') return <ProgressHub />;
    if (route === '#shop') return <ShopView />;
    if (route === '#exams') return <ExamCountdownsView />;
    if (route === '#sba') return <SBATemplatesView />;
    if (route === '#settings') return <ProfileView />;

    // Main tabs
    if (route === '#home') return <HomeDashboard />;
    if (route === '#quiz') return <SubjectSelection />;
    if (route === '#study') return <StudyHub />;
    if (route === '#progress') return <ProgressHub />;
    if (route === '#profile') return <ProfileView />;

    return <HomeDashboard />;
  };

  // Determine active bottom tab
  const getActiveTab = () => {
    if (route === '#home' || route === '#' || route === '') return 'home';
    if (route.startsWith('#quiz') || route.startsWith('#subjects') || route.startsWith('#real-exam')) return 'quiz';
    if (route.startsWith('#study') || route.startsWith('#tutor') || route.startsWith('#notes') || route.startsWith('#timer') || route.startsWith('#flashcard')) return 'study';
    if (route.startsWith('#progress') || route.startsWith('#bookmarks') || route.startsWith('#leaderboard') || route.startsWith('#analytics')) return 'progress';
    return 'profile';
  };

  const activeTab = getActiveTab();

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home', route: '#home' },
    { id: 'quiz', icon: BookOpen, label: 'Quiz', route: '#quiz' },
    { id: 'study', icon: Brain, label: 'Study', route: '#study' },
    { id: 'progress', icon: BarChart3, label: 'Progress', route: '#progress' },
    { id: 'profile', icon: User, label: 'Profile', route: '#profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-4 pb-20 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {getView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t z-50">
        <div className="max-w-lg mx-auto flex">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.route)}
                className={`flex-1 flex flex-col items-center py-2 pt-3 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="tabIndicator"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-1 bg-emerald-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <tab.icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : ''}`} />
                </motion.div>
                <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
        {/* Safe area padding for iOS */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}
