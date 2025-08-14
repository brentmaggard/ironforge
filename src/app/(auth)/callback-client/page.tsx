"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function CallbackClientPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = createSupabaseBrowser();
        
        // First check if there's a code parameter (PKCE flow)
        const code = searchParams.get('code');
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            setError(error.message);
            setLoading(false);
            return;
          }
          if (data.session) {
            router.replace('/workouts');
            return;
          }
        }
        
        // Check for URL hash fragments (implicit flow)
        const hashFragment = window.location.hash;
        if (hashFragment) {
          const params = new URLSearchParams(hashFragment.substring(1));
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');
          
          if (accessToken && refreshToken) {
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            if (error) {
              setError(error.message);
              setLoading(false);
              return;
            }
            
            if (data.session) {
              // Clear the URL hash and redirect
              window.history.replaceState({}, document.title, window.location.pathname);
              router.replace('/workouts');
              return;
            }
          }
        }
        
        // Check if user is already authenticated
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.replace('/workouts');
          return;
        }
        
        // If we get here, something went wrong
        setError('No valid authentication tokens found');
        setLoading(false);
        
      } catch (err) {
        console.error('Callback error:', err);
        setError('An error occurred during authentication');
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Completing sign in...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Authentication Failed</h1>
          <p className="text-sm text-gray-600 mb-6">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/login')}
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2 font-medium"
            >
              Back to Login
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}