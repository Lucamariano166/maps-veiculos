
# Mapa de Veículos

Projeto React para visualização e rastreamento de veículos em tempo real.

## Requisitos

- **Node.js**: v18.x
- **Gerenciador de pacotes**: npm (v9+) ou yarn

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Inicia a aplicação em modo de desenvolvimento.Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### `npm test`

Executa os testes com Jest em modo interativo.

### `npm run build`

Cria uma versão de produção na pasta `build/`.

### `npm run cypress:open`

Abre a interface do Cypress para execução dos testes end-to-end.

### `npm run cypress:run`

Executa os testes E2E do Cypress em modo headless.

## Estrutura de Diretórios

```
mapa-veiculos/
├── cypress/
│   ├── downloads/
│   ├── e2e/
│   ├── fixtures/
│   ├── integration/
│   │   └── app.spec.ts
│   └── support/
├── public/
│   ├── icons/
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Map.tsx
│   │   ├── SearchComponent.tsx
│   │   └── VehicleTable.tsx
│   ├── hooks/
│   │   └── useVehicles.ts
│   ├── types/
│   │   └── types.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── index.tsx
│   ├── index.css
│   └── ...
├── .gitignore
├── babel.config.js
├── cypress.config.ts
├── jest.config.js
├── jest.setup.js
├── package.json
├── tsconfig.json
└── README.md
```

## Testes

### Unitários (Jest)

- Localizados principalmente em `src/`
- Arquivos: `App.test.tsx`

### End-to-End (Cypress)

- Arquivos em `cypress/integration/`
- Configuração: `cypress.config.ts`
- Comando: `npm run cypress:open`

## Tecnologias Utilizadas

- React + TypeScript
- Jest & React Testing Library
- Cypress
- Tailwind CSS (opcional)
- Axios (ou fetch API)
- InfiniteScroll, Google Maps API

## Observações

- A função `refetch()` é executada a cada 2 minutos via `setInterval`.
- O filtro de veículos utiliza placa e/ou número da frota.
- O mapa é atualizado com base nos dados recebidos da API.

## Scripts Customizados (package.json)

Adicione os seguintes scripts para facilitar o uso do Cypress:

```json
"scripts": {
  "start": "react-scripts start",
  "test": "react-scripts test",
  "build": "react-scripts build",
  "eject": "react-scripts eject",
  "cypress:open": "cypress open",
  "cypress:run": "cypress run"
}
```


