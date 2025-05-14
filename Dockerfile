# Usa una imagen de Node
FROM node:18

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto (asegúrate de que Express use ese)
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "start"]
