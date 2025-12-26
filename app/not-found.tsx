import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-navy-light px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold text-gold mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-6">
          Page not found
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
