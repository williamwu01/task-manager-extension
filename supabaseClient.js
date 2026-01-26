import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ⚠️ SAFE to expose anon key (with RLS ON)
const SUPABASE_URL = 'https://gterxduhhbenetifpgqn.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_7KNwZPf8-UWY_08ItfD7PA_KVNzlASb';

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
); 