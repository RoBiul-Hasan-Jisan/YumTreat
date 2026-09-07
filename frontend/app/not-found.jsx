import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-display text-8xl font-extrabold text-ember-500">404</span>
      <h1 className="font-display text-2xl font-bold text-ink-950">This plate isn&apos;t on the menu</h1>
      <p className="max-w-sm text-sm text-ink-900/60">
        The page you&apos;re looking for doesn&apos;t exist, or it may have been moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </section>
  );
}
