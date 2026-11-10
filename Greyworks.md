# IDENTIDADE VISUAL, DESIGN SYSTEM & DIRETRIZES DE UI — GREYWORKS
**Criador & Fundador:** Vitor Grey  
**Marca Estúdio (Guarda-Chuva):** GreyWorks (`greyworks.com.br` | `@greyworks.ai`)  
**Propósito do Documento:** Este arquivo é a fonte única da verdade para Inteligências Artificiais e desenvolvedores. Toda geração de interface (HTML, CSS, Tailwind, Django Templates, React, etc.), gráficos e páginas de sistemas do ecossistema GreyWorks DEVE seguir estritamente os tokens e regras abaixo.

---

## 0. INSTRUÇÕES DIRETAS PARA A IA (SYSTEM DIRECTIVE)
Sempre que você criar ou refatorar telas para um projeto da **GreyWorks**:
1. **Proibido Visual Genérico:** Nunca utilize fundos brancos puros ou o azul padrão de frameworks (`#3B82F6` como cor primária). O padrão GreyWorks é **Dark-First Industrial** (baseado em carbono, grafite metálico e bordas sutis de 1px).
2. **Contraste de Precisão:** Utilize a escala de cinzas metálicos para hierarquia de informação e reserve o **Verde Tech (`#00DC82`)** exclusivamente para ações principais (CTAs), indicadores positivos, foco ativo e a assinatura da marca.
3. **Tipografia Obrigatória:** Importe sempre `Space Grotesk`, `Inter` e `JetBrains Mono` via Google Fonts. Nunca exiba números de métricas ou cabeçalhos na fonte padrão do sistema.
4. **Assinatura de Ecossistema:** Todo SaaS desenvolvido sob este guia deve exibir o selo de endosso **`by GreyWorks`**.

---

## 1. PALETA DE CORES (DESIGN TOKENS)

### 1.1 Base Industrial & Sólida (A Engenharia / O "Grey")
| Token / Função | Hex / Valor | Aplicação Obrigatória |
| :--- | :--- | :--- |
| **Fundo Profundo (Carbon Imersivo)** | `#0B0D11` | Background principal da aplicação (`body`). |
| **Fundo Painel Executivo / Dashboard** | `#0D1017` | Janela do painel interativo e containers de visão geral. |
| **Fundo Sidebar & Módulos** | `#10131B` | Menu lateral de navegação, barra de filtros e painéis de controle. |
| **Cards & Superfícies de Métricas** | `#141722` / `#181C24` | Cards de KPIs, blocos de conteúdo, modais e tabelas. |
| **Fundo Hover de Cards** | `#1B202D` / `#202636` | Estado `:hover` em cards interativos e linhas de tabela. |
| **Bordas Metálicas Discretas** | `#1E2330` / `#262B35` | Bordas estruturais de 1px (ou `rgba(255, 255, 255, 0.08)`). |
| **Bordas de Foco / Hover Ativo** | `rgba(255, 255, 255, 0.18)` | Destaque de borda ao passar o mouse ou focar em um container. |

### 1.2 Tipografia & Escala de Cinzas Metálicos
| Token / Função | Hex | Aplicação Obrigatória |
| :--- | :--- | :--- |
| **Branco Puro** | `#FFFFFF` | Palavra **"Grey"** na logo, títulos `H1`/`H2`, valores principais de métricas. |
| **Prata Claro** | `#E2E8F0` | Textos de parágrafos principais, rótulos de inputs e leitura primária. |
| **Cinza Metálico** | `#9CA3AF` | Palavra **"Works"** na logo, subtítulos, descrições secundárias e legendas. |
| **Cinza Escuro de Suporte** | `#64748B` | Labels de eixos em gráficos, placeholders de inputs, metadados e ícones inativos. |

### 1.3 Cor de Assinatura Oficial (Signature Accent / O Propósito & Lucro)
* **Verde Tech (Signature Green):** `#00DC82`
* **Verde Tech Hover:** `#00B86B`
* **Verde Tech Glow / Sombra:** `rgba(0, 220, 130, 0.35)`
* **Superfície Verde Sutil (Badges/Fundo):** `rgba(0, 220, 130, 0.10)`
* **Conceito:** Quebra o monocromático cinza com elegância tecnológica e energia. Usado em botões primários, indicadores de lucro/eficiência, status online e no ponto final da wordmark (`GreyWorks.`).

