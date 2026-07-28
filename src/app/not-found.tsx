import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-warm-ivory">
      <div className="w-20 h-20 rounded-full bg-deep-emerald/10 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-deep-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-dark-forest mb-4">Page Not Found</h1>
      <p className="text-dark-text/70 max-w-md mb-8">
        The page you are looking for does not exist or has been moved. Please check the URL
        or navigate to one of our main pages.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-deep-emerald hover:bg-dark-forest text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Return Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border-2 border-deep-emerald text-deep-emerald hover:bg-deep-emerald hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
