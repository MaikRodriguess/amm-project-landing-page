# Configuração do Google Analytics

Este guia explica como configurar e utilizar Google Analytics no AMM Brasil MC.

## 1️⃣ Criar Conta no Google Analytics

1. Acesse [Google Analytics](https://analytics.google.com)
2. Clique em **"Criar conta"**
3. Preencha os dados:
   - **Nome da conta**: AMM Brasil MC
   - **Nome da propriedade**: AMM Brasil (ou seu domínio)
   - **Fuso horário**: América/Porto Velho
   - **Moeda**: BRL
4. Complete a configuração com dados do site

## 2️⃣ Obter ID de Rastreamento

Após criar a propriedade, você receberá um **ID de Medição** (formato: `G-XXXXXXXXXX`)

## 3️⃣ Configurar no Projeto

### Passo 1: Atualizar `index.html`

Substitua `G-XXXXXXXXXX` pelo seu ID de medição real em dois lugares:

```html
<!-- Antes -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
...
gtag('config', 'G-XXXXXXXXXX');

<!-- Depois -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID_REAL"></script>
...
gtag('config', 'G-SEU_ID_REAL');
```

### Passo 2: Usar os Eventos no Código (Opcional)

O projeto agora inclui `src/lib/analytics.ts` com eventos customizados:

```typescript
import { trackGalleryEvent, trackEventInteraction } from '../lib/analytics'

// Quando usuário abre um álbum
trackGalleryEvent('album_opened', 'Regional Vilhena')

// Quando clica em um evento
trackEventInteraction('Festa de Motoclube')
```

## 4️⃣ Verificar Funcionamento

1. Deploy seu site
2. Acesse [Google Analytics](https://analytics.google.com)
3. Vá em **Relatórios > Tempo real**
4. Abra seu site em outra aba
5. Você deve ver a atividade em tempo real

## 📊 Dados que Serão Rastreados

✅ Visitantes (localização, dispositivo, navegador)
✅ Páginas visitadas
✅ Tempo no site
✅ Interações com galeria (abrir álbum)
✅ Cliques em eventos
✅ Downloads de materiais

## 🔗 Eventos Customizados Disponíveis

```typescript
// Rastrear evento customizado
trackEvent('meu_evento', { dados: 'valor' })

// Galeria
trackGalleryEvent('album_opened', 'Nome do Álbum')
trackGalleryEvent('photo_viewed', 'Foto 1')

// Eventos
trackEventInteraction('Nome do Evento')

// Materiais
trackMaterialDownload('O Grande Conflito')

// Formulário
trackFormSubmit('contato')
```

## ⚙️ Próximos Passos (Opcional)

- Configurar metas personalizadas (Contato, Download, etc)
- Adicionar rastreamento de conversão
- Criar dashboards customizados
- Configurar alertas para queda de tráfego

## 📚 Documentação Oficial

[Google Analytics 4 - Getting Started](https://support.google.com/analytics/answer/10089681)
