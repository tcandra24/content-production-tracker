import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('alex@studioflow.io');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonState, setButtonState] = useState<'default' | 'loading' | 'success'>('default');
  const navigate = useNavigate();

  const handleLogin = (e: import("react").FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setButtonState('loading');
    
    setTimeout(() => {
      setButtonState('success');
      setTimeout(() => {
        navigate({
          to: '/overview'
        });
      }, 1500);
    }, 1000);
  };

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md antialiased min-h-screen flex items-center justify-center p-margin">
      <div className="flex flex-col w-full items-center justify-center py-10 px-4 sm:px-6">
        <div className="relative w-full max-w-105">
          <div className="absolute -top-16 -left-12 w-64 h-64 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute -bottom-16 -right-12 w-56 h-56 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl p-8 sm:p-10 flex flex-col items-center">
            <div className="flex flex-col items-center mb-8 w-full">
              <div className="h-10 flex items-center justify-center mb-6">
                <img alt="StudioFlow Logo" className="h-9 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1WBIu3wMl0Tb_Gch_QF0K2kZI8kKFOT7N_MXANEbFbPAEn8sA0iv4RYh3Y2WkPXPC6aZacshBS-bUA92_6wphnVzErNuylJgyhH8cdrUlbQrW0Sx9t-aUVEAdK9Z2SMsD5m9PFsdw-PKp4oI9fCB2PBRNyX9go1Zl0v2XSCSd3_fwaSk3yN-L1qFLR1PwtIGMKrwLjTb9c8BJyQoFegEaJzbp6PGctGnQREX0H8pd7xTqswxD3tRpH7Y4n2"/>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Studio Engine v2.4</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface text-center tracking-tight">
                Welcome back, Creator
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-1.5 max-w-75">
                Sign in to access your production command center
              </p>
            </div>
            <form className="w-full space-y-4" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <label className="block font-label-sm text-label-sm text-on-surface" htmlFor="email">
                  Editorial Account
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px] pointer-events-none">
                    alternate_email
                  </span>
                  <input className="w-full h-10 pl-9 pr-3 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface transition-all duration-150 outline-none focus:shadow-md" id="email" placeholder="name@studioflow.io" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block font-label-sm text-label-sm text-on-surface" htmlFor="password">
                    Keyphrase
                  </label>
                  <span className="font-label-xs text-label-xs text-outline cursor-pointer hover:text-primary transition-colors">
                    Session vault
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px] pointer-events-none">
                    lock
                  </span>
                  <input className="w-full h-10 pl-9 pr-10 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface transition-all duration-150 outline-none focus:shadow-md" id="password" placeholder="Enter password" required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button aria-label="Toggle password visibility" className="absolute right-2.5 p-1 text-outline hover:text-on-surface rounded transition-colors flex items-center justify-center focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <input defaultChecked className="sr-only peer" id="rememberMe" type="checkbox"/>
                  <div className="w-4 h-4 rounded bg-surface-container-low peer-checked:bg-primary-container flex items-center justify-center transition-all duration-150 shadow-sm">
                    <span className="material-symbols-outlined text-white text-[12px] opacity-0 peer-checked:opacity-100 transition-opacity">
                      check
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                    Maintain terminal session
                  </span>
                </label>
                <span className="font-label-xs text-label-xs text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">shield</span> Encrypted
                </span>
              </div>
              <div className="pt-2">
                <button disabled={isSubmitting} className={`w-full h-11 text-on-primary rounded-lg font-label-md text-label-md transition-all duration-150 flex items-center justify-center gap-2 shadow-sm shadow-primary/25 cursor-pointer ${buttonState === 'success' ? 'bg-secondary' : 'bg-primary-container hover:bg-primary active:scale-[0.99]'}`} type="submit">
                  {buttonState === 'default' && (
                    <>
                      <span>Sign In</span>
                      <span className="material-symbols-outlined text-[18px] transition-transform duration-150 group-hover:translate-x-0.5">
                        arrow_forward
                      </span>
                    </>
                  )}
                  {buttonState === 'loading' && (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                      <span>Authenticating...</span>
                    </>
                  )}
                  {buttonState === 'success' && (
                    <>
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      <span>Access Granted</span>
                    </>
                  )}
                </button>
              </div>
            </form>
            <div className="mt-8 pt-6 w-full flex flex-col items-center justify-center">
              <div className="w-full h-px bg-surface-variant mb-6"></div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container-low text-center">
                <span className="material-symbols-outlined text-[15px] text-tertiary">lock_person</span>
                <p className="font-label-xs text-label-xs text-on-surface-variant">
                  Private command center — invite only access.
                </p>
              </div>
              <p className="font-label-xs text-label-xs text-outline mt-3 text-center">
                Pipeline ID: <span className="font-mono text-outline">sf-node-9421-prod</span>
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between px-2 text-outline">
            <div className="flex items-center gap-1.5 font-label-xs text-label-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
              <span>Relay status: nominal</span>
            </div>
            <div className="flex items-center gap-3 font-label-xs text-label-xs">
              <span>UTC+00:00</span>
              <span>•</span>
              <span>v3.12.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