### 1.4 Cores Funcionais & Alertas Operacionais
* **Coral Alerta / Despesas (`#F87171`):** Linha de custos/saídas em gráficos, barras de custos atípicos e variações negativas leves.
* **Vermelho Crítico (`#EF4444`):** Alertas de orçamento estourado, exclusão de dados, erros de sistema e badges críticos.
* **Âmbar Atenção (`#F59E0B`):** Detecção de outliers, estoque baixo, avisos preventivos e desvios em taxas.
* **Azul Informação (`#3B82F6`):** Indicadores neutros de sistema, links técnicos de suporte e filtros informativos.

### 1.5 Variáveis CSS Prontas (`:root`)
```css
:root {
  /* Backgrounds */
  --gw-bg-carbon: #0B0D11;
  --gw-bg-dashboard: #0D1017;
  --gw-bg-sidebar: #10131B;
  --gw-bg-card: #141722;
  --gw-bg-card-alt: #181C24;
  --gw-bg-card-hover: #1B202D;
  --gw-bg-card-hover-alt: #202636;

  /* Borders */
  --gw-border-subtle: #1E2330;
  --gw-border-metallic: #262B35;
  --gw-border-alpha: rgba(255, 255, 255, 0.08);
  --gw-border-focus: rgba(255, 255, 255, 0.18);

  /* Typography Colors */
  --gw-text-white: #FFFFFF;
  --gw-text-silver: #E2E8F0;
  --gw-text-metallic: #9CA3AF;
  --gw-text-muted: #64748B;

  /* Signature & Status */
  --gw-accent-green: #00DC82;
  --gw-accent-green-hover: #00B86B;
  --gw-accent-glow: rgba(0, 220, 130, 0.35);
  --gw-accent-surface: rgba(0, 220, 130, 0.10);
  --gw-alert-coral: #F87171;
  --gw-alert-red: #EF4444;
  --gw-alert-amber: #F59E0B;
  --gw-info-blue: #3B82F6;

  /* Fonts */
  --gw-font-display: 'Space Grotesk', sans-serif;
  --gw-font-sans: 'Inter', sans-serif;
  --gw-font-mono: 'JetBrains Mono', monospace;
}
```
## 2. TIPOGRAFIA, GEOMETRIA & COMPONENTES OBRIGATÓRIOS

### 2.1 Mapeamento de Fontes
- **Títulos & Cabeçalhos (`H1` a `H4`, Nome de Módulos):** `var(--gw-font-display)` (`Space Grotesk`), peso `600` ou `700`, `letter-spacing: -0.02em`.
- **Corpo, Menus, Labels & Tabelas (Texto):** `var(--gw-font-sans)` (`Inter`), peso `400` ou `500`.
- **Números de KPIs, Valores Monetários, IDs, Datas & Badges:** `var(--gw-font-mono)` (`JetBrains Mono`), com `font-variant-numeric: tabular-nums`.

### 2.2 Geometria & Estrutura (Padrão Industrial)
- **Border Radius:** Cards e Modais (`8px`), Botões e Inputs (`6px`), Badges e Tags (`4px`). Proibido usar botões em formato pílula (`9999px`) para ações principais.
- **Hierarquia de Superfícies:** Use `--gw-bg-card` (`#141722`) para containers principais e `--gw-bg-card-alt` (`#181C24`) para sub-blocos internos, barras de ferramentas de tabelas e fundo de inputs (`#0B0D11` ou `#181C24`).
- **Sombras:** Evite sombras difusas pesadas; priorize separação por borda de `1px solid var(--gw-border-subtle)`. Em botões primários ativos, aplique glow sutil: `0 0 16px var(--gw-accent-glow)`.

### 2.3 Regras de Botões & Inputs
- **Botão Primário (CTA):** Fundo `#00DC82`, texto obrigatoriamente em **`#0B0D11` (Carbono)** com `font-weight: 600`. Hover com fundo `#00B86B`.
- **Botão Secundário:** Fundo `#181C24`, borda `1px solid #262B35`, texto `#E2E8F0`. Hover com fundo `#202636` e borda `rgba(255, 255, 255, 0.18)`.
- **Inputs & Selects:** Fundo `#0B0D11`, borda `1px solid #1E2330`, texto `#E2E8F0`, placeholder `#64748B`. Em `:focus`, borda `#00DC82` e `outline: none`.

### 2.4 Assinatura Padrão (HTML Oficial)
- **Wordmark Principal:**
  `<span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; letter-spacing: -0.03em;"><span style="color: #FFFFFF;">Grey</span><span style="color: #9CA3AF;">Works</span><span style="color: #00DC82;">.</span></span>`
- **Selo de Endosso (Sidebar / Login / Footer):**
  `<span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #64748B;">by <strong style="color: #FFFFFF; font-weight: 600;">Grey</strong><span style="color: #9CA3AF;">Works</span><span style="color: #00DC82;">.</span></span>`