const express = require('express');
const router = express.Router();
const Carrito = require('../models/carritoModel'); // Importa el modelo carritoModel
const path = require('path'); // Módulo para manejar rutas de archivos

// Obtener todos los registros de carritos
router.get('/', async (req, res) => {
  try {
    // res.sendFile(path.join(__dirname, '../public', 'index.html'));
    const carritos = await Carrito.find();
    res.json(carritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos de carritos' });
  }
});

// Obtener un registro específico de carrito por ID
router.get('/:id', async (req, res) => {
  try {
    const carrito = await Carrito.findById(req.params.id);
    if (!carrito) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
});

// Crear un nuevo registro de carrito
router.post('/', async (req, res) => {
  const { id_carrito, posicion, trayectoria, interseccion, peatones, vehiculos, paradas, duracion_paradas } = req.body;

  try {
    const newCarrito = new Carrito({
      id_carrito,
      posicion,
      trayectoria,
      interseccion,
      peatones,
      vehiculos,
      paradas,
      duracion_paradas
    });

    await newCarrito.save();
    res.status(201).json(newCarrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el registro de carrito' });
  }
});

// Actualizar un registro de carrito por ID
router.put('/:id', async (req, res) => {
  const { id_carrito, posicion, trayectoria, interseccion, peatones, vehiculos, paradas, duracion_paradas } = req.body;

  try {
    const updatedCarrito = await Carrito.findByIdAndUpdate(
      req.params.id,
      {
        id_carrito,
        posicion,
        trayectoria,
        interseccion,
        peatones,
        vehiculos,
        paradas,
        duracion_paradas
      },
      { new: true }
    );

    if (!updatedCarrito) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.json(updatedCarrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
});

// Eliminar un registro de carrito por ID
router.delete('/:id_carrito', async (req, res) => {
  try {
    // Busca y elimina el carrito usando el campo id_carrito
    const deletedCarrito = await Carrito.findOneAndDelete({ id_carrito: req.params.id_carrito });
    
    if (!deletedCarrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json({ message: 'Carrito eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
});


module.exports = router;
