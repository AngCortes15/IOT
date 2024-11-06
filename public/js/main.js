// Selecciona el contenedor donde se mostrarán las tarjetas
const cardsContainer = document.getElementById('cards-container');

// Función para cargar los datos desde la API
async function loadCarritos() {
  try {
    // Realiza una solicitud GET al endpoint de tu API
    const response = await fetch('/api/carritos');
    const carritos = await response.json();

    // Itera sobre los datos recibidos y crea una tarjeta para cada carrito
    carritos.forEach(carrito => {
      // Crea un elemento de tarjeta
      const card = document.createElement('div');
      card.classList.add('card');

      // Agrega contenido HTML con los datos de cada carrito
      card.innerHTML = `
        <h3>Carrito ID: ${carrito.id_carrito}</h3>
        <p><strong>Posición:</strong> ${carrito.posicion}</p>
        <p><strong>Trayectoria:</strong> ${carrito.trayectoria}</p>
        <p><strong>Intersección:</strong> ${carrito.interseccion}</p>
        <p><strong>Peatones:</strong> ${carrito.peatones}</p>
        <p><strong>Vehículos:</strong> ${carrito.vehiculos}</p>
        <p><strong>Paradas:</strong> ${carrito.paradas}</p>
        <p><strong>Duración Paradas:</strong> ${carrito.duracion_paradas}s</p>
      `;

      // Añade la tarjeta al contenedor
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

// Llama a la función para cargar los datos cuando se carga la página
loadCarritos();
