document.addEventListener('DOMContentLoaded', function () {
    const inputTarea = document.querySelector('input');
    const btnAgregar = document.querySelector('.btn-add');
    const ulTareas = document.querySelector('ul');
    const emptyMessage = document.querySelector('.empty');

    btnAgregar.addEventListener('click', function (event) {
        event.preventDefault();
        const tareaTexto = inputTarea.value;

        if (tareaTexto.trim() !== '') {
            const nuevaTarea = document.createElement('li');
            nuevaTarea.innerHTML = `
          <p>${tareaTexto}</p>
          <button class="btn-delete"><i class="bi bi-trash"></i></button>
        `;
            ulTareas.appendChild(nuevaTarea);
            emptyMessage.style.display = 'none';
            inputTarea.value = '';
        }
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete') || event.target.closest('.btn-delete')) {
            event.target.closest('li').remove(); // Selecciona el elemento li y lo elimina
            if (ulTareas.children.length === 0) {
                emptyMessage.style.display = 'block';
            }
        }
    });


});
