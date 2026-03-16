# Arquitetura de geração

_(com descrição explícita da navegação e dos controles interativos nas páginas de Discover, Portfolio, Marketing Page e Minicursos do Roadmap)_

Esta documentação descreve **não apenas o layout das telas**, mas também **como o usuário navega dentro delas**, quais controles existem e como cada interação altera o estado do sistema.

A plataforma organiza-se em quatro áreas principais:

`Discover Startup Portfolio Marketing Page Roadmap`

Cada uma tem **controles de navegação próprios**, além da navegação global da sidebar.

---

# 1. Navegação Global

A navegação primária da plataforma ocorre pela **Sidebar persistente**.

## Sidebar

`┌──────────────────────────┐ │ Logo                     │ │                          │ │ Discover                 │ │ Startup Account          │ │ Marketing Page           │ │ Roadmap                  │ │                          │ │ Settings                 │ └──────────────────────────┘`

### Controles

**Clique em item da sidebar**

`action → navigate(view)`

**Estado ativo**

- highlight visual
    
- borda lateral colorida
    

---

# 2. Discover

O Discover possui **três formas de navegação**:

`graph interaction command search startup cards`

---

# 2.1 Navegação pelo Graph

## Interação

### Hover Node

efeito:

`node scale ↑ tooltip aparece`

tooltip mostra:

`startup name category score`

---

### Click Node

abre o **portfolio público da startup**

`navigate → /startup/{id}`

---

### Drag Node

permite reorganizar visualmente o grafo.

controle:

`dragstart drag dragend`

---

# 2.2 Command Bar

ativação:

`Cmd/Ctrl + K`

overlay:

`graph escurece barra aparece centralizada`

layout:

`┌───────────────────────────────┐ │ Search startups               │ │                               │ │ result list                   │ └───────────────────────────────┘`

### Controles

**Arrow keys**

`↑ ↓`

navegam resultados.

**Enter**

`open portfolio`

---

# 2.3 Cards de Startup

Cada card contém **dois caminhos de navegação**.

`┌───────────────────────────────┐ │ Startup Name                  │ │ Tagline                       │ │ Category / Stage              │ │ Score                         │ │                               │ │ [View Portfolio] [Vitrine]    │ └───────────────────────────────┘`

### Controles

**clicar no nome**

`/startup/{id}`

abre o portfolio.

---

**clicar em Vitrine**

`/startup/{id}/vitrine`

abre a página de marketing.

---

# 3. Portfolio da Startup

O portfolio funciona como **página de leitura estruturada da startup**.

## Layout

`Startup Header  Navigation Tabs  ┌──────────────────────────────┐ │ Overview                     │ │ Market                       │ │ Product                      │ │ Business                     │ │ Metrics                      │ │ Score                        │ └──────────────────────────────┘`

---

# 3.1 Header do Portfolio

conteúdo:

`startup name tagline category stage score badge`

controles:

`[Open Marketing Page] [Follow Startup]`

---

# 3.2 Navegação Interna

A página possui **tabs horizontais**.

`Overview | Market | Product | Business | Metrics | Score`

### comportamento

`click tab → scroll para seção`

ou

`renderiza seção selecionada`

---

# 3.3 Navegação de Seções

Cada seção é um **SectionCard**.

exemplo:

`┌──────────────────────────────┐ │ Market                       │ │                              │ │ TAM / SAM / SOM              │ │ Competitors                  │ │ Trends                       │ └──────────────────────────────┘`

---

### controles

`expand collapse`

botão:

`[expand details]`

---

# 4. Marketing Page (Vitrine)

A página de marketing possui **dois modos de navegação**:

`Preview Mode Edit Mode`

---

# 4.1 Navigation Controls

no topo da página:

`[Preview] [Edit]`

---

# 4.2 Preview Mode

renderiza a landing como o visitante verá.

layout:

`Hero  Sections  CTA  Contact`

---

## Scroll Navigation

o visitante navega por **scroll vertical**.

---

# 4.3 Section Anchors

links rápidos no topo:

`Overview Features Benefits FAQ Contact`

controle:

`click → scroll to section`

