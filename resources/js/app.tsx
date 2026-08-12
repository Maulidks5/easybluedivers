import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { Component, type ErrorInfo, type ReactNode } from 'react';

const pages = import.meta.glob('./pages/**/*.tsx');

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Easy Blue application render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return <main className="flex min-h-screen items-center justify-center bg-surface p-6"><section className="w-full max-w-lg rounded-3xl border border-border bg-card p-7 text-center shadow-lg"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Easy Blue Divers</p><h1 className="mt-3 text-2xl font-extrabold text-navy">This page needs a refresh</h1><p className="mt-3 text-sm leading-relaxed text-muted-foreground">The page could not finish loading. Reload once; if the problem continues, send this message to the developer.</p><pre className="mt-5 overflow-auto rounded-xl bg-surface p-4 text-left text-xs text-destructive">{this.state.error.message}</pre><button type="button" onClick={() => window.location.reload()} className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Reload page</button></section></main>;
    }

    return this.props.children;
  }
}

createInertiaApp({
  resolve: (name) => pages[`./pages/${name}.tsx`](),
  setup({ el, App, props }) {
    createRoot(el).render(<AppErrorBoundary><App {...props} /></AppErrorBoundary>);
  },
});
