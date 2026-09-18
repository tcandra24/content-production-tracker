import { useState } from 'react';

interface TaskSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskSheet({ isOpen, onClose }: TaskSheetProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <>
            <div className="fixed inset-0 bg-[#1c1c1a]/40 backdrop-blur-[3px] z-50 transition-opacity duration-300" onClick={() => onClose()}></div>

      <aside className="fixed top-0 right-0 bottom-0 w-full sm:w-[540px] bg-surface-container-lowest z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 translate-x-0 animate-slide-in-right">
        <div className="sticky top-0 bg-surface-container-lowest/95 backdrop-blur-md px-space-lg py-4 flex flex-col gap-2 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-outline">view_kanban</span>
              <span onClick={onClose} className="hover:text-on-surface cursor-pointer">Content Pipeline</span>
              <span className="text-outline-variant">/</span>
              <span className="font-medium text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                In Editing
              </span>
              <span className="text-outline-variant">/</span>
              <span className="text-outline font-mono text-label-xs">SF-098</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Copy Link">
                <span className="material-symbols-outlined text-[18px]">link</span>
              </button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Full Screen Expanded">
                <span className="material-symbols-outlined text-[18px]">open_in_full</span>
              </button>
              <button onClick={onClose} aria-label="Close drawer" className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors ml-1">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Edit Production Asset</h2>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-xs text-label-xs">
              <span className="material-symbols-outlined text-[13px] text-secondary">cloud_done</span>
              <span>Synced</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-space-lg py-space-md flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold" htmlFor="task-title-input">Asset Headline / Title</label>
            <div className="relative">
              <input className="w-full px-3 py-2 bg-surface-container-lowest rounded-lg font-headline-md text-headline-md text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-outline/40 transition-shadow" id="task-title-input" placeholder="Enter production title..." type="text" defaultValue="M3 Max MacBook Pro 6-Month Review: The Real Verdict"/>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Format Type</span>
            <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container-low rounded-xl">
              <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-tertiary-fixed text-tertiary shadow-sm transition-all" type="button">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                <span className="font-label-md text-label-md font-semibold">Video (4K Edit)</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-surface-container-lowest text-on-surface-variant transition-all" type="button">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="material-symbols-outlined text-[18px]">article</span>
                <span className="font-label-md text-label-md">Article / Essay</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Current Stage</label>
              <div className="relative">
                <button className="w-full flex items-center justify-between px-3 py-2 bg-[#E9D5FF]/50 hover:bg-[#E9D5FF] text-[#581C87] rounded-lg shadow-sm transition-colors text-left" type="button">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9333EA]"></span>
                    <span className="font-label-md text-label-md font-semibold">Editing & Grading</span>
                  </div>
                  <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
                </button>
                <div className="flex items-center gap-1 mt-1.5 px-0.5">
                  <div className="h-1 flex-1 rounded-full bg-[#FEF3C7]"></div>
                  <div className="h-1 flex-1 rounded-full bg-[#DBEAFE]"></div>
                  <div className="h-1 flex-1 rounded-full bg-[#FED7AA]"></div>
                  <div className="h-1 flex-1 rounded-full bg-[#9333EA]"></div>
                  <div className="h-1 flex-1 rounded-full bg-surface-variant"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Target Release</label>
              <div className="flex items-center justify-between px-3 py-2 bg-surface-container-lowest rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">event</span>
                  <span className="font-label-md text-label-md font-medium">Oct 26, 2025</span>
                </div>
                <span className="font-label-xs text-label-xs px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">In 3 days</span>
              </div>
              <div className="flex items-center gap-1 pt-0.5">
                <button className="px-2 py-0.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs transition-colors" type="button">Today</button>
                <button className="px-2 py-0.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs transition-colors" type="button">Tomorrow</button>
                <button className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-medium" type="button">Next Week</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Master Export Target</span>
            <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">smart_display</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md font-semibold text-on-surface">YouTube Primary Channel</p>
                  <p className="font-label-xs text-label-xs text-outline">Direct API Scheduled Upload</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
                <span className="px-2 py-1 rounded bg-surface-container-lowest shadow-sm font-label-xs text-label-xs font-mono font-medium text-on-surface">ProRes 422 HQ</span>
                <span className="px-2 py-1 rounded bg-surface-container-lowest shadow-sm font-label-xs text-label-xs font-mono font-medium text-secondary">3840×2160 (4K)</span>
                <span className="px-2 py-1 rounded bg-surface-container-lowest shadow-sm font-label-xs text-label-xs font-mono font-medium text-outline">24.00 fps</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Taxonomy & Meta Tags</label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-container-lowest rounded-lg shadow-sm">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-xs font-label-xs font-medium">
                <span>#Hardware</span>
                <button className="hover:text-error flex items-center justify-center" type="button">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-label-xs font-label-xs font-medium">
                <span>#Long-form</span>
                <button className="hover:text-error flex items-center justify-center" type="button">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-xs font-label-xs font-medium">
                <span>#Review</span>
                <button className="hover:text-error flex items-center justify-center" type="button">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs transition-colors" type="button">
                <span className="material-symbols-outlined text-[14px]">add</span>
                <span>Add tag</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Thumbnail Concept Candidates (A/B Test)</span>
              <span className="font-label-xs text-label-xs text-primary font-medium cursor-pointer hover:underline">+ Upload Mockup</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group rounded-lg overflow-hidden bg-surface-container-high shadow-sm aspect-video">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGszjp3NVmPf5sCRaaU81H3KSl5deL4RUjDDExk8rZhEhSgo69vU9xZx5oUI9bxbkWlrqa2063TiWTwwF_e8H1Ff6oatLJ5_bkD1BJYC-vRf-HFc13OZXhtv5_JAdQj24lf7sgtKeEOQmKFYQtNdgS5YnUiaDdgVasMkk6L6cgMIW8XyYD2zLd_PU9QdXnqEoQ_9n2w42h5kZZgphFTE4c-ZpWl3iFas9L_cx2oWGitBxvwDo0S18wZQ" alt="Option A"/>
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-[10px] font-bold font-mono">
                  OPTION A (Active)
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#1c1c1a]/80 text-white text-[10px] font-mono">
                  CTR: 9.4% est
                </div>
              </div>
              <div className="relative group rounded-lg overflow-hidden bg-surface-container-high shadow-sm aspect-video">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXpK302rHy3fcA2NgPr1US-_2x7aL-A1_UXQ_V5_bUnRbc0Lq69LVFZgW1NlF4T9zraPO861G0fWMHNDorBFUSRXCBpDlVUS5xz5qQFYkI3UsieIoNQzEHhwccGjxp8nT0aHTRAbJ7-i6d3kqef5eSTTsDtAsqCXeRBPhVpCrrIBZ7zoXX2Pflf3c1Bs4YVh8aI5q4m2hPkyfHT03_G2etQwLDPpZy0DfC2guWDEQDl_7WB8ZJ7iUv8w" alt="Option B"/>
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-[10px] font-bold font-mono text-outline">
                  OPTION B
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#1c1c1a]/80 text-white text-[10px] font-mono">
                  CTR: 7.1% est
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold" htmlFor="script-notes">Structured Script & Production Notes</label>
              <div className="flex items-center gap-2 text-outline font-label-xs text-label-xs">
                <span>Markdown supported</span>
              </div>
            </div>
            <div className="relative rounded-lg shadow-sm bg-surface-container-lowest overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low text-on-surface-variant font-label-xs text-label-xs border-b border-surface-variant">
                <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface">format_bold</span>
                <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface">format_italic</span>
                <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface">format_list_bulleted</span>
                <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface">code</span>
                <span className="text-outline-variant">|</span>
                <span className="font-mono text-[11px] text-outline">1,240 words</span>
              </div>
              <textarea className="w-full px-3 py-2.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/20 placeholder:text-outline/50 font-mono resize-y" id="script-notes" placeholder="Structure your hook, timecodes, and B-roll wishlist..." rows={9} defaultValue={`### 00:00 — The Cold Open (The Unforgiving 6 Months)
- Visual: Macro probe lens pan across the Space Black hinge, dust accumulating under keycaps.
- Audio Hook: "Everyone praised the M3 Max at launch. But nobody warned you about this specific memory throttling issue."

### 02:40 — Sponsor Segment: CraftFlow Workspace
- Placement: Mid-roll right before the Premiere timeline render test.
- Talking points: Integrated asset management + local caching speed.
- Deliverable draft deadline: Tomorrow at 2:00 PM EST.

### 05:15 — B-Roll Wishlist & Timeline Inserts
- [x] Slow motion 4K 120fps thermal throttle fan exhaust recording
- [x] Comparison graphic: M1 Max vs M2 Max vs M3 Max power efficiency curve
- [ ] DaVinci Resolve color grading export speed comparative benchmark

### 11:30 — Final Verdict & Recommendation
- Who should NOT upgrade (M2 Max users save your cash).
- Who desperately needs it (heavy multi-cam 8K ProRes timelines).`} />
            </div>
          </div>

          <div className="flex flex-col gap-2 pb-2">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Assigned Editorial Unit</span>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <img alt="Julian Vance" className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-container-lowest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFBTkSyfdQYbe16l1voPaBZhqvCiytPO05cEt-0ZmO-rvNtuU41ESOLSHMkFd3TDKqWfqULMDuTnC3jUOlgvRbuBZPi5SzvkTepFsr2ZOydcG5Xpgx8YJbUTEaQUzjO1JV333i2l_I58-O6o2z8ot5ACZO6xdi_PjBlGdhRIVA98C8pooigIuma02DFyiIny6sHWb72Iy1gkCyy2hcH-Qy6Ys82sxRHnh7REVbfeTvJMf1hp_mF3e7CQ"/>
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full ring-2 ring-surface-container-lowest bg-primary-fixed text-primary font-bold text-[11px]">ER</span>
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full ring-2 ring-surface-container-lowest bg-secondary-fixed text-secondary font-bold text-[11px]">KL</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface">3 Editors & Colorists</span>
              </div>
              <button className="text-primary hover:text-primary-container font-label-xs text-label-xs font-medium flex items-center gap-1" type="button">
                <span className="material-symbols-outlined text-[15px]">person_add</span>
                <span>Invite</span>
              </button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-surface-container-lowest px-space-lg py-3.5 flex items-center justify-between shadow-[0_-2px_8px_rgba(0,0,0,0.04)] z-20">
          <button className="flex items-center justify-center w-9 h-9 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors" title="Delete asset from pipeline" type="button">
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
          <div className="flex items-center gap-2.5">
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-[#6B6862] hover:text-on-surface font-label-md text-label-md font-medium shadow-sm transition-all active:scale-95" type="button">
              Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-primary-container hover:bg-[#4338CA] text-on-primary font-label-md text-label-md font-medium shadow-sm active:scale-98 transition-all min-w-[140px] justify-center" type="button">
              {isSaving ? (
                <>
                  <span className="material-symbols-outlined text-[17px] animate-spin">sync</span>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[17px]">check</span>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
