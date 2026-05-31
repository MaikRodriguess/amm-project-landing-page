import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdG50dmF6bWV5bHZ2ZGJtYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzcxOTQsImV4cCI6MjA5MTUxMzE5NH0.VuSN5L_k4VAjBdCXI9Uil40dKpGY9E7P7NjhpkiZGaw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testBucket() {
  try {
    console.log('Testing gallery bucket...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log('❌ Error listing buckets:', bucketsError.message);
      return;
    }
    
    const galleryBucket = buckets?.find(b => b.name === 'gallery');
    if (galleryBucket) {
      console.log('✓ Gallery bucket exists!');
      console.log('  - Name:', galleryBucket.name);
      console.log('  - Public:', galleryBucket.public);
    } else {
      console.log('❌ Gallery bucket not found');
      console.log('  Available buckets:', buckets?.map(b => b.name).join(', '));
    }
    
  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

testBucket();
