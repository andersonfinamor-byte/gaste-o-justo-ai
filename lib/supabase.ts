import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://dotztjzctnqenenmnapl.supabase.co";

const supabaseKey =
  "sb_publishable_lfcTm8LCFoU6To2JXfGy2Q_NQFaMsNz";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);