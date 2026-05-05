import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-md w-full text-center">
        <h2 className="text-6xl font-bold mb-4">404</h2>
        <h1 className="text-2xl font-bold mb-6">Page Not Found (Custom)</h1>
        <p className="text-zinc-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="px-8 py-4 bg-white text-black rounded-2xl font-bold hover:bg-zinc-200 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
