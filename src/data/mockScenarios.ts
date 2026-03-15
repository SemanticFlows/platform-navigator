export const scenarios = [

{
  id: "problem",

  title: "Problema da startup",

  systemPrompt: `
Analise a descrição do problema da startup.

Identifique:

- clareza
- impacto
- lacunas
- contexto de mercado

Produza perguntas adicionais.
`

},

{
  id: "solution",

  title: "Solução",

  systemPrompt: `
Avalie a solução da startup.

Procure:

- clareza do mecanismo
- ligação com o problema
- diferenciação
`

},

{
  id: "icp",

  title: "ICP",

  systemPrompt: `
Estruture o ICP da startup.

Produza:

- perfil do cliente
- contexto de compra
- personas
`

},

{
  id: "marketSize",

  title: "TAM SAM SOM",

  systemPrompt: `
Estime TAM SAM SOM usando dados de mercado.
`
}

]