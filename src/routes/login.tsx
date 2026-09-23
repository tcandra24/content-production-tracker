import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import { getCurrentSession } from '#/server/function/session'
import { useState } from 'react';
import { useForm } from '@tanstack/react-form'
import { authClient } from '#/lib/auth-client';
import { loginSchema } from '#/lib/schemas/auth';

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const session = await getCurrentSession()
    if (session) throw redirect({ to: '/overview' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('')
  const [buttonState, setButtonState] = useState<'default' | 'loading' | 'success'>('default');
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onSubmit: loginSchema
    },
    onSubmit: async ({value}) => {
      setSubmitError('')
      setButtonState('loading')
      
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password
      })

      if (error) {
        setSubmitError(error.message as string)
        setButtonState('default')
        return
      }

      setButtonState('success')
      setTimeout(() => navigate({ to: '/overview' }), 800)
    }
  })

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md antialiased min-h-screen flex items-center justify-center p-margin">
      <div className="flex flex-col w-full items-center justify-center py-10 px-4 sm:px-6">
        <div className="relative w-full max-w-105">
          <div className="absolute -top-16 -left-12 w-64 h-64 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute -bottom-16 -right-12 w-56 h-56 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl p-8 sm:p-10 flex flex-col items-center">
            <div className="flex flex-col items-center mb-8 w-full">
              <div className="h-10 flex items-center justify-center mb-6">
                <img alt="StudioFlow Logo" className="h-16 w-auto object-contain" src="/logo.png"/>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface text-center tracking-tight">
                Welcome back, Creator
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-1.5 max-w-75">
                Sign in to access your production command center
              </p>
            </div>
            <form className="w-full space-y-4" onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}>
              <form.Field name='email'>
                { (field) => (
                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm text-on-surface" htmlFor={field.name}>
                      Editorial Account
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-2 text-outline text-[18px] pointer-events-none">
                        alternate_email
                      </span>
                      <input
                        id={field.name}
                        name={field.name}
                        className="w-full h-10 pl-10 pr-3 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface transition-all duration-150 outline-none focus:shadow-md"
                        placeholder="Enter Email"
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-error text-xs">
                        {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                      </p>
                    )}
                  </div>
                ) }
              </form.Field>
              <form.Field name='password'>
                { (field) => (
                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm text-on-surface" htmlFor={field.name}>
                      Keyphrase
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-2 text-outline text-[18px] pointer-events-none">
                        lock
                      </span>
                      <input
                        id={field.name}
                        name={field.name}
                        className="w-full h-10 pl-10 pr-10 bg-surface-container-low focus:bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface transition-all duration-150 outline-none focus:shadow-md"
                        placeholder="Enter password"
                        type={showPassword ? 'text' : 'password'}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <button
                        aria-label="Toggle password visibility"
                        className="absolute right-2.5 p-1 text-outline hover:text-on-surface rounded transition-colors flex items-center justify-center focus:outline-none"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? 'visibility' : 'visibility_off'}
                        </span>
                      </button>
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-error text-xs">
                        {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                      </p>
                    )}
                  </div>
                ) }
              </form.Field>

              {submitError && <p className="text-error text-xs font-label-xs">{submitError}</p>}

              <div className="pt-2">
                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                  {([canSubmit, isSubmitting]) => (
                    <button
                      disabled={!canSubmit || isSubmitting}
                      className={`w-full h-11 text-on-primary rounded-lg font-label-md text-label-md transition-all duration-150 flex items-center justify-center gap-2 shadow-sm shadow-primary/25 cursor-pointer ${
                        buttonState === 'success' ? 'bg-secondary' : 'bg-primary-container hover:bg-primary active:scale-[0.99]'
                      }`}
                      type="submit"
                    >
                      {buttonState === 'default' && (
                        <>
                          <span>Sign In</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
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
                  )}
                </form.Subscribe>
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
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center px-2 text-outline">
            <div className="flex items-center gap-3 font-label-xs text-label-xs">
              <span>UTC { new Date().getTimezoneOffset() / 60 }</span>
              <span>•</span>
              <span>v0.9.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
