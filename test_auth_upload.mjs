import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdG50dmF6bWV5bHZ2ZGJtYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzcxOTQsImV4cCI6MjA5MTUxMzE5NH0.VuSN5L_k4VAjBdCXI9Uil40dKpGY9E7P7NjhpkiZGaw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testAuthFlow() {
  try {
    // Step 1: Try to sign in as admin
    console.log('Step 1: Attempting to login as admin...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@amm-brasil.com',
      password: 'AMMsenha123'
    });
    
    if (authError) {
      console.log('❌ Login failed:', authError.message);
      return;
    }
    
    console.log('✓ Login successful!');
    console.log('  User ID:', authData.user?.id);
    console.log('  Session token available:', !!authData.session?.access_token);
    
    // Step 2: Try upload with authenticated session
    console.log('\nStep 2: Testing upload with authenticated session...');
    
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
      0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    const fileName = `test-auth-${Date.now()}-${Math.random().toString(36).slice(2)}.png`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, pngBuffer, { 
        contentType: 'image/png',
        cacheControl: '3600', 
        upsert: false 
      });
    
    if (uploadError) {
      console.log('❌ Upload error:', uploadError.message);
      console.log('Details:', uploadError);
      return;
    }
    
    console.log('✓ Upload successful!');
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
    console.log('✓ Public URL:', publicUrlData.publicUrl);
    console.log('\n✓ Full upload workflow is working correctly!');
    console.log('✓ Admin can authenticate and upload images to Supabase Storage');
    
  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

testAuthFlow();
