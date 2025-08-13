"use client";

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-4 border border-red-300 bg-red-50 rounded-md">
      <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
      <p className="text-red-600 mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}