# Setup Local - AMM Brasil MC Landing Page

## Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn configurado

## Passos para Executar Localmente

### 1. Clonar o Repositório

```bash
git clone <repository-url>
cd amm-project-landing-page
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_ANON_KEY=<sua-chave-supabase-aqui>
```

> **Nota**: A URL do Supabase já está configurada no código (`https://eotntvazmeylvvdbmbtw.supabase.co`)

### 4. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor vai iniciar em `http://localhost:5173` (ou a porta indicada no terminal).

## Acessando a Página Admin

1. Navegue para: `http://localhost:5173/admin`

2. Faça login com as credenciais de admin:
   - **Email**: `admin@amm-brasil.com`
   - **Senha**: `AMMsenha123`

3. Após login, você terá acesso ao **Painel Admin** onde pode:
   - Adicionar novos eventos
   - Editar eventos existentes
   - Ocultar/Restaurar eventos da agenda fixa
   - Deletar eventos customizados

## Campos de Descrição Expandidos

Os campos de descrição agora exibem **10 linhas de espaço**, permitindo melhor visualização e digitação de textos longos:

- ✅ **Adicionar Evento** → Campo de descrição com 10 linhas
- ✅ **Editar Evento** → Campo de descrição com 10 linhas

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar testes
npm run test

# Lint do código
npm run lint
```

## Troubleshooting

### Erro ao conectar com Supabase

Se aparecer erro de conexão com o Supabase:

1. Verifique se `VITE_SUPABASE_ANON_KEY` está configurada no `.env.local`
2. Confirme que a chave está correta no arquivo `.env.local`
3. Reinicie o servidor de desenvolvimento

### Porta 5173 já em uso

Se a porta padrão estiver ocupada, o servidor vai tentar a próxima porta disponível. Verifique o terminal para confirmar qual porta está sendo usada.

---

**Última atualização**: 2026-05-11
