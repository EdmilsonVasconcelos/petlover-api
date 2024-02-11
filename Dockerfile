FROM node:20

# Crie o diretório da aplicação
WORKDIR /usr/src/app

# Instale as dependências da aplicação
COPY package*.json ./
RUN npm install

# Copie o código da aplicação
COPY . .

# Compile a aplicação
RUN npm run build

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "dist/main" ]