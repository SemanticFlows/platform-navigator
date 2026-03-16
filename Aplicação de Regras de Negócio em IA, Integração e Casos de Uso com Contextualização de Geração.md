

---

# 1. Objetivo

Este documento descreve:

1. como as **regras de negócio da plataforma são aplicadas em conjunto com IA**
    
2. como ocorre a **integração técnica com o sistema**
    
3. quais são os **principais casos de uso da IA**
    
4. quais são os **textos de contextualização utilizados na geração**
    

A IA neste sistema não substitui regras de negócio nem controla o fluxo da aplicação.  
Ela atua como **mecanismo analítico e gerador de conteúdo dentro de limites definidos pelo sistema**.

---

# 2. Princípio Arquitetural

A arquitetura segue o princípio:

Regras de Negócio  
      ↓  
Orquestração de Cenários  
      ↓  
Motor de Interação com IA  
      ↓  
Interface do Usuário

Assim:

- a aplicação define **o fluxo**
    
- a IA executa **análise e geração**
    
- o usuário mantém **controle final das respostas**
    

---

# 3. Camadas do Sistema

## 3.1 Camada de Regras de Negócio

Responsável por:

- progresso do roadmap
    
- validação de respostas
    
- estrutura do perfil da startup
    
- persistência de dados
    

---

## 3.2 Camada de Cenários

Cada pergunta do roadmap é definida como um **cenário configurável**.

Scenario  
 ├ id  
 ├ title  
 ├ systemPrompt  
 ├ generationContext  
 ├ searchStrategy  
 └ outputField

Essa camada define **como a IA deve agir em cada pergunta**.

---

## 3.3 Camada de IA

Responsável por:

- analisar respostas
    
- gerar perguntas adicionais
    
- complementar textos
    
- comparar com dados de mercado
    
- gerar conteúdos estruturados
    

---

# 4. Tipos de Interação com IA

A IA atua em três modos principais.

---

## 4.1 Modo Entrevista

A IA atua como **analista inquisitivo**.

Objetivo:

explorar lacunas na resposta do usuário.

Comportamento:

- identificar inconsistências
    
- detectar generalizações
    
- gerar perguntas de aprofundamento
    

---

## 4.2 Modo Complementação

A IA atua como **consultor estratégico**.

Objetivo:

melhorar e estruturar respostas.

Comportamento:

- refinar narrativa
    
- adicionar dimensões estratégicas
    
- estruturar texto profissional
    

---

## 4.3 Modo Comparativo

A IA utiliza **contexto externo de mercado**.

Objetivo:

comparar a resposta com dados reais.

Comportamento:

- pesquisar mercado
    
- identificar benchmarks
    
- contextualizar tendências
    

---

# 5. Integração com Pesquisa de Mercado

Alguns cenários exigem contexto externo.

O sistema gera automaticamente consultas como:

market size agritech  
agritech industry challenges  
top agritech startups

Essas consultas são usadas pela ferramenta de pesquisa integrada ao modelo.

---

# 6. Casos de Uso da IA

A seguir estão os principais casos de uso da IA dentro da plataforma.

Cada caso inclui:

- objetivo
    
- comportamento da IA
    
- texto de contextualização usado na geração
    

---

# Caso de Uso 1

## Estruturação do Problema da Startup

### Objetivo

Ajudar o fundador a formular claramente o problema que sua startup resolve.

### Comportamento da IA

- analisar clareza
    
- identificar lacunas
    
- verificar impacto
    
- gerar perguntas adicionais
    

### Contexto de geração

Texto enviado ao modelo:

Você é um analista estratégico de startups.  
  
Avalie a descrição do problema apresentada pelo fundador.  
  
Procure identificar:  
  
- se o problema está claramente definido  
- quem é afetado por esse problema  
- qual é a intensidade da dor  
- se a resposta confunde problema com solução  
- se há generalizações sem evidência  
  
Identifique lacunas e produza perguntas adicionais que ajudem o fundador a aprofundar a explicação.

---

# Caso de Uso 2

## Refinamento da Solução

### Objetivo

Ajudar o fundador a explicar melhor sua solução.

### Comportamento da IA

- avaliar clareza do mecanismo
    
- verificar relação com problema
    
- sugerir refinamento
    

### Contexto de geração

Você é um consultor de produto para startups.  
  
Analise a solução proposta.  
  
