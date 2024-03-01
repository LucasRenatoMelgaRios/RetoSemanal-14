const agregarMascotaContainer = document.querySelector('.agregarMascotaContainer');
const agregarMascotaButton = document.getElementById('agregarMascotaButton')
const cerrarFormularioCancelar = document.getElementById('cerrarFormularioButton')
const mainContent = document.querySelector('.mainContent');

agregarMascotaButton.addEventListener('click', abrirFormulario);
cerrarFormularioCancelar.addEventListener('click', cerrarFormulario);

function abrirFormulario() {
    agregarMascotaContainer.style.display = 'block';
}

function cerrarFormulario(e) {
    e.preventDefault();
    agregarMascotaContainer.style.display = 'none';

}



document.addEventListener('DOMContentLoaded', function() {
  // Función para pintar todas las cards
  function renderCards() {
      // Obtener la referencia al contenedor donde se pintarán las cards
      const mainContent = document.querySelector('.mainContent');

      // Limpiar el contenido actual del contenedor
      mainContent.innerHTML = '';

      // Realizar la solicitud HTTP para obtener los datos del archivo JSON
      fetch('http://localhost:3000/cats')
          .then(response => response.json())
          .then(data => {
              // Iterar sobre los datos de los gatos
              data.forEach(cat => {
                  // Crear un nuevo elemento div para la card
                  const card = document.createElement('div');
                  card.classList.add('card');

                  // Crear el contenido de la card
                  const deleteButton = document.createElement('div');
                  deleteButton.classList.add('deleteButton');
                  deleteButton.innerHTML = `
                      <img src="./imagenes/borrar.png" class="borrarIcon">
                      <p>Delete</p>
                  `;

                  const imageContainer = document.createElement('div');
                  imageContainer.classList.add('imageContainer');
                  imageContainer.innerHTML = `<img src="${cat.img}" class="dogImage">`;

                  const descriptionContainer = document.createElement('div');
                  descriptionContainer.classList.add('descriptionContainer');
                  descriptionContainer.innerHTML = `
                      <h3>${cat.name}</h3>
                      <p><span>${cat.telefono}</span>|<span>${cat.descripcion}</span></p>
                      <p>${cat.pais}</p>
                      <p>${cat.descripcion}</p>
                  `;

                  // Agregar los elementos creados al contenedor principal
                  card.appendChild(deleteButton);
                  card.appendChild(imageContainer);
                  card.appendChild(descriptionContainer);
                  mainContent.appendChild(card);

                  // Agregar el evento de clic al botón de borrar
                  deleteButton.addEventListener('click', function() {
                      // Realizar la solicitud DELETE al archivo JSON
                      fetch(`http://localhost:3000/cats/${cat.id}`, {
                          method: 'DELETE'
                      })
                      .then(response => {
                          if (!response.ok) {
                              throw new Error('No se pudo borrar el gato.');
                          }
                          // Volver a pintar todas las tarjetas después de borrar
                          renderCards();
                      })
                      .catch(error => {
                          console.error('Error al borrar el gato:', error);
                      });
                  });
              });
          })
          .catch(error => {
              console.error('Error al obtener los datos del archivo JSON:', error);
          });
  }

  // Llamar a la función para pintar todas las cards después de que se cargue el DOM
  renderCards();

});

// Función para agregar una nueva mascota
function agregarMascota() {
  // Obtener los valores de los campos de entrada
  const nombre = document.querySelector('input[name="Nombre"]').value;
  const telefono = document.querySelector('input[name="Telefono"]').value;
  const opcion = document.querySelector('select[name="opcion"]').value;
  const urlFotografia = document.querySelector('input[name="Url de la fotografía"]').value;
  const mensaje = document.querySelector('textarea[name="mensaje"]').value;

  // Crear el objeto de datos de la nueva mascota
  const nuevaMascota = {
      nombre: nombre,
      telefono: telefono,
      opcion: opcion,
      urlFotografia: urlFotografia,
      mensaje: mensaje
  };

  // Realizar la solicitud POST al archivo JSON para agregar la nueva mascota
  fetch('http://localhost:3000/cats', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaMascota)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('No se pudo agregar la nueva mascota.');
      }
      // Volver a pintar todas las tarjetas después de agregar la nueva mascota
      renderCards();
  })
  .catch(error => {
      console.error('Error al agregar la nueva mascota:', error);
  });
}









