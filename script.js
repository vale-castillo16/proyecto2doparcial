// Código para hacer editable el contenido
document.addEventListener("DOMContentLoaded", function () {
  // Cargar datos desde MySQL
  fetch("get_content.php")
      .then(response => response.json())
      .then(data => {
          // Actualizar el contenido de cada sección
          for (const seccion in data) {
              const contenido = data[seccion];
              const titulo = document.getElementById(`titulo-${seccion}`);
              const descripcion = document.getElementById(`descripcion-${seccion}`);

              if (titulo) titulo.textContent = contenido.titulo;
              if (descripcion) descripcion.textContent = contenido.descripcion;
          }
      });

  // Hacer editable el contenido
  const editarBtn = document.getElementById("editar-btn");
  const guardarBtn = document.getElementById("guardar-btn");

  editarBtn.addEventListener("click", function () {
      document.querySelectorAll("[contenteditable]").forEach(element => {
          element.contentEditable = true;
          element.style.border = "1px solid red";
      });
      editarBtn.style.display = "none";
      guardarBtn.style.display = "inline";
  });

  guardarBtn.addEventListener("click", function () {
      const cambios = [];

      document.querySelectorAll("[contenteditable]").forEach(element => {
          const seccion = element.id.split("-")[1];
          const tipo = element.id.split("-")[0];
          const valor = element.textContent;

          cambios.push({ seccion, tipo, valor });
      });

      // Enviar cambios al servidor
      fetch("update_content.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cambios)
      })
          .then(response => response.json())
          .then(data => {
              alert(data.mensaje || data.error);
              document.querySelectorAll("[contenteditable]").forEach(element => {
                  element.contentEditable = false;
                  element.style.border = "none";
              });
              editarBtn.style.display = "inline";
              guardarBtn.style.display = "none";
          });
  });
});

// Código para el calendario
const calendar = document.querySelector('.calendar');
const currentMonth = document.getElementById('current-month');
const eventDetails = document.getElementById('event-details');
const eventImage = document.getElementById('event-image');
const eventDescription = document.getElementById('event-description');

let currentDate = new Date();

const events = {
  '2024-10-07': { image: 'imagenes/eventos/evento1.jpeg' },
  '2024-10-21': { image: 'imagenes/eventos/evento2.jpeg' },
  '2025-01-27': { image: 'imagenes/eventos/evento3.jpeg' },
};

function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  let date = 1;
  let html = '';

  for (let i = 0; i < 6; i++) {
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
          if (i === 0 && j < startDay) {
              html += '<td></td>';
          } else if (date > daysInMonth) {
              html += '<td></td>';
          } else {
              const currentDateFormatted = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}-${date < 10 ? '0' + date : date}`;
              const event = events[currentDateFormatted];
              if (event) {
                  html += `<td class="event" data-image="${event.image}"> ${date} </td>`;
              } else {
                  html += `<td>${date}</td>`;
              }
              date++;
          }
      }
      html += '</tr>';
  }

  calendar.querySelector('tbody').innerHTML = html;
  currentMonth.textContent = getMonthName(month) + ' ' + year;

  // Añadir eventos a las celdas con eventos
  const eventCells = document.querySelectorAll('.event');
  eventCells.forEach(cell => {
      cell.addEventListener('click', showEventDetails);
  });
}

function showEventDetails(event) {
  const image = event.target.dataset.image;
  const description = event.target.dataset.description;

  eventImage.src = image;
  eventDescription.textContent = description;
  eventDetails.style.display = 'block';
}

function closeEventDetails() {
  eventDetails.style.display = 'none';
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function getMonthName(month) {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return monthNames[month];
}

generateCalendar(currentDate.getFullYear(), currentDate.getMonth());