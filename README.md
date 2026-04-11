# Busquei

![CI](https://github.com/arthurhrc/busquei/actions/workflows/ci.yml/badge.svg)

Clone do Google Search desenvolvido como projeto da faculdade. A aplicação consome a API do Google Custom Search para exibir resultados de busca reais.

## Funcionalidades

- Busca web com resultados reais via Google Custom Search API
- Busca por imagens com grid de resultados
- Histórico de pesquisas recentes na página inicial
- Paginação de resultados
- Dark mode com persistência via localStorage
- Skeleton loading animado durante as requisições
- Tratamento de erros da API e de rede
- Error Boundary para erros de renderização
- Cancelamento de requisições em voo com AbortController
- Layout responsivo
- Página 404

## Tecnologias

- [React](https://reactjs.org/) 17
- Context API + useReducer (gerenciamento de estado)
- [Material UI](https://v4.mui.com/) v4
- [React Router DOM](https://reactrouter.com/) v5
- [Google Custom Search API](https://developers.google.com/custom-search/v1/overview)

## Configuração

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

3. Edite o `.env` com sua API Key e Context Key do Google Custom Search:

```
REACT_APP_API_KEY=sua_api_key_aqui
REACT_APP_CONTEXT_KEY=seu_context_key_aqui
```

> Para obter as credenciais, acesse o [Google Cloud Console](https://console.cloud.google.com/) e crie um projeto com a Custom Search API habilitada. Em produção, restrinja a chave ao domínio do seu deploy.

## Como rodar

```bash
npm start
```

A aplicação abrirá em `http://localhost:3000`.

## Testes

```bash
npm test
```

## Estrutura

```
src/
├── components/
│   ├── ErrorBoundary/   # Captura erros de renderização
│   ├── Search/          # Campo de busca reutilizável
│   └── SearchOption/    # Abas de filtro da barra de resultados
├── hooks/
│   └── useGoogleSearch/ # Hook que consome a API
├── pages/
│   ├── Home/            # Página inicial com histórico de buscas
│   ├── NotFound/        # Página 404
│   └── SearchResult/    # Página de resultados
├── reducer.js           # Gerenciamento de estado global
└── StateContext.js      # Contexto React
```
