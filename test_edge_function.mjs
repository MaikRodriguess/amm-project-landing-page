import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdG50dmF6bWV5bHZ2ZGJtYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzcxOTQsImV4cCI6MjA5MTUxMzE5NH0.VuSN5L_k4VAjBdCXI9Uil40dKpGY9E7P7NjhpkiZGaw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testCreateUser() {
  try {
    // Tentar direto com admin@amm-brasil.com
    console.log('Tentando login com admin@amm-brasil.com...');
    const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'admin@amm-brasil.com',
      password: 'AMMsenha123'
    });

    if (loginError) {
      console.log('❌ Login failed:', loginError.message);
      console.log('Tentando criar usuário diretamente via signUp...');
      
      // Tentar criar novo usuário
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'test-user@example.com',
        password: 'TestPassword123'
      });
      
      if (signUpError) {
        console.log('❌ SignUp failed:', signUpError.message);
      } else {
        console.log('✓ SignUp successful:', signUpData.user?.email);
      }
      return;
    }

    console.log('✓ Logged in as:', authData.user?.email);
    const token = authData.session.access_token;

    // Testar list primeiro
    console.log('\nTestando listAdminUsers...');
    const { data: listData, error: listError } = await supabase.functions.invoke('admin-users?action=list', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (listError) {
      console.log('❌ List error:', listError);
    } else {
      console.log('✓ List response:', listData);
    }

  } catch (err) {
    console.log('❌ Exception:', err.message);
  }
}

testCreateUser();
