import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
   const location = useLocation();

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md antialiased min-h-screen">
      <header className="fixed top-0 inset-x-0 h-14 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-variant z-50 flex items-center justify-between px-margin shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-space-md">
          <img alt="StudioFlow Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1WBIu3wMl0Tb_Gch_QF0K2kZI8kKFOT7N_MXANEbFbPAEn8sA0iv4RYh3Y2WkPXPC6aZacshBS-bUA92_6wphnVzErNuylJgyhH8cdrUlbQrW0Sx9t-aUVEAdK9Z2SMsD5m9PFsdw-PKp4oI9fCB2PBRNyX9go1Zl0v2XSCSd3_fwaSk3yN-L1qFLR1PwtIGMKrwLjTb9c8BJyQoFegEaJzbp6PGctGnQREX0H8pd7xTqswxD3tRpH7Y4n2" />
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-sm text-headline-sm text-on-surface">StudioFlow</span>
            <span className="text-outline-variant font-label-xs text-label-xs">/</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-xs text-label-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>Solo Studio (Personal)</span>
              <span className="material-symbols-outlined text-[14px] text-outline">unfold_more</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-space-md">
          <div className="relative hidden sm:flex items-center w-64 h-8 px-2.5 rounded bg-surface-container-low border border-surface-variant text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px] text-outline mr-2">search</span>
            <span className="text-on-surface-variant flex-1">Quick search...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest border border-outline-variant text-[10px] font-mono text-outline">⌘K</kbd>
          </div>
          <div className="h-5 w-px bg-surface-variant hidden sm:block"></div>
          <button className="flex items-center justify-center w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[18px]">notifications</span>
          </button>
          <div className="flex items-center gap-2 pl-1">
            <img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-surface-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFBTkSyfdQYbe16l1voPaBZhqvCiytPO05cEt-0ZmO-rvNtuU41ESOLSHMkFd3TDKqWfqULMDuTnC3jUOlgvRbuBZPi5SzvkTepFsr2ZOydcG5Xpgx8YJbUTEaQUzjO1JV333i2l_I58-O6o2z8ot5ACZO6xdi_PjBlGdhRIVA98C8pooigIuma02DFyiIny6sHWb72Iy1gkCyy2hcH-Qy6Ys82sxRHnh7REVbfeTvJMf1hp_mF3e7CQ" />
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-14 bottom-0 w-60 bg-surface-container-lowest border-r border-surface-variant z-40 flex flex-col justify-between p-space-md">
        <div className="flex flex-col gap-space-md">
          <div className="px-2 py-1">
            <p className="font-label-xs text-label-xs uppercase tracking-wider text-outline">Production Views</p>
          </div>
          <nav className="flex flex-col gap-1">
            <Link to="/overview" className={`flex items-center gap-2.5 px-2.5 py-2 rounded transition-colors font-label-md text-label-md ${location.pathname === '/overview' || location.pathname === '/' ? 'bg-primary-container text-on-primary font-medium shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Overview</span>
            </Link>
            <Link to="/content" className={`flex items-center gap-2.5 px-2.5 py-2 rounded transition-colors font-label-md text-label-md ${location.pathname === '/content' ? 'bg-primary-container text-on-primary font-medium shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[18px]">database</span>
              <span>Content Database</span>
            </Link>
            
            
          </nav>
        </div>
        <div className="flex flex-col gap-1 border-t border-surface-variant pt-space-sm">
          <div className="flex items-center justify-between px-2.5 py-2 text-on-surface-variant">
            <span className="font-label-xs text-label-xs text-outline">Storage Used</span>
            <span className="font-label-xs text-label-xs text-on-surface font-medium">4.2 / 10 GB</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1 px-0.5 overflow-hidden mb-2">
            <div className="bg-primary h-full rounded-full w-[42%]"></div>
          </div>
          <Link to="/login" className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors font-label-md text-label-md text-on-surface-variant hover:bg-error-container/20 hover:text-error w-full">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      <div className="pl-60">
        <main className="relative pt-14 min-h-screen bg-background w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
