
# swagger-ui


[![Build and Deploy](https://github.com/govinda777/swagger-ui/actions/workflows/deploy.yml/badge.svg)](https://github.com/govinda777/swagger-ui/actions/workflows/deploy.yml)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/govinda777/swagger-ui)](https://github.com/govinda777/swagger-ui)
[![GitHub top language](https://img.shields.io/github/languages/top/govinda777/swagger-ui)](https://github.com/govinda777/swagger-ui)
[![Webpack](https://img.shields.io/badge/webpack-%5E5.96.1-8DD6F9?logo=webpack)](https://webpack.js.org/)
[![React](https://img.shields.io/badge/react-%5E18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%5E3.4.15-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Jest](https://img.shields.io/badge/tested_with-jest-%23C21325?logo=jest)](https://jestjs.io/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-success?logo=github)](https://govinda777.github.io/swagger-ui)
[![Node](https://img.shields.io/badge/node-v20-brightgreen?logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/npm/l/swagger-ui?color=blue)](https://github.com/govinda777/swagger-ui/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintainability](https://api.codeclimate.com/v1/badges/your-repo-id/maintainability)](https://codeclimate.com/github/govinda777/swagger-ui)
[![Known Vulnerabilities](https://snyk.io/test/github/govinda777/swagger-ui/badge.svg)](https://snyk.io/test/github/govinda777/swagger-ui)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

# Swagger UI Documentation Viewer

Uma aplicação React moderna para visualização e teste de APIs através de documentação Swagger/OpenAPI.

## 📊 Arquitetura do Sistema

```mermaid
flowchart TB
    subgraph Frontend
        UI[SwaggerUI Component]
        Router[React Router]
        State[State Management]
    end
    
    subgraph Core
        Parser[OpenAPI Parser]
        Validator[Schema Validator]
        Mock[Mock Service]
    end
    
    subgraph External
        API[Real API]
        Docs[OpenAPI Specs]
    end
    
    UI --> Router
    Router --> State
    State --> Parser
    Parser --> Validator
    Parser --> Mock
    Mock --> API
    Docs --> Parser
    
    style Frontend fill:#e1f5fe
    style Core fill:#fff3e0
    style External fill:#f1f8e9
```

## 🔄 Fluxo de Requisições

```mermaid
sequenceDiagram
    participant U as Usuário
    participant UI as Interface
    participant P as Parser
    participant M as Mock Service
    participant A as API Real

    U->>UI: Seleciona Endpoint
    UI->>P: Processa Spec
    P->>UI: Retorna Metadata
    U->>UI: Executa Requisição
    
    alt Modo Mock
        UI->>M: Envia Requisição
        M->>UI: Retorna Dados Mock
    else Modo Produção
        UI->>A: Envia Requisição
        A->>UI: Retorna Dados Reais
    end
    
    UI->>U: Exibe Resultado
```

## 📁 Estrutura do Projeto

```mermaid
graph TD
    A[swagger-ui] --> B[src]
    A --> C[public]
    A --> D[config]
    
    B --> E[components]
    B --> F[hooks]
    B --> G[utils]
    
    E --> H[ApiEndpoint]
    E --> I[Documentation]
    E --> J[Layout]
    E --> K[SwaggerUI]
    
    D --> L[webpack.config.js]
    D --> M[jest.config.js]
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style C fill:#f1f8e9
    style D fill:#fff3e0
```

## 🚀 Funcionalidades

- 📚 Visualização interativa de documentação Swagger/OpenAPI
- 🔍 Exploração de endpoints da API
- 🧪 Interface para testar chamadas à API
- 📱 Design responsivo
- 🎨 Interface moderna com Tailwind CSS
- 🔄 Simulação de chamadas à API com dados mock
- 🌐 Suporte a múltiplos formatos de especificação OpenAPI
- 🔒 Suporte a autenticação e autorização
- 📊 Visualização de esquemas de dados

## 🔄 Ciclo de Vida da Requisição

```mermaid
stateDiagram-v2
    [*] --> ValidaçãoEntrada
    ValidaçãoEntrada --> ProcessamentoSpec
    ProcessamentoSpec --> PreparaçãoRequisição
    
    PreparaçãoRequisição --> ModeMock: Mock Ativado
    PreparaçãoRequisição --> ModeProduction: Mock Desativado
    
    ModeMock --> GeraçãoResposta
    ModeProduction --> ChamadaAPI
    ChamadaAPI --> ProcessamentoResposta
    
    GeraçãoResposta --> ExibiçãoResultado
    ProcessamentoResposta --> ExibiçãoResultado
    
    ExibiçãoResultado --> [*]
```

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/govinda777/swagger-ui.git
cd swagger-ui
```

2. Instale as dependências:
```bash
npm install -g serve --registry=https://registry.npmjs.org/
npm install --registry=https://registry.npmjs.org/
npm install --save-dev @babel/preset-react @babel/preset-env --registry=https://registry.npmjs.org/
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

## 🔧 Configuração

### Fluxo de Configuração

```mermaid
graph LR
    A[Inicialização] --> B[Carrega .env]
    B --> C[Configura Cliente]
    C --> D[Inicializa Parser]
    D --> E[Configura Rotas]
    E --> F[Prepara UI]
    
    style A fill:#f9f9f9
    style B fill:#e1f5fe
    style C fill:#fff3e0
    style D fill:#f1f8e9
    style E fill:#fce4ec
    style F fill:#f3e5f5
```

### Configuração da API

```javascript
export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Sua API",
    version: "1.0.0",
    description: "Descrição da sua API"
  },
  servers: [
    {
      url: "https://api.exemplo.com",
      description: "Servidor de Produção"
    }
  ],
  paths: {
    // Seus endpoints aqui
  }
};
```

## 🎨 Personalização do Estilo

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4FD1C5',
          DEFAULT: '#38B2AC',
          dark: '#319795',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

## 📝 Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria uma build de produção
- `npm test`: Executa os testes
- `npm run lint`: Verifica o código com ESLint
- `npm run format`: Formata o código com Prettier

## 🧪 Processo de Teste

```mermaid
graph TD
    A[Início Teste] --> B[Testes Unitários]
    B --> C[Testes de Integração]
    C --> D[Testes E2E]
    D --> E[Cobertura]
    E --> F[Relatório]
    
    style A fill:#f9f9f9
    style B fill:#e1f5fe
    style C fill:#fff3e0
    style D fill:#f1f8e9
    style E fill:#fce4ec
    style F fill:#f3e5f5
```

Execute os testes com:

```bash
npm test
```

Para cobertura de testes:

```bash
npm test -- --coverage
```

## 🤝 Fluxo de Contribuição

```mermaid
gitGraph
    commit id: "initial"
    branch feature
    checkout feature
    commit id: "feature-1"
    commit id: "feature-2"
    checkout main
    merge feature
    commit id: "release"
```

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade incrível'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Exemplos

### Configuração Básica

```javascript
import SwaggerUI from './components/SwaggerUI';

function App() {
  return (
    <SwaggerUI 
      spec={swaggerSpec}
      options={{
        deepLinking: true,
        defaultModelsExpandDepth: 1,
        defaultModelExpandDepth: 1,
      }}
    />
  );
}
```

### Uso com Autenticação

```javascript
<SwaggerUI 
  spec={swaggerSpec}
  authConfig={{
    type: 'bearer',
    token: 'seu-token-aqui'
  }}
/>
```

## 🐛 Processo de Report de Bugs

```mermaid
graph TD
    A[Identificar Bug] --> B[Criar Issue]
    B --> C[Reproduzir]
    C --> D[Investigar]
    D --> E[Corrigir]
    E --> F[Testar]
    F --> G[Merge]
    
    style A fill:#f9f9f9
    style B fill:#e1f5fe
    style C fill:#fff3e0
    style D fill:#f1f8e9
    style E fill:#fce4ec
    style F fill:#f3e5f5
    style G fill:#e8eaf6
```

Ao reportar um bug, inclua:

1. Como reproduzir o problema
2. O que era esperado
3. O que aconteceu
4. Screenshots (se aplicável)
5. Ambiente (navegador, OS, etc)

## Arquitetura do Projeto

- **App.js**: Componente principal da aplicação que renderiza o componente `SwaggerUI`.
- **SwaggerUI.js**: Componente responsável por renderizar a interface do Swagger.

### Configuração do Webpack

A aplicação utiliza três arquivos de configuração do Webpack:

- **webpack.common.js**: Contém a configuração comum usada tanto em desenvolvimento quanto em produção.
- **webpack.dev.js**: Configuração específica para o ambiente de desenvolvimento.
- **webpack.prod.js**: Configuração específica para o ambiente de produção.

### Scripts do NPM

- **start**: Inicia o servidor de desenvolvimento.
- **build**: Gera o build de produção.
- **test**: Executa os testes unitários com cobertura.
- **predeploy**: Gera o build de produção antes do deploy.
- **deploy**: Faz o deploy da aplicação para o GitHub Pages.

### Testes

Os testes são escritos utilizando o Jest e o React Testing Library. Os arquivos de teste estão localizados no mesmo diretório dos componentes que eles testam e seguem o padrão `*.test.js`.

### Estilo

A aplicação utiliza o Tailwind CSS para estilização. Os estilos são processados pelo PostCSS através do `postcss-loader` no Webpack.

### Deploy

O deploy da aplicação é feito automaticamente para o GitHub Pages utilizando o GitHub Actions. O workflow de deploy está configurado no arquivo `.github/workflows/deploy.yml`.

Para suporte, entre em contato através das issues do GitHub ou envie um email para [seu-email@exemplo.com]

## How to `deploy local`?

```bash
chmod +x local-deploy.sh
```

## 📞 Suporte

Para suporte, entre em contato através das issues do GitHub ou envie um email para [seu-email@exemplo.com]