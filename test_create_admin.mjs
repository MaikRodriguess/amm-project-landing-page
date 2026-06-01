import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdG50dmF6bWV5bHZ2ZGJtYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzcxOTQsImV4cCI6MjA5MTUxMzE5NH0.VuSN5L_k4VAjBdCXI9Uil40dKpGY9E7P7NjhpkiZGaw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testCreate() {
  try {
    // Login com admin original
    const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'admin@amm-brasil.com',
      password: 'AMMsenha123'
    });

    if (loginError) {
      console.log('❌ Login failed:', loginError.message);
      return;
    }

    console.log('✓ Logged in as admin@amm-brasil.com');

    // Criar usuário
    const { data, error } = await supabase.functions.invoke('admin-users?action=create', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authData.session.access_token}` },
      body: { email: 'user123@example.com', password: 'Pass1234' }
    });

    if (error) {
      console.log('❌ Create error:', error?.context?.status, error?.message);
    } else {
      console.log('✓ User created!', data);
    }

  } catch (err) {
    console.log('Exception:', err.message);
  }
}

testCreate();
