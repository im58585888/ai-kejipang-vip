import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://szevzzryysnujiyuincb.supabase.co";
const supabasePublishableKey = "sb_publishable_aopQEW0VurMuNlUjXVxDXA_WohA3ux_";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, flowType: "pkce" },
});
