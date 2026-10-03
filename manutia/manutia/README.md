# ManutIA

Diagnóstico de causa raiz de falhas em máquinas de oficina eletromecânica, com apoio de IA.

## Como rodar
Os arquivos JS usam módulos ES, então **não abra o index.html com duplo clique**.
No VS Code: instale a extensão **Live Server**, clique com o botão direito em `index.html` > *Open with Live Server*.
Alternativa: `python -m http.server 5500` na pasta do projeto e acesse http://localhost:5500

## Estrutura
- `index.html` — estrutura da página
- `css/styles.css` — estilos próprios (impressão, abas, passos)
- `js/main.js` — ponto de entrada, liga os módulos
- `js/config.js` — chave/URL da API, constantes
- `js/state.js` — estado do wizard
- `js/utils.js` — funções auxiliares
- `js/data/machines.js` — cadastro das máquinas (adicione novas aqui)
- `js/services/prompts.js` — prompts e schemas da IA
- `js/services/aiService.js` — chamadas à API
- `js/services/fallbacks.js` — respostas de contingência
- `js/services/storageService.js` — histórico (localStorage)
- `js/ui/` — wizard, histórico, abas, máquinas e feedback (toast/loading)

## Segurança
Não deixe a chave da API no front-end em produção. Crie um backend (ex.: Node/Express) que receba as
requisições e chame a IA, e troque a `API_URL` em `config.js` pela URL do seu servidor.
