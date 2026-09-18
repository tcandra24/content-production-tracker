import { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router'
import TaskSheet from '../../components/TaskSheet';

const MOCK_DATA = [
  { id: 'SF-1', title: 'M4 Pro MacBook Space Black: 30 Days As A Solo Studio Setup', channel: 'YouTube Main Channel • Primary Gear Slot', type: 'VIDEO', stage: 'EDITING', date: 'Oct 24, 2025', dateLabel: 'IN 2 DAYS', dateStatus: 'error', category: 'Tech Review' },
  { id: 'SF-2', title: 'The Architecture of High-Output Solopreneurship', channel: 'Substack Newsletter • Sunday Dispatch', type: 'ARTICLE', stage: 'SCRIPTING', date: 'Oct 28, 2025', dateLabel: 'On track', dateStatus: 'outline', category: 'Essay' },
  { id: 'SF-3', title: 'Building a Second Brain in Notion 2026: Fast Tagging Pipeline', channel: 'YouTube Long-form • Sponsored Segment', type: 'VIDEO', stage: 'RECORDING', date: 'Nov 02, 2025', dateLabel: 'On track', dateStatus: 'outline', category: 'Productivity' },
  { id: 'SF-4', title: 'Why Local-First Software Will Eat Cloud Subscriptions', channel: 'Medium • Technology Section', type: 'ARTICLE', stage: 'IDEA', date: 'Nov 07, 2025', dateLabel: 'Planning', dateStatus: 'outline', category: 'Deep Dive' },
  { id: 'SF-5', title: 'Desk Setup Tour: Extreme Ergonomics for 14-Hour Render Cycles', channel: 'YouTube • 84.2K Views', type: 'VIDEO', stage: 'PUBLISHED', date: 'Oct 16, 2025', dateLabel: 'Live • Complete', dateStatus: 'success', category: 'Tech Review' },
  { id: 'SF-6', title: 'The Creative Tax: Cognitive Residuals and How to Reset Daily', channel: 'Substack Essays • Draft Proofread', type: 'ARTICLE', stage: 'EDITING', date: 'Oct 30, 2025', dateLabel: 'Proofing', dateStatus: 'outline', category: 'Essay' },
  { id: 'SF-7', title: 'Reverse Engineering the Sony A7V Color Profile Engine', channel: 'YouTube Tech Slot • Benchmark Series', type: 'VIDEO', stage: 'SCRIPTING', date: 'Nov 11, 2025', dateLabel: 'Outline v2', dateStatus: 'outline', category: 'Deep Dive' },
  { id: 'SF-8', title: 'Stop Managing Tasks: Transitioning from Obsidian to StudioFlow', channel: 'YouTube Tutorial • Studio B-Roll', type: 'VIDEO', stage: 'RECORDING', date: 'Nov 04, 2025', dateLabel: 'Studio booked', dateStatus: 'warning', category: 'Productivity' },
  { id: 'SF-9', title: 'The Non-Linear Workday: How to Write 2,000 Words in 45-Minute Blocks', channel: 'Substack Deep Dive • Backlog Pitch', type: 'ARTICLE', stage: 'IDEA', date: 'Nov 18, 2025', dateLabel: 'Drafting', dateStatus: 'outline', category: 'Productivity' },
  { id: 'SF-10', title: 'Mechanical Keyboards for Writers: Silent tactile Switches vs Red Linears', channel: 'Hardware Weekly • Top Tier', type: 'ARTICLE', stage: 'PUBLISHED', date: 'Oct 12, 2025', dateLabel: 'Live • Complete', dateStatus: 'success', category: 'Tech Review' },
];

type ViewMode = 'TABLE' | 'KANBAN';

export const Route = createFileRoute('/_dashboard/content')({
  component: RouteComponent,
})

function RouteComponent() {
    const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isCompact, setIsCompact] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('TABLE');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isTaskSheetOpen, setIsTaskSheetOpen] = useState(false);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;
      if (stageFilter !== 'ALL' && item.stage !== stageFilter) return false;
      if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
      return true;
    });
  }, [search, typeFilter, stageFilter, categoryFilter]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filteredData.map(d => d.id)));
    else setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
 <div className="px-margin py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Content Database</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-xs font-label-xs bg-surface-container-high text-on-surface-variant font-medium">24 Total</span>
            </div>
            <p className="font-body-sm text-body-sm text-outline mt-0.5">Central media production catalog, release schedule, and asset stages</p>
          </div>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <div className="inline-flex p-1 rounded-full bg-surface-container shadow-inner">
            <button onClick={() => setViewMode('KANBAN')} className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${viewMode === 'KANBAN' ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: viewMode === 'KANBAN' ? "'FILL' 1" : ""}}>view_kanban</span>
              <span>Kanban</span>
            </button>
            <button onClick={() => setViewMode('TABLE')} className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${viewMode === 'TABLE' ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: viewMode === 'TABLE' ? "'FILL' 1" : ""}}>table_chart</span>
              <span>Table</span>
            </button>
          </div>
          <div className="h-6 w-px bg-surface-variant mx-1 hidden sm:block"></div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container transition-all">
            <span className="material-symbols-outlined text-[17px] text-on-surface-variant">file_download</span>
            <span>Export CSV</span>
          </button>
          <button onClick={() => setIsTaskSheetOpen(true)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-primary transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Item</span>
            <kbd className="ml-1 px-1.5 py-0.2 rounded bg-white/20 text-[10px] font-mono leading-none">C</kbd>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-sm">
        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">In Scripting</span>
            <span className="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">4 Works</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">Shooting / Writing</span>
            <span className="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">5 In Progress</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">videocam</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">Post-Production</span>
            <span className="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">3 Cuts</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">movie_filter</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">Due This Week</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-headline-md text-headline-md text-on-surface font-bold">2 Releases</span>
              <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">event_upcoming</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm bg-surface-container-lowest p-2.5 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-md flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-[18px] text-outline pointer-events-none">search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} className="w-full h-9 pl-9 pr-8 bg-surface-container-low text-on-surface rounded-lg font-body-sm text-body-sm placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Filter by title, platform, target keyword..." type="text"/>
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
          <div className="relative">
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="appearance-none h-9 pl-3 pr-8 bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-lg outline-none cursor-pointer hover:bg-surface-container focus:ring-2 focus:ring-primary/20 transition-colors">
              <option value="ALL">All Formats (10)</option>
              <option value="VIDEO">Video Only</option>
              <option value="ARTICLE">Article Only</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-[16px] text-outline pointer-events-none">expand_more</span>
          </div>
          <div className="relative">
            <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="appearance-none h-9 pl-3 pr-8 bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-lg outline-none cursor-pointer hover:bg-surface-container focus:ring-2 focus:ring-primary/20 transition-colors">
              <option value="ALL">All Production Stages</option>
              <option value="IDEA">Idea</option>
              <option value="SCRIPTING">Scripting</option>
              <option value="RECORDING">Recording / Writing</option>
              <option value="EDITING">Editing</option>
              <option value="PUBLISHED">Published</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-[16px] text-outline pointer-events-none">expand_more</span>
          </div>
          <div className="relative">
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="appearance-none h-9 pl-3 pr-8 bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-lg outline-none cursor-pointer hover:bg-surface-container focus:ring-2 focus:ring-primary/20 transition-colors">
              <option value="ALL">All Categories</option>
              <option value="Tech Review">Tech Review</option>
              <option value="Productivity">Productivity</option>
              <option value="Essay">Essay</option>
              <option value="Deep Dive">Deep Dive</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-[16px] text-outline pointer-events-none">expand_more</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 self-end lg:self-auto border-t lg:border-t-0 pt-2 lg:pt-0 border-surface-variant">
          {selectedIds.size > 0 && (
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-error bg-error-container/30 hover:bg-error-container font-label-sm text-label-sm transition-all">
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>{selectedIds.size} selected</span>
            </button>
          )}
          <button onClick={() => {setSearch(''); setTypeFilter('ALL'); setStageFilter('ALL'); setCategoryFilter('ALL');}} className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Reset Filters">
            <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>
          </button>
          <button onClick={() => setIsCompact(!isCompact)} className={`p-2 rounded-lg hover:bg-surface-container transition-colors ${isCompact ? 'text-primary' : 'text-outline hover:text-on-surface'}`} title="Density Toggle">
            <span className="material-symbols-outlined text-[18px]">density_medium</span>
          </button>
        </div>
      </div>

      
      {viewMode === 'TABLE' && (
        <>
<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[960px]">
            <thead>
              <tr className="bg-surface-container-low/70 text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider select-none">
                <th className="py-3 px-4 w-12 text-center" scope="col">
                  <input checked={selectedIds.size === filteredData.length && filteredData.length > 0} onChange={e => toggleSelectAll(e.target.checked)} className="w-4 h-4 rounded text-primary border-surface-variant focus:ring-primary/20 accent-primary cursor-pointer" type="checkbox"/>
                </th>
                <th className="py-3 px-3 font-semibold" scope="col">Title & Distribution</th>
                <th className="py-3 px-3 font-semibold w-32" scope="col">Format</th>
                <th className="py-3 px-3 font-semibold w-40" scope="col">Pipeline Stage</th>
                <th className="py-3 px-3 font-semibold w-48" scope="col">Target Release</th>
                <th className="py-3 px-3 font-semibold w-36" scope="col">Category</th>
                <th className="py-3 px-4 font-semibold w-24 text-right" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm divide-y-0">
              {filteredData.map(item => (
                <tr key={item.id} className="group hover:bg-surface-container-low/60 transition-colors">
                  <td className={`px-4 text-center ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    <input checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4 rounded text-primary border-surface-variant focus:ring-primary/20 accent-primary cursor-pointer" type="checkbox"/>
                  </td>
                  <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-outline group-hover:text-primary transition-colors flex-shrink-0">
                        {item.type === 'VIDEO' ? <span className="material-symbols-outlined text-[16px]">play_circle</span> : 
                         item.type === 'ARTICLE' && item.stage === 'PUBLISHED' ? <span className="material-symbols-outlined text-[16px] text-emerald-600">published_with_changes</span> :
                         item.stage === 'PUBLISHED' ? <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span> :
                         <span className="material-symbols-outlined text-[16px]">{item.stage === 'IDEA' ? 'lightbulb' : item.stage === 'SCRIPTING' ? 'code' : 'article'}</span>}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <Link to="/" className="font-headline-sm text-headline-sm text-on-surface truncate group-hover:text-primary transition-colors cursor-pointer">{item.title}</Link>
                        <span className="font-label-xs text-label-xs text-outline flex items-center gap-1.5 mt-0.5">
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${item.type === 'VIDEO' ? 'bg-red-500' : 'bg-teal-600'}`}></span>
                          {item.channel}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    {item.type === 'VIDEO' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-xs text-label-xs font-semibold uppercase tracking-wider bg-[rgba(249,115,22,0.10)] text-[#C2410C]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span> Video
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-xs text-label-xs font-semibold uppercase tracking-wider bg-[rgba(13,148,136,0.10)] text-[#0F766E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></span> Article
                      </span>
                    )}
                  </td>
                  <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    {item.stage === 'IDEA' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-xs text-label-xs font-medium bg-[#FEF3C7] text-[#92400E]">Idea</span>}
                    {item.stage === 'SCRIPTING' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-xs text-label-xs font-medium bg-[#DBEAFE] text-[#1E40AF]">Scripting</span>}
                    {item.stage === 'RECORDING' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-xs text-label-xs font-medium bg-[#FED7AA] text-[#9A3412]">Recording / Writing</span>}
                    {item.stage === 'EDITING' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-xs text-label-xs font-medium bg-[#E9D5FF] text-[#6B21A8]">Editing</span>}
                    {item.stage === 'PUBLISHED' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-xs text-label-xs font-medium bg-[#D1FAE5] text-[#065F46]">Published</span>}
                  </td>
                  <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-[16px] text-${item.dateStatus}`}>{item.stage === 'PUBLISHED' ? 'done_all' : item.dateStatus === 'error' ? 'alarm' : item.dateStatus === 'warning' ? 'warning' : 'schedule'}</span>
                      <div className="flex flex-col">
                        <span className="text-on-surface font-medium">{item.date}</span>
                        <span className={`text-[10px] ${item.dateStatus === 'error' ? 'text-error uppercase tracking-wider' : item.dateStatus === 'success' ? 'text-emerald-700' : item.dateStatus === 'warning' ? 'text-amber-700' : 'text-secondary'} font-semibold`}>{item.dateLabel}</span>
                      </div>
                    </div>
                  </td>
                  <td className={`px-3 ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-xs text-label-xs">{item.category}</span>
                  </td>
                  <td className={`px-4 text-right ${isCompact ? 'py-1.5' : 'py-3'}`}>
                    <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Edit"><span className="material-symbols-outlined text-[17px]">edit</span></button>
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Duplicate"><span className="material-symbols-outlined text-[17px]">content_copy</span></button>
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="More actions"><span className="material-symbols-outlined text-[17px]">more_horiz</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-outline mb-2">
                        <span className="material-symbols-outlined text-[24px]">filter_list_off</span>
                      </div>
                      <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">No content matches this filter</p>
                      <p className="font-body-sm text-body-sm text-outline mt-1 max-w-sm">Try resetting filters or adjusting search parameters to see your pipeline items.</p>
                      <button onClick={() => {setSearch(''); setTypeFilter('ALL'); setStageFilter('ALL'); setCategoryFilter('ALL');}} className="mt-3 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">Reset all filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-variant">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Showing <strong className="text-on-surface">{filteredData.length}</strong> of 24 tasks</span>
            <span className="text-outline-variant font-label-xs">•</span>
            <span className="font-label-xs text-label-xs text-outline">Page 1 of 1</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded bg-surface-container-low text-outline cursor-not-allowed font-label-sm text-label-sm flex items-center gap-1" disabled>
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1 mx-1">
              <button className="w-7 h-7 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center shadow-sm">1</button>
            </div>
            <button className="px-2.5 py-1 rounded bg-surface-container-low text-outline cursor-not-allowed font-label-sm text-label-sm flex items-center gap-1 transition-colors" disabled>
              <span>Next</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md p-space-md rounded-xl bg-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-primary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface">Velocity: 2.4 / wk</span>
            <span className="font-label-xs text-label-xs text-outline">On pace for +18% output month-over-month</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">pie_chart</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface">Split: 60% Video, 40% Text</span>
            <span className="font-label-xs text-label-xs text-outline">Optimal revenue engine distribution</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-tertiary-container shadow-sm">
            <span className="material-symbols-outlined text-[20px]">notification_important</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface">Publishing Target Ahead</span>
            <span className="font-label-xs text-label-xs text-outline">M4 Pro review drops in 48h (Thumbnails pending)</span>
          </div>
        </div>
      </div>
        </>
      )}
      {viewMode === 'KANBAN' && (
        <>
<div className="w-full overflow-x-auto p-margin">
        <div className="flex items-start gap-space-md min-w-[1540px] pb-16">
          <div className="flex flex-col w-[300px] shrink-0 rounded-xl bg-surface-container-low p-2 gap-space-sm shadow-sm">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FEF3C7] text-on-surface">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
                <span className="font-headline-sm text-headline-sm">Idea</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-on-surface font-label-xs text-label-xs font-semibold shadow-sm">3</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    VIDEO
                  </span>
                  <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[16px] text-outline cursor-grab">drag_indicator</span>
                  </div>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  The Future of AI Design Tools: Agentic Interfaces in Figma
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Deep Dive</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Design</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>Nov 4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">check_box</span>
                      0/4
                    </span>
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                      2
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    ARTICLE
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  Why Native Apps Still Win: Local-First Architecture Explored
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Opinion</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Tech</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>Nov 8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">check_box</span>
                      1/3
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    VIDEO
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  Minimalist Smart Home Setup: No Cloud, Zero Subscriptions
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Workflow</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>Nov 15</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">attach_file</span>
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => setIsTaskSheetOpen(true)} className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-container-lowest/60 hover:bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors mt-1">
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Idea</span>
            </button>
          </div>

          <div className="flex flex-col w-[300px] shrink-0 rounded-xl bg-surface-container-low p-2 gap-space-sm shadow-sm">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#DBEAFE] text-on-surface">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <span className="font-headline-sm text-headline-sm">Scripting</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-on-surface font-label-xs text-label-xs font-semibold shadow-sm">3</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    VIDEO
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  Building a Second Brain in Obsidian 2025: Concrete Guide
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Tutorial</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Workflow</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>In 3 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-on-surface-variant font-medium">
                      <span className="material-symbols-outlined text-[14px]">check_box</span>
                      4/6
                    </span>
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                      5
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    ARTICLE
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  Next.js 15 Full Stack Course Outline & Deep Dive
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Tutorial</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Tech</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>Oct 30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">check_box</span>
                      2/5
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    ARTICLE
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  The Economics of Independent Journalism in 2025
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Deep Dive</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>Nov 2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">check_box</span>
                      3/3
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-container-lowest/60 hover:bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors mt-1">
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Script</span>
            </button>
          </div>

          <div className="flex flex-col w-[300px] shrink-0 rounded-xl bg-surface-container-low p-2 gap-space-sm shadow-sm">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FED7AA] text-on-surface">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
                <span className="font-headline-sm text-headline-sm">Recording / Writing</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-on-surface font-label-xs text-label-xs font-semibold shadow-sm">3</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    VIDEO
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  M3 Max MacBook Pro 6-Month Review: Real Studio Benchmarks
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Tech Review</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Hardware</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[14px]">priority_high</span>
                    <span>Tomorrow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-on-surface font-medium">
                      <span className="material-symbols-outlined text-[14px]">check_box</span>
                      5/8
                    </span>
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">mic</span>
                      A-Roll
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    ARTICLE
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  The Architecture of Solitude: Studio Acoustics on a Budget
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Guide</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>Oct 27</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">check_box</span>
                      2/4
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    VIDEO
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  Desk Setup Tour: Ergonomics & Warm Lighting Principles
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Workflow</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>Oct 29</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">videocam</span>
                      B-Roll
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-container-lowest/60 hover:bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors mt-1">
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Draft</span>
            </button>
          </div>

          <div className="flex flex-col w-[300px] shrink-0 rounded-xl bg-surface-container-low p-2 gap-space-sm shadow-sm">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#E9D5FF] text-on-surface">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9333EA]"></span>
                <span className="font-headline-sm text-headline-sm">Editing</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-on-surface font-label-xs text-label-xs font-semibold shadow-sm">3</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    VIDEO
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  Custom Keyboards in 2025: Has the Hobby Peaked?
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Opinion</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Tech</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    <span>Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-on-surface font-medium">
                      <span className="material-symbols-outlined text-[14px]">movie_edit</span>
                      Rough Cut
                    </span>
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                      8
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    ARTICLE
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  PostgreSQL 17 Migration Playbook for Fast-Moving Teams
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Deep Dive</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>Oct 25</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">check_box</span>
                      6/6
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    VIDEO
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  Color Grading S-Log3 in DaVinci Resolve: The Master Node Tree
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Tutorial</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px]">event</span>
                    <span>Oct 26</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">palette</span>
                      Grading
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-container-lowest/60 hover:bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors mt-1">
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Cut</span>
            </button>
          </div>

          <div className="flex flex-col w-[300px] shrink-0 rounded-xl bg-surface-container-low p-2 gap-space-sm shadow-sm">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#D1FAE5] text-on-surface">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                <span className="font-headline-sm text-headline-sm">Published</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-on-surface font-label-xs text-label-xs font-semibold shadow-sm">2</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing opacity-90 hover:opacity-100">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                    VIDEO
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  Sony FX3 vs Panasonic S5IIX: Which Cinema Rig Won?
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Tech Review</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-medium">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>Oct 18</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">visibility</span>
                      42.8k
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing opacity-90 hover:opacity-100">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    ARTICLE
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline opacity-40 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 pt-1 group-hover:text-primary transition-colors">
                  Building Clean Architecture with TypeScript in 2025
                </h3>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Guide</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">Tech</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-on-surface-variant">
                  <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-medium">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>Oct 12</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 font-label-xs text-label-xs text-outline">
                      <span className="material-symbols-outlined text-[14px]">favorite</span>
                      312
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-container-lowest/60 hover:bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors mt-1">
              <span className="material-symbols-outlined text-[16px]">archive</span>
              <span>Archive Stage</span>
            </button>
          </div>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md p-space-md rounded-xl bg-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-primary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface">Velocity: 2.4 / wk</span>
            <span className="font-label-xs text-label-xs text-outline">On pace for +18% output month-over-month</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-secondary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">pie_chart</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface">Split: 60% Video, 40% Text</span>
            <span className="font-label-xs text-label-xs text-outline">Optimal revenue engine distribution</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-tertiary-container shadow-sm">
            <span className="material-symbols-outlined text-[20px]">notification_important</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface">Publishing Target Ahead</span>
            <span className="font-label-xs text-label-xs text-outline">M4 Pro review drops in 48h (Thumbnails pending)</span>
          </div>
        </div>
      </div>
        </>
      )}

      <TaskSheet isOpen={isTaskSheetOpen} onClose={() => setIsTaskSheetOpen(false)} />
    </div>
  )
}
