import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdG50dmF6bWV5bHZ2ZGJtYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzcxOTQsImV4cCI6MjA5MTUxMzE5NH0.VuSN5L_k4VAjBdCXI9Uil40dKpGY9E7P7NjhpkiZGaw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function updateAdmin() {
  try {
    console.log('Testando novo email de admin...');
    
    // Tentar fazer login com o novo email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'maik.rs93@hotmail.com',
      password: 'AMMsenha123'
    });
    
    if (error) {
      console.log('❌ Usuário não encontrado ou senha incorreta.');
      console.log('   Você precisa criar um novo usuário no Supabase Dashboard:');
      console.log('   1. Vá para: https://supabase.com/dashboard');
      console.log('   2. Acesse seu projeto');
      console.log('   3. Vá em Authentication > Users');
      console.log('   4. Clique em "Invite" e adicione: maik.rs93@hotmail.com');
      console.log('   5. Defina a senha como: AMMsenha123');
      return;
    }
    
    console.log('✓ Usuário encontrado!');
    console.log('  Email:', data.user?.email);
    console.log('✓ Login funcionou com o novo email!');
    
  } catch (err) {
    console.log('❌ Erro:', err.message);
  }
}

updateAdmin();
