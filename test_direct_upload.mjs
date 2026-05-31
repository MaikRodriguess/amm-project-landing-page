import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdG50dmF6bWV5bHZ2ZGJtYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzcxOTQsImV4cCI6MjA5MTUxMzE5NH0.VuSN5L_k4VAjBdCXI9Uil40dKpGY9E7P7NjhpkiZGaw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testDirectUpload() {
  try {
    // Create a test image (1x1 transparent PNG)
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
      0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    const fileName = `test-${Date.now()}-${Math.random().toString(36).slice(2)}.png`;
    
    console.log('Testing direct upload to gallery bucket...');
    console.log('File name:', fileName);
    
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(fileName, pngBuffer, { 
        contentType: 'image/png',
        cacheControl: '3600', 
        upsert: false 
      });
    
    if (error) {
      console.log('❌ Upload error:', error.message);
      console.log('Details:', error);
      return;
    }
    
    console.log('✓ Upload successful!');
    console.log('  Response:', data);
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
    console.log('✓ Public URL:', publicUrlData.publicUrl);
    console.log('\n✓ Upload functionality is working correctly!');
    
  } catch (err) {
    console.log('❌ Error:', err.message);
    console.log('Stack:', err.stack);
  }
}

testDirectUpload();
