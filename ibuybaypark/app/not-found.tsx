import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand to-brand-light px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-6">Page not found</h2>
        <p className="text-xl text-gray-300 mb-10">
          That page doesn&rsquo;t exist. If you were looking for a cash offer on your Bay Park
          home, the form is on the home page.
        </p>
        <Link href="/">
          <Button size="lg">Back to the home page</Button>
        </Link>
      </div>
    </div>
  );
}
