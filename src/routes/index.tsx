import { createFileRoute, Link } from '@tanstack/react-router'
import { getCurrentSession } from '#/server/function/session'
import { useState } from 'react';

export const Route = createFileRoute('/')({
  loader: async () => {
    const session = await getCurrentSession()
    return session
  },
  component: Home 
})

function Home() {
  const [activeTab, setActiveTab] = useState<'velocity' | 'database' | 'taxonomy'>('velocity');
  const [previewMode, setPreviewMode] = useState<'KANBAN' | 'TABLE'>('KANBAN');

  const session = Route.useLoaderData()

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary">
      {/* Top Navigation */}
      <header className="sticky top-0 inset-x-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-variant z-50 flex items-center justify-between px-6 sm:px-10 shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-space-md">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              alt="StudioFlow Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1WBIu3wMl0Tb_Gch_QF0K2kZI8kKFOT7N_MXANEbFbPAEn8sA0iv4RYh3Y2WkPXPC6aZacshBS-bUA92_6wphnVzErNuylJgyhH8cdrUlbQrW0Sx9t-aUVEAdK9Z2SMsD5m9PFsdw-PKp4oI9fCB2PBRNyX9go1Zl0v2XSCSd3_fwaSk3yN-L1qFLR1PwtIGMKrwLjTb9c8BJyQoFegEaJzbp6PGctGnQREX0H8pd7xTqswxD3tRpH7Y4n2" 
            />
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface">StudioFlow</span>
              <span className="text-outline-variant font-label-xs text-label-xs">/</span>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-xs text-label-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>Editorial Engine</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full border border-surface-variant/80">
          <Link 
            to="/overview" 
            className="px-3.5 py-1.5 rounded-full text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors"
          >
            Velocity
          </Link>
          <Link 
            to="/content" 
            className="px-3.5 py-1.5 rounded-full text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors"
          >
            Content Database
          </Link>
          <Link 
            to="/categories" 
            className="px-3.5 py-1.5 rounded-full text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors"
          >
            Categories
          </Link>
        </nav>

        {/* Right Action Buttons - No user data */}
        <div className="flex items-center gap-3">
          { session ? (
            <Link
              to="/overview"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-all active:scale-[0.99]"
            >
              <span>Open Studio</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          ) : (
            <Link 
              to="/login"
              className="px-3.5 py-1.5 rounded-lg text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              Sign In
            </Link>
          ) }
          
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full max-w-6xl mx-auto px-6 pt-14 pb-12 sm:pt-20 sm:pb-16 flex flex-col items-center text-center">
          {/* Release / Version Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-surface-variant/80 shadow-xs mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Studio Engine v2.4 • System Nominal
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-label-xs text-label-xs text-outline">Deterministic Workflow</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight max-w-3xl sm:text-[44px] sm:leading-[52px]">
            The High-Output Command Center for Solo Media Creators
          </h1>

          {/* Subtitle */}
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
            Eliminate cognitive fragmentation. StudioFlow orchestrates your entire editorial pipeline—from initial thesis capture to multi-platform publishing cadence.
          </p>

          {/* Call to Actions */}
          <div className="flex items-center gap-3.5 mt-8 flex-wrap justify-center">
            <Link
              to="/overview"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md shadow-md shadow-primary/20 hover:bg-primary hover:shadow-lg transition-all active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Launch Studio Command</span>
            </Link>
            <Link
              to="/content"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface border border-surface-variant font-label-md text-label-md shadow-sm hover:bg-surface-container-low transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">database</span>
              <span>Explore Content Catalog</span>
            </Link>
          </div>

          {/* Architectural Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 w-full max-w-4xl">
            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-variant/80 shadow-xs text-left">
              <span className="material-symbols-outlined text-primary text-[20px] mb-1 block">speed</span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Weekly Velocity</span>
              <span className="font-body-sm text-body-sm text-outline mt-0.5 block">Measure output tempo & release deadlines</span>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-variant/80 shadow-xs text-left">
              <span className="material-symbols-outlined text-secondary text-[20px] mb-1 block">table_chart</span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Dual Catalog</span>
              <span className="font-body-sm text-body-sm text-outline mt-0.5 block">Switch Kanban and Table instantly</span>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-variant/80 shadow-xs text-left">
              <span className="material-symbols-outlined text-amber-600 text-[20px] mb-1 block">category</span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Custom Taxonomy</span>
              <span className="font-body-sm text-body-sm text-outline mt-0.5 block">Tag, color code, and group publications</span>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-surface-variant/80 shadow-xs text-left">
              <span className="material-symbols-outlined text-purple-600 text-[20px] mb-1 block">lock_reset</span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Local Isolation</span>
              <span className="font-body-sm text-body-sm text-outline mt-0.5 block">Zero tracking, zero cognitive clutter</span>
            </div>
          </div>
        </section>

        {/* Live Interactive Workspace Preview */}
        <section className="w-full max-w-6xl mx-auto px-6 pb-20">
          <div className="rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-xl overflow-hidden flex flex-col">
            {/* Interactive Preview Header */}
            <div className="px-5 py-3.5 bg-surface-container-low border-b border-surface-variant flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                <span className="text-outline-variant ml-2 font-mono text-[12px]">studioflow://workspace/preview</span>
              </div>

              {/* View Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container border border-surface-variant">
                <button
                  onClick={() => setActiveTab('velocity')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-label-xs font-label-xs transition-all ${
                    activeTab === 'velocity'
                      ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">insights</span>
                  <span>1. Velocity Radar</span>
                </button>
                <button
                  onClick={() => setActiveTab('database')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-label-xs font-label-xs transition-all ${
                    activeTab === 'database'
                      ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">view_kanban</span>
                  <span>2. Content Database</span>
                </button>
                <button
                  onClick={() => setActiveTab('taxonomy')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-label-xs font-label-xs transition-all ${
                    activeTab === 'taxonomy'
                      ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">category</span>
                  <span>3. Taxonomy Rules</span>
                </button>
              </div>
            </div>

            {/* Preview Tab 1: Velocity Radar */}
            {activeTab === 'velocity' && (
              <div className="p-6 sm:p-8 flex flex-col gap-6 animate-fade-in">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-surface-variant pb-4">
                  <div>
                    <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider block">Production Velocity</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mt-0.5">
                      Weekly Execution Tempo
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-xs font-label-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      On Target • 4 Scheduled
                    </span>
                    <Link
                      to="/overview"
                      className="px-3 py-1 rounded-lg bg-surface-container text-on-surface font-label-xs text-label-xs hover:bg-surface-container-high transition-colors"
                    >
                      Open Live Dashboard →
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-surface-container-low/70 border border-surface-variant/60">
                    <span className="font-label-xs text-label-xs text-outline uppercase">Scripting Cadence</span>
                    <p className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">2,840 Words</p>
                    <span className="text-[12px] text-emerald-600 font-medium">+18% vs last week</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low/70 border border-surface-variant/60">
                    <span className="font-label-xs text-label-xs text-outline uppercase">Render & Edit Queue</span>
                    <p className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">3 Active Slots</p>
                    <span className="text-[12px] text-secondary font-medium">1 In Final Master Review</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low/70 border border-surface-variant/60">
                    <span className="font-label-xs text-label-xs text-outline uppercase">Platform Distribution</span>
                    <p className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">YouTube & Substack</p>
                    <span className="text-[12px] text-outline font-medium">100% On-Schedule Ratio</span>
                  </div>
                </div>

                {/* Pipeline visual bar */}
                <div className="p-4 rounded-xl bg-surface-container-low/40 border border-surface-variant/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-on-surface font-medium">Sprint Pipeline Stages</span>
                    <span className="font-mono text-label-xs text-outline">10 Assets In Transit</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-surface-container flex overflow-hidden">
                    <div className="bg-primary h-full w-[25%]" title="Scripting: 25%"></div>
                    <div className="bg-amber-500 h-full w-[35%]" title="Recording: 35%"></div>
                    <div className="bg-secondary h-full w-[20%]" title="Editing: 20%"></div>
                    <div className="bg-emerald-500 h-full w-[20%]" title="Published: 20%"></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-outline mt-2">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Scripting</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Recording</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> Editing</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Published</span>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Tab 2: Content Database (Dual Mode) */}
            {activeTab === 'database' && (
              <div className="p-6 sm:p-8 flex flex-col gap-5 animate-fade-in">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-surface-variant pb-4">
                  <div>
                    <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider block">Unified Catalog</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mt-0.5">
                      Multi-Stage Content Pipeline
                    </h3>
                  </div>

                  {/* Toggle Preview View */}
                  <div className="flex items-center gap-2">
                    <div className="inline-flex p-1 rounded-lg bg-surface-container border border-surface-variant">
                      <button
                        onClick={() => setPreviewMode('KANBAN')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-label-xs font-label-xs transition-all ${
                          previewMode === 'KANBAN'
                            ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">view_kanban</span>
                        <span>Kanban</span>
                      </button>
                      <button
                        onClick={() => setPreviewMode('TABLE')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-label-xs font-label-xs transition-all ${
                          previewMode === 'TABLE'
                            ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">table_chart</span>
                        <span>Table</span>
                      </button>
                    </div>
                    <Link
                      to="/content"
                      className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-xs text-label-xs shadow-xs hover:bg-primary transition-colors"
                    >
                      Open Full Database →
                    </Link>
                  </div>
                </div>

                {previewMode === 'KANBAN' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3.5 rounded-xl bg-surface-container-low/70 border border-surface-variant/70 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between text-label-xs font-label-xs font-semibold text-outline">
                        <span>STAGE • SCRIPTING</span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">2</span>
                      </div>
                      <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-variant/80 shadow-xs">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Tech Review
                        </span>
                        <h4 className="font-label-sm text-label-sm font-semibold text-on-surface mt-1.5">
                          M4 Pro MacBook Space Black: 30 Days As A Solo Studio Setup
                        </h4>
                        <span className="text-[11px] text-outline mt-1 block">YouTube Main Channel • In 2 Days</span>
                      </div>
                      <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-variant/80 shadow-xs">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Essay
                        </span>
                        <h4 className="font-label-sm text-label-sm font-semibold text-on-surface mt-1.5">
                          The Architecture of High-Output Solopreneurship
                        </h4>
                        <span className="text-[11px] text-outline mt-1 block">Substack Newsletter • Sunday Dispatch</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface-container-low/70 border border-surface-variant/70 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between text-label-xs font-label-xs font-semibold text-outline">
                        <span>STAGE • RECORDING</span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">2</span>
                      </div>
                      <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-variant/80 shadow-xs">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Productivity
                        </span>
                        <h4 className="font-label-sm text-label-sm font-semibold text-on-surface mt-1.5">
                          Building a Second Brain in Notion 2026: Fast Tagging Pipeline
                        </h4>
                        <span className="text-[11px] text-outline mt-1 block">YouTube Long-form • Studio Booked</span>
                      </div>
                      <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-variant/80 shadow-xs">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                          Deep Dive
                        </span>
                        <h4 className="font-label-sm text-label-sm font-semibold text-on-surface mt-1.5">
                          Reverse Engineering the Sony A7V Color Profile Engine
                        </h4>
                        <span className="text-[11px] text-outline mt-1 block">Hardware Weekly • Benchmark Series</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface-container-low/70 border border-surface-variant/70 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between text-label-xs font-label-xs font-semibold text-outline">
                        <span>STAGE • PUBLISHED</span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">2</span>
                      </div>
                      <div className="p-3 rounded-lg bg-surface-container-lowest border border-surface-variant/80 shadow-xs">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Tech Review
                        </span>
                        <h4 className="font-label-sm text-label-sm font-semibold text-on-surface mt-1.5">
                          Desk Setup Tour: Extreme Ergonomics for 14-Hour Render Cycles
                        </h4>
                        <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Live • 84.2K Views</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-surface-variant">
                    <table className="w-full text-left text-body-sm font-body-sm">
                      <thead className="bg-surface-container-low border-b border-surface-variant font-label-xs text-label-xs text-outline uppercase">
                        <tr>
                          <th className="py-2.5 px-4 font-semibold">Title</th>
                          <th className="py-2.5 px-4 font-semibold">Channel</th>
                          <th className="py-2.5 px-4 font-semibold">Stage</th>
                          <th className="py-2.5 px-4 font-semibold">Category</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-variant">
                        <tr className="hover:bg-surface-container-low/40">
                          <td className="py-2.5 px-4 font-medium text-on-surface">M4 Pro MacBook Space Black: 30 Days</td>
                          <td className="py-2.5 px-4 text-outline">YouTube Main Channel</td>
                          <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full text-[11px] bg-secondary-fixed text-on-secondary-fixed font-semibold">EDITING</span></td>
                          <td className="py-2.5 px-4"><span className="text-primary font-medium">Tech Review</span></td>
                        </tr>
                        <tr className="hover:bg-surface-container-low/40">
                          <td className="py-2.5 px-4 font-medium text-on-surface">The Architecture of High-Output Solopreneurship</td>
                          <td className="py-2.5 px-4 text-outline">Substack Newsletter</td>
                          <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full text-[11px] bg-primary-fixed text-on-primary-fixed font-semibold">SCRIPTING</span></td>
                          <td className="py-2.5 px-4"><span className="text-amber-600 font-medium">Essay</span></td>
                        </tr>
                        <tr className="hover:bg-surface-container-low/40">
                          <td className="py-2.5 px-4 font-medium text-on-surface">Building a Second Brain in Notion 2026</td>
                          <td className="py-2.5 px-4 text-outline">YouTube Long-form</td>
                          <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-100 text-amber-800 font-semibold">RECORDING</span></td>
                          <td className="py-2.5 px-4"><span className="text-emerald-600 font-medium">Productivity</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Preview Tab 3: Taxonomy Rules */}
            {activeTab === 'taxonomy' && (
              <div className="p-6 sm:p-8 flex flex-col gap-6 animate-fade-in">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-surface-variant pb-4">
                  <div>
                    <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider block">Taxonomy & Taxonomy Manager</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mt-0.5">
                      Clean Semantic Categorization
                    </h3>
                  </div>
                  <Link
                    to="/categories"
                    className="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-xs text-label-xs shadow-xs hover:bg-primary transition-colors"
                  >
                    Manage Categories →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-surface-container-low/70 border border-surface-variant/70 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#4f46e5] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">devices</span>
                    </div>
                    <div>
                      <h4 className="font-label-sm text-label-sm font-semibold text-on-surface">Tech Review</h4>
                      <p className="text-[12px] text-outline mt-0.5">Hardware benchmarks and studio setup ergonomics.</p>
                      <span className="font-mono text-[10px] text-outline block mt-1">#tech-review • 3 items</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low/70 border border-surface-variant/70 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
                    </div>
                    <div>
                      <h4 className="font-label-sm text-label-sm font-semibold text-on-surface">Productivity</h4>
                      <p className="text-[12px] text-outline mt-0.5">Systems architecture and deep work protocols.</p>
                      <span className="font-mono text-[10px] text-outline block mt-1">#productivity • 3 items</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low/70 border border-surface-variant/70 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#d97706] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">article</span>
                    </div>
                    <div>
                      <h4 className="font-label-sm text-label-sm font-semibold text-on-surface">Essay</h4>
                      <p className="text-[12px] text-outline mt-0.5">Long-form reflective thoughts on solopreneurship.</p>
                      <span className="font-mono text-[10px] text-outline block mt-1">#essay • 2 items</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Feature Bento Section */}
        <section className="w-full bg-surface-container-lowest border-y border-surface-variant py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider block font-semibold">
                Studio Architecture
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                Constructed for Single-Operator Velocity
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Standard project managers overwhelm creator focus with corporate ticket bloat. StudioFlow is strictly editorial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-surface-container-low/60 border border-surface-variant/80 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary-container/10 text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[22px]">view_kanban</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Dynamic Kanban & Table Engine
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline mt-2 leading-relaxed">
                    Instantly toggle between card-based milestone board and dense table row matrices without losing active search filters or date flags.
                  </p>
                </div>
                <Link to="/content" className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold mt-6 hover:underline">
                  <span>View Database</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low/60 border border-surface-variant/80 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[22px]">analytics</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Velocity Rhythm & Deadlines
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline mt-2 leading-relaxed">
                    Track writing words, recording bottlenecks, render delays, and scheduled YouTube or newsletter drops with proactive threshold alerts.
                  </p>
                </div>
                <Link to="/overview" className="inline-flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold mt-6 hover:underline">
                  <span>Explore Dashboard</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low/60 border border-surface-variant/80 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[22px]">category</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Taxonomy & Tagging Engine
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline mt-2 leading-relaxed">
                    Create custom categories with curated color swatches, icon markers, and slugs. Changes propagate across all production views instantly.
                  </p>
                </div>
                <Link to="/categories" className="inline-flex items-center gap-1.5 text-amber-600 font-label-sm text-label-sm font-semibold mt-6 hover:underline">
                  <span>Manage Categories</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Call to Action banner */}
        <section className="w-full max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest border border-surface-variant shadow-lg flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center mb-4 shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-[26px]">terminal</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Ready to orchestrate your studio output?
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-md">
              Step directly into the command center to explore weekly velocity, production schedules, and editorial assets.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <Link
                to="/overview"
                className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-all"
              >
                Enter Command Center
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-variant bg-surface-container-lowest py-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-outline font-label-xs text-label-xs">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
            <span>Relay status: nominal</span>
            <span>•</span>
            <span>v3.12.0</span>
            <span>•</span>
            <span>UTC+00:00</span>
          </div>

          <div className="flex items-center gap-6 font-label-xs text-label-xs text-outline">
            <Link to="/overview" className="hover:text-on-surface transition-colors">Overview</Link>
            <Link to="/content" className="hover:text-on-surface transition-colors">Database</Link>
            <Link to="/categories" className="hover:text-on-surface transition-colors">Categories</Link>
            <Link to="/login" className="hover:text-on-surface transition-colors">Sign In</Link>
          </div>

          <p className="font-label-xs text-label-xs text-outline">
            StudioFlow © {new Date().getFullYear()} • Editorial Command Center
          </p>
        </div>
      </footer>
    </div>
  )
}
