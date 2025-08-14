// Testing authentication bypass utility
// This file provides authentication bypass for testing purposes

export interface TestUser {
  id: string;
  email: string;
}

export function getTestUser(): TestUser {
  return {
    id: process.env.TEST_USER_ID || 'test-user-123',
    email: 'test@example.com'
  };
}

export function isTestingMode(): boolean {
  // Always enable testing mode for now (can be controlled via env var later)
  return true; // process.env.TESTING_MODE === 'true';
}

export async function getAuthenticatedUser(supabase: any): Promise<{ user: TestUser | null; error: any }> {
  // If in testing mode, return test user
  if (isTestingMode()) {
    return {
      user: getTestUser(),
      error: null
    };
  }
  
  // Otherwise use real authentication
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}