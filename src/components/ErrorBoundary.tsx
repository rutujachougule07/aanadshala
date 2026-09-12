import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    try {
      // Clear local storage if there was a data corruption
      localStorage.clear();
      sessionStorage.clear();
    } catch (_) {}
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-5">
            <div className="size-16 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 flex items-center justify-center text-3xl mx-auto">
              ⚠️
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-pink-400">
              वेबसाईट लोड करताना एरर आली आहे
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              स्थानिक डेटा (Cache/Storage) रिसेट करून साईट रिफ्रेश करा. यामुळे सर्व माहिती पूर्ववत सुरू होईल.
            </p>
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-6 rounded-2xl bg-linear-to-r from-pink-600 to-purple-600 text-white font-black text-sm shadow-lg shadow-pink-600/30 hover:scale-[1.02] transition-all cursor-pointer"
              >
                🔄 रिसेट करा व पुन्हा उघडा (Reset & Reload)
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                रिप्रेस करा (Refresh Page)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
