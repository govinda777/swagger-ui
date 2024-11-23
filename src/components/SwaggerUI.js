
import React, { useState } from 'react';

const mockAPI = {
  '/users': {
    get: () => ({
      users: [
        { id: 1, name: 'João Silva', email: 'joao@exemplo.com' },
        { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com' }
      ]
    }),
    post: (data) => ({
      success: true,
      user: { id: 3, ...data }
    })
  },
  '/users/{id}': {
    get: (params) => ({
      user: { id: params.id, name: 'João Silva', email: 'joao@exemplo.com' }
    })
  }
};

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "API de Usuários Govinda Systems !",
    version: "1.0.0",
    description: "API de demonstração com documentação interativa"
  },
  paths: {
    "/users": {
      get: {
        summary: "Lista todos os usuários",
        description: "Retorna uma lista de usuários cadastrados",
        parameters: []
      },
      post: {
        summary: "Cria novo usuário",
        description: "Adiciona um novo usuário ao sistema",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" }
                }
              }
            }
          }
        }
      }
    },
    "/users/{id}": {
      get: {
        summary: "Obtém um usuário",
        description: "Retorna os dados de um usuário específico",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do usuário",
            schema: { type: "integer" }
          }
        ]
      }
    }
  }
};

const SwaggerUI = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [params, setParams] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEndpointSelect = (path, method) => {
    setSelectedEndpoint({ path, method });
    setParams({});
    setResponse(null);
  };

  const handleParamChange = (name, value) => {
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const handleExecute = async () => {
    setLoading(true);
    try {
      const path = selectedEndpoint.path.replace('{id}', params.id || '');
      const result = mockAPI[path][selectedEndpoint.method](params);
      await new Promise(resolve => setTimeout(resolve, 500));
      setResponse(result);
    } catch (error) {
      setResponse({ error: 'Erro ao executar a requisição' });
    }
    setLoading(false);
  };

  const getMethodColor = (method) => {
    const colors = {
      get: 'bg-green-100 text-green-800',
      post: 'bg-blue-100 text-blue-800',
      put: 'bg-yellow-100 text-yellow-800',
      delete: 'bg-red-100 text-red-800'
    };
    return colors[method] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {swaggerSpec.info.title}
          </h1>
          <p className="mt-2 text-gray-600">
            {swaggerSpec.info.description}
          </p>
          <div className="mt-1 text-sm text-gray-500">
            Version: {swaggerSpec.info.version}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Endpoints</h2>
              <div className="space-y-4">
                {Object.entries(swaggerSpec.paths).map(([path, methods]) => (
                  <div key={path} className="space-y-2">
                    <h3 className="font-medium text-gray-700">{path}</h3>
                    <div className="space-y-2 pl-4">
                      {Object.entries(methods).map(([method, details]) => (
                        <button
                          key={method}
                          onClick={() => handleEndpointSelect(path, method)}
                          className={`w-full text-left px-3 py-2 rounded-md 
                            ${getMethodColor(method)}
                            ${selectedEndpoint?.path === path && selectedEndpoint?.method === method
                              ? 'ring-2 ring-offset-2 ring-blue-500'
                              : ''
                            }`}
                        >
                          <span className="font-mono uppercase text-sm">
                            {method}
                          </span>
                          <span className="ml-2 text-sm">{details.summary}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {selectedEndpoint ? (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold flex items-center">
                      <span className={`px-3 py-1 rounded-md ${getMethodColor(selectedEndpoint.method)}`}>
                        {selectedEndpoint.method.toUpperCase()}
                      </span>
                      <span className="ml-3">{selectedEndpoint.path}</span>
                    </h2>
                    <p className="mt-2 text-gray-600">
                      {swaggerSpec.paths[selectedEndpoint.path][selectedEndpoint.method].description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Parameters</h3>
                    {swaggerSpec.paths[selectedEndpoint.path][selectedEndpoint.method].parameters?.map(param => (
                      <div key={param.name} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          {param.name}
                          {param.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder={param.description}
                          onChange={(e) => handleParamChange(param.name, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleExecute}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? 'Executando...' : 'Executar'}
                  </button>

                  {response && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Response</h3>
                      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                        <code>{JSON.stringify(response, null, 2)}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  Selecione um endpoint para ver os detalhes
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwaggerUI;