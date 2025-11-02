'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Please try again.
          </p>
          {error.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 font-mono">
                {error.message}
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Try again
            </button>
            <a
              href="/"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
