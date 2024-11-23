# swagger-ui

# Swagger UI Documentation Viewer

Uma aplicação React que permite visualizar e testar APIs através de documentação Swagger/OpenAPI.

## 🚀 Funcionalidades

- 📚 Visualização interativa de documentação Swagger/OpenAPI
- 🔍 Exploração de endpoints da API
- 🧪 Interface para testar chamadas à API
- 📱 Design responsivo
- 🎨 Interface moderna com Tailwind CSS
- 🔄 Simulação de chamadas à API com dados mock

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/swagger-docs-demo.git
cd swagger-docs-demo
```

2. Instale as dependências:
```bash
npm install --registry=https://registry.npmjs.org/

npm install --save-dev @babel/preset-react @babel/preset-env  --registry=https://registry.npmjs.org/
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start 
```

4. Acesse a aplicação em `http://localhost:3000`

## 📦 Estrutura do Projeto

```
swagger-docs-demo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── SwaggerUI.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .babelrc
├── webpack.config.js
├── postcss.config.js
├── tailwind.config.js
└── package.json
```

## 🔧 Configuração

### Personalizar a Documentação da API

Para alterar a especificação da API, edite o objeto `swaggerSpec` em `src/components/SwaggerUI.js`:

```javascript
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Sua API",
    version: "1.0.0",
    description: "Descrição da sua API"
  },
  paths: {
    // Seus endpoints aqui
  }
};
```

### Personalizar as Respostas Mock

Para modificar as respostas simuladas, edite o objeto `mockAPI` em `src/components/SwaggerUI.js`:

```javascript
const mockAPI = {
  '/seu-endpoint': {
    get: () => ({
      // Sua resposta mock aqui
    })
  }
};
```

## 🎨 Personalização do Estilo

O projeto usa Tailwind CSS para estilização. Para personalizar:

1. Edite `tailwind.config.js` para ajustar o tema:
```javascript
module.exports = {
  theme: {
    extend: {
      // Suas customizações aqui
    },
  },
};
```

2. Use classes do Tailwind nos componentes para modificar o estilo

## 📝 Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria uma build de produção

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Exemplos de Uso

### Listar Endpoints Disponíveis
```javascript
GET /users - Lista todos os usuários
POST /users - Cria um novo usuário
GET /users/{id} - Obtém detalhes de um usuário específico
```

### Testar um Endpoint
1. Selecione o endpoint desejado no menu lateral