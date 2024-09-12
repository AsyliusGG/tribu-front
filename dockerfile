# Usa una imagen base con Node.js
FROM node:22-alpine3.19

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que tu aplicación correrá
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]