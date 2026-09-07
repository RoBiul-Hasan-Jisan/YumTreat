import { Link } from "react-router";

const Unauthorized = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[var(--color-paper)] px-4">
            <h1 className="text-6xl font-[var(--font-display)] text-[var(--color-accent)]">403</h1>
            <h2 className="mt-4 text-2xl font-medium text-[var(--color-ink)]">Unauthorized</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">You don't have access to this page.</p>
            <Link
                to="/sign_in"
                className="mt-8 inline-block px-7 py-3 text-sm font-medium rounded-full text-white bg-[var(--color-ink)] hover:bg-[var(--color-accent)] transition-colors"
            >
                Sign In
            </Link>
        </div>
    );
};

export default Unauthorized;