---

# 4.4 Edit Mode

exibe controles de edição.

layout:

`Hero Editor  Sections Editor  Preview`

---

## Hero Editor Controls

campos:

`Title input Subtitle input Video upload Background upload CTA text`

botões:

`[Save] [Preview]`

---

## Section Editor

lista vertical:

`Section List  Problem Solution Features Benefits`

controle:

`drag to reorder edit markdown delete add section`

---

# 5. Roadmap

O roadmap organiza o progresso da startup.

layout:

`Horizontal stage board  [ Vision ] [ Market ] [ Product ] [ Business ] [ Marketing ]`

---

# 5.1 Navegação entre Stages

controles:

`horizontal scroll drag board click stage`

---

# 5.2 Stage Card

`Stage Title Progress Bar Score Summary`

controles:

`click → open stage`

---

# 6. Stage Screen

quando uma etapa é aberta:

`Stage Header  Modules List`

---

# 6.1 Navegação de Modules

layout:

`Module list  Lesson Interview Exercise Analysis`

controle:

`click module`

---

# 7. Mini Curso

O minicurso usa **navegação horizontal por slides**.

---

# 7.1 Layout

`Navigation Circles  ● ○ ○ ○ ○  ← arrow      → arrow   Slide Content  Question  Textarea  Continue Button`

---

# 7.2 Controles

### Arrow Buttons

`← previous slide → next slide`

---

### Navigation Circles

`● ○ ○ ○ ○`

clicáveis.

`jump to slide`

---

### Continue Button

`save answer go to next slide`

---

# 7.3 Comportamento

fluxo:

`user answer ↓ LLM evaluation ↓ score update ↓ next slide`

---

# 8. Interview Module

layout:

`LLM message  textarea response  submit button`

---

### controles

`submit answer`

evento:

`evaluate response update module score`

---

# 9. Leadership Scenarios

layout:

`Scenario description  textarea  submit`

---

### navegação

`next scenario previous scenario`

---

# 10. Score Dashboard

no final do roadmap:

`Startup Readiness  overall score  category scores`

---

# 11. Navegação entre páginas públicas

rotas:

`/startup/{id} /startup/{id}/vitrine`

links aparecem:

`discover cards portfolio header marketing buttons`

---

# 12. Fluxo completo de navegação

`Discover    ↓ Startup Card    ↓ Portfolio    ↓ Marketing Page    ↓ Roadmap    ↓ Score`

# Design System da Plataforma

_(especificação completa de componentes visuais, propriedades de design e comportamento — inspirado na filosofia de composição modular semelhante ao shadcn, porém descrito semanticamente)_

Este design system define **o vocabulário visual da interface**.  
Ele organiza:

- superfícies
    
- tipografia
    
- controles interativos
    
- containers estruturais
    
- estados visuais
    

O objetivo é criar **componentes composáveis, legíveis e consistentes**, capazes de construir todas as telas da plataforma:

`Discover Portfolio Marketing Page Roadmap Minicursos`

---

# 1. Filosofia Visual

A interface utiliza **uma linguagem visual neutra e estruturada**, priorizando:

`legibilidade hierarquia clara modularidade interação previsível`

Elementos visuais seguem princípios:

`camadas suaves bordas arredondadas moderadas sombras discretas contraste funcional`

---

# 2. Tipografia

A tipografia organiza a hierarquia de informação.

### Display Heading

uso:

`títulos principais de páginas`

propriedades visuais:

`font-weight: 700 letter-spacing: -0.02em line-height: 1.1 font-size: 32–40px`

---

### Section Heading

uso:

`títulos de seções`

propriedades:

`font-weight: 600 font-size: 20–24px`

---

### Label Text

uso:

`labels de campos`

propriedades:

`font-weight: 500 font-size: 13px opacity: 0.8`

---

### Body Text

uso:

`descrições conteúdo`

propriedades:

`font-weight: 400 font-size: 14–16px line-height: 1.5`

---

# 3. Superfícies

As superfícies organizam a interface em camadas.

---

# 3.1 Page Surface

a superfície base do workspace.

características:

