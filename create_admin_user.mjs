import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdG50dmF6bWV5bHZ2ZGJtYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzcxOTQsImV4cCI6MjA5MTUxMzE5NH0.VuSN5L_k4VAjBdCXI9Uil40dKpGY9E7P7NjhpkiZGaw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function createAdminUser() {
  try {
    console.log('Criando novo usuário admin...');
    
    // Tentar se inscrever com o novo email
    const { data, error } = await supabase.auth.signUp({
      email: 'maik.rs93@hotmail.com',
      password: 'AMMsenha123'
    });
    
    if (error) {
      console.log('❌ Erro ao criar usuário:', error.message);
      return;
    }
    
    console.log('✓ Usuário criado com sucesso!');
    console.log('  Email:', data.user?.email);
    console.log('  ID:', data.user?.id);
    
    // Tentar fazer login para confirmar
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'maik.rs93@hotmail.com',
      password: 'AMMsenha123'
    });
    
    if (loginError) {
      console.log('⚠️  Usuário criado, mas não foi possível fazer login imediatamente.');
      console.log('   (Pode ser necessário confirmar o email primeiro)');
      return;
    }
    
    console.log('✓ Login funcionando com o novo email!');
    
  } catch (err) {
    console.log('❌ Erro:', err.message);
  }
}

createAdminUser();
