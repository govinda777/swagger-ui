#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🚀 Iniciando processo de build e deploy local..."

# Verifica se está no branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${RED}❌ Você não está no branch main! Por favor, mude para o branch main primeiro.${NC}"
    exit 1
fi

# Verifica se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Você tem mudanças não commitadas. Faça commit ou stash das mudanças primeiro.${NC}"
    exit 1
fi

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não está instalado!${NC}"
    exit 1
fi

# Verifica se o Yarn está instalado
if ! command -v yarn &> /dev/null; then
    echo -e "${RED}❌ Yarn não está instalado!${NC}"
    exit 1
fi

# Instala dependências
echo "📦 Instalando dependências..."
yarn install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Falha ao instalar dependências${NC}"
    exit 1
fi

# Gera o build
echo "🛠️ Gerando build..."
yarn build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Falha ao gerar o build${NC}"
    exit 1
fi

# Deploy para gh-pages
echo "📤 Fazendo deploy para gh-pages..."
git checkout gh-pages 2>/dev/null || git checkout -b gh-pages
rm -rf ./* # Limpa o diretório atual
cp -r dist/* . # Copia os arquivos do build
git add .
git commit -m "Deploy local: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin gh-pages --force

# Volta para o branch main
git checkout main

echo -e "${GREEN}✅ Deploy completado com sucesso!${NC}"