import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/_dashboard/overview')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
     <div className="flex flex-col w-full relative">
      <section className="w-full px-margin py-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="space-y-1">
          <div className="flex items-center gap-space-xs text-outline font-label-xs text-label-xs uppercase tracking-wider">
            <span>Studio Operations</span>
            <span className="text-outline-variant">•</span>
            <span className="text-primary font-medium">Sprint 42 Live</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Good morning, Alex. Here's your production velocity for this week.
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Pipeline health is optimal with 8 deliverables completed toward the monthly 10-asset goal.
          </p>
        </div>
        
        <div className="flex items-center gap-2.5 shrink-0">
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-all active:scale-[0.99]">
            <span className="material-symbols-outlined text-[18px] text-outline">tune</span>
            <span>Filter Pipeline</span>
          </button>
          <button onClick={() => setIsDrawerOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-all active:scale-[0.99]">
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            <span>+ New Task</span>
          </button>
          <Link to="/content" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-all">
            <span>Open Kanban</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      <section className="w-full px-margin pb-space-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Total Active Tasks</span>
              <span className="w-7 h-7 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">stacks</span>
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">14</span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-xs text-label-xs font-semibold">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                +3 this week
              </span>
            </div>
            <div className="mt-3 pt-3 bg-surface-container-low rounded-lg p-2 flex items-center justify-between text-outline">
              <span className="font-label-xs text-label-xs">Throughput capacity</span>
              <span className="font-label-xs text-label-xs text-primary font-semibold">78% Loaded</span>
            </div>
            <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-primary/5 pointer-events-none group-hover:scale-125 transition-transform"></div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Due This Week</span>
              <span className="w-7 h-7 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">alarm</span>
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">4</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                2 videos, 2 articles
              </span>
            </div>
            <div className="mt-3 pt-3 bg-surface-container-low rounded-lg p-2 flex items-center justify-between">
              <span className="font-label-xs text-label-xs text-outline">Critical deadline</span>
              <span className="font-label-xs text-label-xs text-tertiary font-semibold">Tomorrow, 18:00</span>
            </div>
            <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-tertiary/5 pointer-events-none group-hover:scale-125 transition-transform"></div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Published This Month</span>
              <span className="w-7 h-7 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">8</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-xs text-label-xs font-semibold">
                Goal: 10 (+2 ahead)
              </span>
            </div>
            <div className="mt-3 pt-3 bg-surface-container-low rounded-lg p-2 flex items-center justify-between">
              <span className="font-label-xs text-label-xs text-outline">Target pacing</span>
              <span className="font-label-xs text-label-xs text-secondary font-semibold">80% Reached</span>
            </div>
            <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-secondary/5 pointer-events-none group-hover:scale-125 transition-transform"></div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Avg Production Cycle</span>
              <span className="w-7 h-7 rounded-lg bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">speed</span>
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="font-headline-xl text-headline-xl text-on-surface font-bold">6.4</span>
              <span className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">Days</span>
            </div>
            <div className="mt-3 pt-3 bg-surface-container-low rounded-lg p-2 flex items-center justify-between">
              <span className="font-label-xs text-label-xs text-outline">Idea to publication</span>
              <span className="font-label-xs text-label-xs text-on-surface font-semibold">-0.8d vs Q2</span>
            </div>
            <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-surface-variant/40 pointer-events-none group-hover:scale-125 transition-transform"></div>
          </div>
        </div>
      </section>

      <section className="w-full px-margin pb-space-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
          <div className="lg:col-span-2 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-space-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Task Distribution by Stage</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">21 total trackable items across creative pipeline</p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="px-2 py-1 rounded bg-surface-container font-label-xs text-label-xs text-on-surface-variant">Active (13)</span>
                  <span className="px-2 py-1 rounded bg-secondary-container/40 font-label-xs text-label-xs text-secondary font-medium">Done (8)</span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="font-medium text-on-surface">1. Idea Backlog</span>
                      <span className="text-outline font-label-xs text-label-xs">(Pitching, research notes)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-on-surface">4 tasks</span>
                      <span className="text-outline font-label-xs text-label-xs">19%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
                    <div className="h-full rounded-full bg-amber-200 transition-all duration-500" style={{ width: '19%' }}></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                      <span className="font-medium text-on-surface">2. Scripting & Outlining</span>
                      <span className="text-outline font-label-xs text-label-xs">(Drafts, teleprompter)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-on-surface">3 tasks</span>
                      <span className="text-outline font-label-xs text-label-xs">14%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
                    <div className="h-full rounded-full bg-primary-fixed transition-all duration-500" style={{ width: '14%' }}></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                      <span className="font-medium text-on-surface">3. Recording & Writing</span>
                      <span className="text-outline font-label-xs text-label-xs">(A-roll, voiceover, prose)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-on-surface">3 tasks</span>
                      <span className="text-outline font-label-xs text-label-xs">14%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
                    <div className="h-full rounded-full bg-tertiary-fixed transition-all duration-500" style={{ width: '14%' }}></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      <span className="font-medium text-on-surface">4. Post-Production / Editing</span>
                      <span className="text-outline font-label-xs text-label-xs">(Rough cut, color, copyedit)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-on-surface">3 tasks</span>
                      <span className="text-outline font-label-xs text-label-xs">14%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
                    <div className="h-full rounded-full bg-purple-200 transition-all duration-500" style={{ width: '14%' }}></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <span className="font-medium text-on-surface">5. Published & Live</span>
                      <span className="text-outline font-label-xs text-label-xs">(YouTube, Substack, Blog)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-secondary">8 tasks</span>
                      <span className="text-outline font-label-xs text-label-xs">38%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
                    <div className="h-full rounded-full bg-secondary-fixed transition-all duration-500" style={{ width: '38%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 bg-surface-container-low rounded-lg p-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                <span className="font-label-sm text-label-sm text-on-surface font-medium">Pipeline Conversion Rate: 84%</span>
              </div>
              <span className="font-label-xs text-label-xs text-outline">Updated 12 minutes ago</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Featured Pipeline Asset</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-xs text-label-xs font-semibold">Flagship Project</span>
              </div>
              <div className="relative w-full h-36 rounded-lg overflow-hidden mb-3 bg-surface-container">
                <img className="w-full h-full object-cover" alt="Camera rig" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZj7Yw2QECUGtf7D2ff-njt7gacE18euHub_9SLoY-dKsg0bLT9mFcEtYuwgr4oojMrXAlwb7-nSndwP2_4Qxgez-dWxZOPtZQ2eTzAZo2jKUaKBIx3h_SySVODxiDtmL0ryo11gCChS0kCm8dB8EnFEZaB9sqON0YIM6S9bxfvBeV_NOHXIKbyOy7s-CFQzRwFIZtfxUdVz0CUJR78onsZQTnVdsNMV1NuQ8S7gBNGPBC7Ou1ioOn7g" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-3">
                  <span className="text-white font-label-sm text-label-sm font-semibold tracking-wide">Behind the Lens: 4K Modular Rig</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                Q4 Creator Tech Review Episode 04
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-3">
                Deep dive into high-bitrate recording workflows for independent content creators. Includes comprehensive color grade comparison.
              </p>
            </div>
            
            <div className="space-y-2 bg-surface-container-low p-3 rounded-lg">
              <div className="flex items-center justify-between font-label-xs text-label-xs">
                <span className="text-outline">Completion</span>
                <span className="font-semibold text-primary">85% (Rough Cut Locked)</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[85%]"></div>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant font-label-xs text-label-xs pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">schedule</span>
                  Due Friday, 17:00
                </span>
                <span className="text-secondary font-medium">Review Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-margin pb-space-xl">
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-md">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Upcoming Deadlines</h2>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-xs text-label-xs font-bold">4 Priority Tasks</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Chronologically sorted deliverables requiring creator focus</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface font-label-xs text-label-xs font-medium shadow-xs">All Deadlines</button>
                <button className="px-2.5 py-1 rounded text-outline hover:text-on-surface font-label-xs text-label-xs font-medium">Videos Only</button>
                <button className="px-2.5 py-1 rounded text-outline hover:text-on-surface font-label-xs text-label-xs font-medium">Articles Only</button>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              {
                due: "Tmrw", type: "Video", stage: "Editing", id: "SF-108",
                title: "Sony FX3 vs Canon C70: 2024 Real World Comparison",
                status1: { icon: "check_box", text: "Rough Cut Done", color: "secondary" },
                status2: { icon: "timer", text: "4.5h remaining", color: "tertiary" },
                avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDf8KqkoWiI2Ne8_x3cWkrjw_jmLX9YO6vmkq0hUg5hjVmaxQ83OFRe1daBvsaGrbgM_6lNq7ZSonoWHzGAjxg4RWyRGL2KDbA-sGBJnA2l8P3dKSLn5WAEbSnN7fLtYPiue5FyjbFP8S0PNBRxuW-KZLD2DySgz4JEpN7XTg4VnGQ5tyL3tt81YJmpF0mUhX1vFkeFzrZW0YPQL28CG9Ny9gAMSCwk_XTaidAw5Rb8j1iCAz6sux5diw"],
                moreCount: "+1"
              },
              {
                due: "Oct 24", type: "Article", stage: "Writing", id: "SF-112",
                title: "The Solo Creator's Guide to Audio Mastering with Ozone 11",
                status1: { icon: "check_box", text: "Outline Approved", color: "secondary" },
                status2: { icon: "timer", text: "2.0h est.", color: "outline" },
                avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDC1HTAdm-e__76d8KkA8MqGIHqfUxsYyIVCX0E7EPzBytuwUWZJ6LsdM69uAdbgfVacOGMT_s7FYyM8mzatX1aty3OAFeUWsNzEaIai9-WDPk_hnGtw20tziUWy2muWOQ-sJW7umYwfju3lQd5Slp-SyyMacMc1lBuNBcrj-PTlHQn576VHkb5HmBFicrxPp55_LyZt82GA6odh95Q3wqRZiB5gnxBxGKxYADGm0XHSByvfZbNR_Rg7A"]
              },
              {
                due: "Oct 27", type: "Video", stage: "Scripting", id: "SF-119",
                title: "How to Build a Second Brain inside Obsidian for YouTubers",
                status1: { icon: "check_box", text: "Thumbnail Ready", color: "secondary" },
                status2: { icon: "timer", text: "6.0h est.", color: "outline" },
                avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuD7vYIox0tKi18hSDsUyP9K0emiKZADCGPQOnyTll5ZMnHRN_tUE7EHagGQwvLTm74-aJmPETLdTvd8npvpM2-laXymxwTLw3XCOArudLaYBlA-CjF-RJvSmpBofg3i6nJXxpte3Xori5vl3XCiLXDjW9WL4PaRso5AkHmL77DULVe3YKiiDqe9lRJOX-q6f_bOG0T0GJCdI6ljqXWrq14kq6mYDTh7x1HGYpeWy2dB9h04M4YDE11N9A"]
              },
              {
                due: "Oct 29", type: "Article", stage: "Idea", id: "SF-124",
                title: "Newsletter #84: The Renaissance of Indie Publishing Platforms",
                status1: { icon: "check_box_outline_blank", text: "Sources Tagged", color: "outline" },
                status2: { icon: "timer", text: "3.0h est.", color: "outline" },
                avatars: ["https://lh3.googleusercontent.com/aida-public/AB6AXuB-vPykVJ_1QfNGeboO4FGJm-ade1ed5rtYIgB0arbWa-0NNV9GrEKb9ArZaYOdKTM6ykXmJ5oU60NxR5NTnURMj-WB4I6KO4o7qnSfrDSOF2WsOVMfNV9vCeRYJPDzB2t4UWh-4wpG_gcikMj99XCuXvY2LXHbSh-OGKrZgSLqVY8IeTENQiO1BI1uSp_rt4oLK7w0CAt0lPDbNNkpUdPpAMr53btzqkqfO-k4k_H0Fvp6jhoD9ft-MA"]
              }
            ].map((task, idx) => (
              <div key={idx} className="p-3.5 bg-surface rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-low transition-colors shadow-xs group">
                <div className="flex items-center gap-3">
                  <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg shrink-0 ${task.due === 'Tmrw' ? 'bg-tertiary-fixed text-tertiary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    {task.due === 'Tmrw' ? (
                      <>
                        <span className="font-label-xs text-label-xs font-bold uppercase">Due</span>
                        <span className="font-headline-sm text-headline-sm font-bold leading-none">Tmrw</span>
                      </>
                    ) : (
                      <>
                        <span className="font-label-xs text-label-xs font-medium uppercase">{task.due.split(' ')[0]}</span>
                        <span className="font-headline-sm text-headline-sm font-bold leading-none text-on-surface">{task.due.split(' ')[1]}</span>
                      </>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase ${task.type === 'Video' ? 'bg-orange-100 text-orange-800' : 'bg-teal-100 text-teal-800'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${task.type === 'Video' ? 'bg-orange-600' : 'bg-teal-600'}`}></span>
                        {task.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-label-xs text-label-xs font-medium ${task.stage === 'Editing' ? 'bg-purple-100 text-purple-800' : task.stage === 'Writing' ? 'bg-orange-100 text-orange-800' : task.stage === 'Scripting' ? 'bg-primary-fixed text-primary' : 'bg-amber-100 text-amber-800'}`}>
                        Stage: {task.stage}
                      </span>
                      <span className="text-outline font-label-xs text-label-xs font-mono">{task.id}</span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                      {task.title}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pl-16 md:pl-0">
                  <div className="flex items-center gap-2 text-on-surface-variant font-label-xs text-label-xs">
                    <span className="flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded">
                      <span className={`material-symbols-outlined text-[14px] text-${task.status1.color}`}>{task.status1.icon}</span>
                      {task.status1.text}
                    </span>
                    <span className="flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded">
                      <span className={`material-symbols-outlined text-[14px] text-${task.status2.color}`}>{task.status2.icon}</span>
                      {task.status2.text}
                    </span>
                  </div>
                  <div className="flex items-center -space-x-1.5">
                    {task.avatars.map((avatar, aIdx) => (
                      <img key={aIdx} className="w-6 h-6 rounded-full object-cover ring-2 ring-surface" src={avatar} alt="avatar" />
                    ))}
                    {task.moreCount && (
                      <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant font-label-xs text-label-xs flex items-center justify-center ring-2 ring-surface font-medium">{task.moreCount}</span>
                    )}
                  </div>
                  <button className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing 4 of 14 upcoming active pipeline commitments
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* <Link to="/table" className="text-center w-full sm:w-auto px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
                View All in List View
              </Link> */}
              <Link to="/content" className="text-center w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-all active:scale-[0.99]">
                <span>Open Kanban Board</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl p-space-lg flex flex-col justify-between overflow-y-auto animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between pb-space-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">add_circle</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Create Production Task</h3>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container hover:text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <form className="space-y-4 pt-2">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-medium">Content Title</label>
                  <input className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-xs" placeholder="e.g., M4 Mac Studio Review & Benchmarks" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-medium">Format</label>
                    <select className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-xs">
                      <option value="video">Video (Longform)</option>
                      <option value="short">Short / Reel</option>
                      <option value="article">Newsletter Article</option>
                      <option value="podcast">Podcast Episode</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-medium">Initial Stage</label>
                    <select className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-xs">
                      <option value="idea">Idea Backlog</option>
                      <option value="scripting">Scripting</option>
                      <option value="recording">Recording / Writing</option>
                      <option value="editing">Editing</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-medium">Target Date</label>
                    <input className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-xs" type="date" defaultValue="2024-10-31" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-medium">Estimated Work</label>
                    <input className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-xs" placeholder="e.g., 5.5 hours" type="text" />
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-medium">Primary Goal & Angle</label>
                  <textarea className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-xs" placeholder="Core thesis, audience take-away, sponsor requirements..." rows={3}></textarea>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low space-y-2">
                  <span className="font-label-xs text-label-xs uppercase tracking-wider text-outline font-semibold">Automatic Checklists</span>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface">
                      <input defaultChecked className="rounded text-primary focus:ring-0" type="checkbox" />
                      <span>Generate Notion script blueprint</span>
                    </label>
                    <label className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface">
                      <input defaultChecked className="rounded text-primary focus:ring-0" type="checkbox" />
                      <span>Reserve Frame.io media bucket</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-surface-variant">
              <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md">Cancel</button>
              <button onClick={() => setIsDrawerOpen(false)} className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-all">Add to Pipeline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
