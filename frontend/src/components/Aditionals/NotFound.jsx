import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)] py-12 px-4">
            <div className="max-w-md w-full text-center">
                <h1 className="text-8xl font-[var(--font-display)] text-[var(--color-accent)]">404</h1>
                <h2 className="mt-4 text-2xl font-medium text-[var(--color-ink)]">
                    Page not found
                </h2>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                    Sorry, we couldn't find the page you're looking for.
                </p>

                <div className="mt-8 space-y-4">
                    <Link
                        to="/"
                        className="inline-flex items-center px-7 py-3 text-sm font-medium rounded-full text-white bg-[var(--color-ink)] hover:bg-[var(--color-accent)] transition-colors"
                    >
                        Go back home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="block w-full text-center text-sm font-medium text-[var(--color-accent)] hover:underline"
                    >
                        Or go back to previous page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
