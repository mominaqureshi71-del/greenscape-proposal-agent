import { createClient } from "@supabase/supabase-js";

// Client-side (browser-safe) client using the publishable/anon key
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Server-side client using the secret key - only ever import this
// inside files under /pages/api, never in browser-rendered code.
export function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}
