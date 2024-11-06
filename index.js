const express = require('express');
const path = require('path'); // Módulo para manejar rutas de archivos
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const carRoutes = require('./routes/carRoutes');
// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para analizar JSON
app.use(express.json());

// Ver que funcionen las variables de entorno
// console.log('Conexión a MongoDB:', process.env.MONGO_URI);

// Configurar la carpeta 'public' como carpeta estática
app.use(express.static(path.join(__dirname, 'public')));


// Conectar a MongoDB usando Mongoose
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000 // Espera 30 segundos antes de dar error
})
.then(() => {
    console.log('Conectado a MongoDB');
})
.catch((err) => {
    console.error('Error al conectar a MongoDB', err);
});

// Definir una ruta de prueba
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
// app.get('/', (req, res) => {
//     res.send('API funcionando correctamente :D');
// });

// Definir las rutas
app.use('/api/carritos', carRoutes); // Usa las rutas para la base de datos de carritos



// Escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});