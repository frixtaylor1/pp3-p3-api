# Utiliza la imagen oficial de Node.js como base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la API al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que la API escuchará
EXPOSE 3000

# Comando para iniciar la API
CMD ["npm", "start"]