`background neutro padding amplo scroll vertical`

layout:

`max-width: 1400px margin auto`

---

# 3.2 Card Surface

elemento fundamental de composição.

visual:

`background claro border radius médio sombra suave padding interno`

estrutura:

`Card │ ├ CardHeader ├ CardContent └ CardFooter`

---

## CardHeader

contém:

`título actions`

layout:

`display: flex justify-content: space-between align-items: center`

---

## CardContent

conteúdo principal.

`texto inputs tabelas gráficos`

---

## CardFooter

ações finais:

`save confirm cancel`

---

# 4. Containers Estruturais

---

# 4.1 Panel Container

utilizado para áreas estruturais maiores.

visual:

`border leve radius médio background neutro`

layout interno:

`padding: 24px gap vertical consistente`

---

# 4.2 Grid Layout Container

estrutura colunar usada em dashboards.

exemplo:

`grid-template-columns: 1fr 1fr gap: 24px`

---

# 5. Botões

Os botões são **controles primários de ação**.

---

# 5.1 Primary Button

uso:

`ações principais`

visual:

`background sólido texto claro radius médio padding confortável`

estados:

`hover → leve elevação active → compressão disabled → opacidade reduzida`

---

# 5.2 Secondary Button

uso:

`ações secundárias`

visual:

`background transparente border sutil texto escuro`

---

# 5.3 Ghost Button

uso:

`ações discretas`

visual:

`sem borda hover background leve`

---

# 6. Inputs

Campos de entrada seguem uma estrutura consistente.

---

# 6.1 Text Input

estrutura:

`InputContainer │ ├ Label └ InputField`

visual do campo:

`border sutil radius médio padding interno confortável`

focus:

`outline destacado`

---

# 6.2 Textarea

usado em:

`entrevistas cenários descrições`

visual:

`altura generosa resize vertical`

---

# 7. Tabs

usadas para **navegação interna em páginas complexas**.

layout:

`Overview | Market | Product | Metrics`

visual:

`linha inferior ativo destacado`

---

# 8. Navigation Pills

usadas em minicursos e roadmap.

visual:

`círculos pequenos`

exemplo:

`● ○ ○ ○ ○`

estados:

`ativo completo pendente`

---

# 9. Tooltip

exibido em hover.

visual:

`container pequeno background escuro texto claro radius pequeno`

---

# 10. Command Overlay

barra de comando estilo palette.

estrutura:

`Overlay │ ├ CommandInput └ ResultsList`

visual:

`container central radius médio sombra profunda`

---

# 11. Graph Node

usado no grafo do Discover.

visual:

`círculo cor por categoria tamanho por score`

hover:

`highlight tooltip`

---

# 12. Stage Card (Roadmap)

card especializado.

estrutura:

`StageCard │ ├ StageTitle ├ ProgressBar ├ ScoreIndicator └ Summary`

visual:

`altura moderada indicador de progresso`

---

# 13. Lesson Slide Container

usado nos minicursos.

layout:

`SlideContainer │ ├ SlideNavigation ├ SlideContent ├ QuestionBlock ├ AnswerInput └ ContinueButton`

---

# 14. Slide Navigation

parte superior.

visual:

`● ○ ○ ○ ○`

função:

`navegar slides`

---

# 15. Interview Panel

usado para interação com LLM.

estrutura:

`InterviewPanel │ ├ AIMessage ├ UserInput └ SubmitButton`

---

# 16. Table Input

usado para TAM SAM SOM.

estrutura:

`Table │ ├ HeaderRow ├ InputRow └ FeedbackPanel`

---

# 17. Feedback Panel

exibe análise da IA.

visual:

`background neutro border lateral colorida texto analítico`

---

# 18. Scenario Panel

usado para cenários de liderança.

estrutura:

`ScenarioPanel │ ├ ScenarioDescription ├ ResponseTextarea └ NavigationControls`

---

# 19. Score Badge

usado em:

`portfolio cards roadmap`

visual:

`badge arredondado número central cor por nível`

---

# 20. Section Editor (Marketing Page)

estrutura:

