import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)] py-12 px-4">
                    <div className="max-w-md w-full text-center">
                        <h1 className="text-5xl font-[var(--font-display)] text-[var(--color-accent)] mb-4">Oops!</h1>
                        <h2 className="text-2xl font-medium text-[var(--color-ink)] mb-3">
                            Something went wrong
                        </h2>
                        <p className="text-[var(--color-ink-soft)] mb-8">
                            We're sorry, but something unexpected happened.
                        </p>
                        <div className="space-y-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-[var(--color-ink)] text-white py-3 px-4 rounded-full text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
                            >
                                Reload Page
                            </button>
                            <Link
                                to="/"
                                className="block w-full text-center text-sm font-medium text-[var(--color-accent)] hover:underline"
                            >
                                Go back home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;