Procure:  
  
- clareza do mecanismo da solução  
- ligação entre solução e problema  
- diferenciação em relação ao mercado  
- impacto prático para o cliente  
  
Sugira melhorias e apresente uma versão mais clara da explicação.

---

# Caso de Uso 3

## Estruturação de ICP

### Objetivo

Identificar claramente o cliente ideal da startup.

### Comportamento da IA

- estruturar ICP
    
- identificar decisores
    
- criar personas
    

### Contexto de geração

Você é um estrategista de marketing.  
  
Com base na resposta do usuário, estruture o ICP da startup.  
  
Identifique:  
  
- quem é o cliente ideal  
- quem toma a decisão de compra  
- quem utiliza o produto  
- quais são os principais contextos de uso  
  
Produza uma descrição clara de ICP e possíveis personas.

---

# Caso de Uso 4

## Análise de TAM / SAM / SOM

### Objetivo

Ajudar o fundador a dimensionar seu mercado.

### Comportamento da IA

- buscar dados de mercado
    
- estimar mercado total
    
- explicar lógica de cálculo
    

### Contexto de geração

Você é um analista de mercado.  
  
Utilize dados disponíveis para estimar:  
  
- TAM (mercado total)  
- SAM (mercado atendível)  
- SOM (mercado alcançável)  
  
Explique a lógica utilizada e apresente possíveis fontes ou referências.

---

# Caso de Uso 5

## Identificação de Concorrentes

### Objetivo

Ajudar o fundador a entender o cenário competitivo.

### Comportamento da IA

- listar concorrentes
    
- identificar benchmarks
    
- classificar tipos de concorrência
    

### Contexto de geração

Você é um analista competitivo.  
  
Liste concorrentes relevantes da startup.  
  
Classifique:  
  
- concorrentes diretos  
- concorrentes indiretos  
- benchmarks globais  
  
Explique brevemente o posicionamento de cada um.

---

# Caso de Uso 6

## Refinamento da Proposta de Valor

### Objetivo

Criar uma proposta de valor clara.

### Comportamento da IA

- estruturar narrativa
    
- conectar problema e solução
    
- destacar benefício principal
    

### Contexto de geração

Você é especialista em proposta de valor.  
  
Produza uma proposta de valor clara e defensável.  
  
Ela deve explicar:  
  
- qual problema é resolvido  
- para quem  
- de que forma  
- qual benefício principal é gerado

---

# Caso de Uso 7

## Geração de Conteúdo para Página de Marketing

### Objetivo

Gerar conteúdo para a landing page da startup.

### Comportamento da IA

- sintetizar perfil
    
- gerar narrativa de marketing
    
- estruturar seções da página
    

### Contexto de geração

Você é um estrategista de marketing para startups.  
  
Com base no perfil da startup, produza conteúdo para uma página de apresentação.  
  
A página deve conter:  
  
- Hero section  
- Descrição do problema  
- Explicação da solução  
- Contexto de mercado  
- Diferenciais  
- Call to action

---

# Caso de Uso 8

## Análise Estratégica da Startup

### Objetivo

Avaliar a consistência geral da startup.

### Comportamento da IA

- identificar inconsistências
    
- avaliar clareza estratégica
    
- sugerir melhorias
    

### Contexto de geração

Você é um analista de negócios.  
  
Avalie a consistência estratégica da startup.  
  
Considere:  
  
- coerência entre problema e solução  
- clareza de mercado  
- posicionamento competitivo  
- estratégia de crescimento  
  
Aponte pontos fortes e lacunas.

---

# 7. Aplicação das Regras de Negócio

A IA nunca altera diretamente os dados da startup.

Fluxo de atualização:

user answer  
     ↓  
AI analysis  
     ↓  
user refine answer  
     ↓  
wrapper  
     ↓  
saveScenarioAnswer()  
     ↓  
updateStartupProfile()

Assim:

- o usuário mantém controle das respostas
    
- o sistema mantém consistência dos dados
    

---

# 8. Benefícios da Abordagem

Essa integração permite:

### orientação estruturada

fundadores recebem orientação estratégica.

---

### análise crítica

respostas são avaliadas antes de serem incorporadas ao perfil.

---

### contextualização de mercado

decisões são comparadas com dados reais.

---

### geração automática de conteúdo

artefatos de comunicação são produzidos automaticamente.