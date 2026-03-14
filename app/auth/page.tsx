import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { CrunchWrapLogo } from '@/components/CrunchWrapLogo';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground">
      <div className="bg-surface rounded-[32px] p-8 md:p-12 shadow-sm max-w-md w-full mx-auto border border-black/5 dark:border-white/5 text-center">
        <div className="flex justify-center mb-6">
          <CrunchWrapLogo />
        </div>
        <h1 className="font-serif text-3xl tracking-tight text-foreground">Crunch Wrap</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 font-sans text-sm">Your files, crunched. Your insights, wrapped.</p>
        <div className="mt-10">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
