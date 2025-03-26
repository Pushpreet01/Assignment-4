import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.EXPO_PUBLIC_API_URL || "default_api_url",
    process.env.EXPO_PUBLIC_API_KEY || "default_api_key"
);

export default supabase;