`SectionEditor │ ├ SectionList ├ SectionEditorPanel └ PreviewPanel`

---

# 21. Drag Handle

usado para reordenar seções.

visual:

`ícone discreto cursor move`

---

# 22. Scroll Anchor

usado na vitrine.

visual:

`menu fixo superior links de seção`

---

# 23. Status Indicators

usados no roadmap.

tipos:

`pending active completed`

visual:

`ícones simples cores distintas`

---

# 24. Loading Skeleton

usado enquanto dados carregam.

visual:

`blocos cinza animados`

---

# 25. Feedback States

componentes devem suportar:

`loading error empty success`

---

# 26. Animações

animações devem ser:

`curtas suaves não intrusivas`

exemplos:

`hover elevation slide transitions fade overlays`

---

# 27. Responsividade

componentes devem adaptar-se a:

`desktop tablet mobile`

layout responsivo:

`grid colunas adaptáveis cards empilhados sidebar colapsável`

---

# 28. Princípio de Composição

Todos os componentes são **componíveis**.

exemplo:

`Card  + Button + Input + Tooltip`

---

# 29. Resultado

Este design system permite compor **todas as interfaces da plataforma** com consistência:

`Discover Portfolio Marketing Page Roadmap Minicursos`

### Correções
# 1. Discover — correções de layout

Referente à primeira interface.

## Estrutura espacial geral

A tela deve manter três zonas horizontais:

`[ SIDEBAR | MAIN CONTENT AREA ]`

### Sidebar

Posição:

`lado esquerdo largura fixa ~240px altura 100vh`

Ordem vertical:

`StartupOS (logo)  Discover Portfolio Marketing Page Roadmap  ------------------  Settings`

O item ativo possui:

`background levemente destacado borda esquerda azul`

---

## Área central Discover

A área central deve ter **estrutura vertical clara**.

### 1. Cabeçalho da página

Posição:

`topo da área central padding-top: 32px padding-left: 40px padding-right: 40px`

Composição:

`Discover (título grande) subtítulo search input (lado direito)`

Layout:

`[ Discover + subtitle               Search field ]`

O search deve ficar:

`alinhado à direita largura aproximada 280px`

---

### 2. Botões de visualização

Logo abaixo do header:

`[ Grid view ]  [ Graph view ]`

Posicionamento:

`abaixo do título alinhado à esquerda gap: 12px`

---

### 3. Área de cards

Posição:

`centro da página padding horizontal 40px`

Layout:

`grid 3 colunas gap 24px`

Estrutura:

`[ card ][ card ][ card ] [ card ][ card ][ card ]`

---

## Estrutura do Startup Card

Cada card deve seguir esta composição visual.

### Zona superior

`[ Startup name              score badge ]`

Score:

`badge circular lado direito diâmetro ~36px`

---

### Zona de descrição

Abaixo do nome.

`linha curta de descrição máx 2 linhas`

---

### Zona de tags

Logo abaixo da descrição.

`[ sector tag ][ stage tag ]`

Tags:

`pílulas cinza claras altura 24px`

---

### Zona de ações

Base do card.

`[ View Portfolio ] [ Vitrine ]`

Layout:

`botão principal azul botão secundário outline`

---

## Discover Command Overlay

Quando abrir a busca:

### Fundo

`overlay escurecido opacity ~60%`

### Container do comando

Posição:

`centro da tela largura ~520px`

Composição vertical:

`Search input ------------------ results list`

Cada resultado:

`[ startup name | sector | score | arrow ]`

---

# 2. Portfolio — correções visuais

Referente à terceira imagem.

## Cabeçalho do portfolio

Estrutura:

`[ startup name ] [ score badge ]            [ Marketing Page ][ Follow ]`

Posicionamento:

`nome alinhado à esquerda botões alinhados à direita`

Score badge:

`lado direito do nome círculo verde 48px`

---

## Barra de navegação interna

Logo abaixo do cabeçalho.

Layout:

`Overview | Market | Product | Business | Metrics | Score`

Posição:

`horizontal largura total da página`

Item ativo:

`linha azul inferior`

---

## Área de conteúdo

