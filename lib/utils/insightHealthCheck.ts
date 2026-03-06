import { createClient } from '@/lib/supabase/client';

export async function checkStuckInsights() {
  const supabase = createClient();
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('insights')
    .update({ processing_status: 'error' })
    .eq('processing_status', 'analyzing')
    .lt('created_at', tenMinutesAgo)
    .select();

  if (error) {
    console.error('Error checking stuck insights:', error);
    return;
  }

  return data;
}
