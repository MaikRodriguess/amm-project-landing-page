# Admin Users Edge Function

Esta é uma Supabase Edge Function que gerencia usuários do painel admin com segurança usando a `service_role` key no backend.

## Deploy Manual

Como você não tem o Supabase CLI autenticado, faça o deploy via Supabase Dashboard:

1. Acesse: https://supabase.com/dashboard
2. Vá para seu projeto: `eotntvazmeylvvdbmbtw`
3. No menu lateral, clique em **Edge Functions**
4. Clique em **Create a new function**
5. Digite o nome: `admin-users`
6. Copie o conteúdo do arquivo `index.ts` para o editor
7. Clique em **Deploy**

Ou use a CLI com autenticação:

```bash
# Login primeiro
npx supabase login

# Depois deploy
npx supabase functions deploy admin-users --project-ref eotntvazmeylvvdbmbtw
```

## Operações Suportadas

| action | Método | Descrição |
|--------|--------|-----------|
| `list` | GET | Lista todos os usuários |
| `create` | POST | Cria novo usuário |
| `delete` | POST | Remove usuário |
| `resetPassword` | POST | Redefine senha |

## Segurança

- Requer JWT válido no header `Authorization: Bearer <token>`
- O usuário pode deletar outros usuários, mas não a si mesmo
- Usa `service_role` key automaticamente (variável de ambiente)