Cada seção deve ocupar:

`largura máxima ~920px centralizada`

Estrutura vertical:

`Section Card Section Card Section Card`

---

## Estrutura do Section Card

Cada card:

`header conteúdo AI insight`

### Header

`título arrow collapse`

Arrow:

`lado direito`

---

### Conteúdo

Texto do usuário.

`padding interno 20px`

---

### AI Insight Panel

Sempre abaixo.

Visual:

`background azul claro borda suave`

Conteúdo:

`AI Analysis Strengths Weaknesses Recommendations`

---

# 3. Marketing Page — correções

Referente à quarta imagem.

## Estrutura geral

A tela deve possuir três zonas:

`header editor content builder floating AI assistant`

---

## Header

Layout:

`FinTrack — Vitrine  [ Preview ] [ Edit ]`

Posição:

`topo da área central`

---

## Navegação da landing

Logo abaixo:

`Overview | Features | Benefits | FAQ | Contact`

Alinhamento:

`horizontal centralizado`

---

## Área de edição

Cada bloco da landing deve aparecer como:

`content block container`

Visual:

`borda tracejada padding grande`

Estrutura:

`Hero block Description block Sections block`

---

## Floating Marketing AI Chat

Elemento novo.

Posição:

`bottom-right distância 24px da borda`

Formato:

`chat bubble ícone IA`

Quando aberto:

`painel vertical largura ~340px altura ~420px`

Layout:

`messages area ---------------- input`

---

# 4. Roadmap — transformação para Kanban

Referente à quinta imagem.

## Estrutura da página

Topo:

`Roadmap subtítulo`

---

## Board principal

Layout horizontal.

`Vision | Market | Product | Business | Marketing`

Cada categoria vira **coluna vertical**.

Estrutura:

`[ column ][ column ][ column ][ column ][ column ]`

---

## Coluna do roadmap

Cada coluna contém:

`header cards`

Header:

`título da categoria progress bar completion %`

---

## Roadmap card (novo)

Formato vertical alto.

Estrutura:

`Stage title user input summary AI digest open button`

---

### Zona 1 — título

`nome do módulo ícone`

---

### Zona 2 — resumo do usuário

`box cinza claro texto curto`

---

### Zona 3 — digest da IA

`box azul claro insight comparativo`

---

### Zona 4 — ação

`Open module →`

---

## Startup readiness score

Posição:

`painel largo abaixo do board`

Layout:

`[ score circle ]   [ explanation ]`

---

# 5. Minicurso — correção visual

Referente à última interface.

## Estrutura da tela

A tela deve ocupar **modo imersivo completo**.

Layout vertical:

`module header slide indicator slide card navigation controls`

---

## Header do módulo

Posição:

`topo`

Layout:

`← Back to Roadmap  VISION  Understanding Your Market`

---

## Indicador de slides

Posição:

`abaixo do header centralizado`

Formato:

`● ○ ○ ○ ○`

---

## Card do slide

Posição:

`centro da tela largura ~760px`

Estrutura:

`markdown content question block response input`

---

### Markdown content

Primeira parte do card.

`texto educacional`

---

### Question block

Logo abaixo.

`Describe your target market...`

---

### Campo de resposta

Elemento:

`textarea altura ~120px`

---

## Controles

Posição:

`rodapé do card`

Layout:

`Previous        Continue`

---

## Feedback IA

Após envio.

Novo bloco aparece:

`AI feedback panel`

Posição:

`abaixo da resposta`

Conteúdo:

`Clarity Missing information Suggestion`

---

# Conclusão

As correções visuais principais são:

1. **Discover**
    
    - grid + graph view
        
    - command overlay
        
2. **Portfolio**
    
    - cards com análise IA
        
3. **Marketing**
    
    - chat IA flutuante
        
4. **Roadmap**
    
    - board estilo Trello
        
    - cards verticais analíticos
        
5. **Minicurso**
    
    - modo imersivo
        
    - navegação por slides
        
    - feedback IA
        

Esses ajustes tornam o layout consistente com o modelo de **plataforma de desenvolvimento e avaliação de startups assistida por IA**.