// Obtener referencia al formulario y a la lista de actividades
const formulario = document.getElementById('formulario');
const listaActividades = document.getElementById('listaActividades');

// Función para crear una nueva actividad
const crearActividad = (actividad) => {
  // Crear elemento div para la actividad
  const divActividad = document.createElement('div');
  divActividad.classList.add('alert', 'alert-danger');
  divActividad.innerHTML = `
    <i class="material-icons float-left mr-2">book</i>
    <b>${actividad}</b> - Pendiente
    <span class="float-right">
      <i class="material-icons done">done</i>
      <i class="material-icons edit">edit</i>
      <i class="material-icons delete">delete</i>
    </span>
  `;
  
  // Agregar la actividad al DOM
  listaActividades.appendChild(divActividad);
};

// Función para guardar la actividad en el almacenamiento local
const guardarActividad = (actividad) => {
  // Obtener las actividades guardadas previamente
  const actividades = obtenerActividades();

  // Agregar la nueva actividad al arreglo
  actividades.push(actividad);

  // Guardar el arreglo actualizado en el almacenamiento local
  localStorage.setItem('actividades', JSON.stringify(actividades));
};

// Función para obtener las actividades guardadas en el almacenamiento local
const obtenerActividades = () => {
  const actividadesString = localStorage.getItem('actividades');
  
  // Si no hay actividades guardadas, retornar un arreglo vacío
  if (!actividadesString) {
    return [];
  }
  
  // Convertir el string JSON a un arreglo y retornarlo
  return JSON.parse(actividadesString);
};

// Función para cargar las actividades almacenadas en el inicio
const cargarActividades = () => {
  // Obtener las actividades guardadas
  const actividades = obtenerActividades();

  // Recorrer el arreglo de actividades y crear los elementos en el DOM
  actividades.forEach(actividad => {
    crearActividad(actividad);
  });
};

// Función para cambiar el estado de una actividad a "Hecha"
const cambiarEstado = (elemento) => {
  const actividadElemento = elemento.parentElement.parentElement;
  actividadElemento.classList.remove('alert-danger');
  actividadElemento.classList.add('alert-success');
  actividadElemento.innerHTML = actividadElemento.innerHTML.replace('Pendiente', 'Hecha');
};

// Función para editar una actividad
const editarActividad = (elemento) => {
  const actividadElemento = elemento.parentElement.parentElement;
  const actividadTexto = actividadElemento.querySelector('b').textContent;
  
  const nuevaActividad = prompt('Editar actividad', actividadTexto);
  
  if (nuevaActividad && nuevaActividad.trim() !== '') {
    actividadElemento.querySelector('b').textContent = nuevaActividad;
    
    // Guardar el arreglo actualizado en el almacenamiento local
    const actividades = obtenerActividades();
    const index = actividades.indexOf(actividadTexto);
    actividades[index] = nuevaActividad;
    localStorage.setItem('actividades', JSON.stringify(actividades));
  }
};

// Función para eliminar una actividad
const eliminarActividad = (elemento) => {
  const actividadElemento = elemento.parentElement.parentElement;
  const actividadTexto = actividadElemento.querySelector('b').textContent;
  
  actividadElemento.remove();
  
  // Obtener las actividades guardadas
  const actividades = obtenerActividades();
  
  // Filtrar las actividades para eliminar la actividad correspondiente
  const nuevasActividades = actividades.filter(actividad => actividad !== actividadTexto);
  
  // Guardar el arreglo actualizado en el almacenamiento local
  localStorage.setItem('actividades', JSON.stringify(nuevasActividades));
};

// Evento para agregar una nueva actividad
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const actividadInput = document.getElementById('actividad');
  const nuevaActividad = actividadInput.value;

  if (nuevaActividad && nuevaActividad.trim() !== '') {
    crearActividad(nuevaActividad);
    guardarActividad(nuevaActividad);
    actividadInput.value = '';
  }
});

// Evento para cambiar el estado de una actividad al hacer clic en el icono "done"
listaActividades.addEventListener('click', (e) => {
  if (e.target.classList.contains('done')) {
    cambiarEstado(e.target);
  }
});

// Evento para editar una actividad al hacer clic en el icono "edit"
listaActividades.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit')) {
    editarActividad(e.target);
  }
});

// Evento para eliminar una actividad al hacer clic en el icono "delete"
listaActividades.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    eliminarActividad(e.target);
  }
});

// Cargar las actividades almacenadas en el inicio
cargarActividades();
