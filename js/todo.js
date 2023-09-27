document.addEventListener('DOMContentLoaded', function () {
    const inputTarea = document.querySelector('input');
    const btnAgregar = document.querySelector('.btn-add');
    const ulTareas = document.querySelector('ul');
    const emptyMessage = document.querySelector('.empty');
    cargarTareas()

    function cargarTareas() {
        try {
            const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
            tareasGuardadas.forEach(function (tareaTexto) {
                const nuevaTarea = document.createElement('li');
                nuevaTarea.innerHTML = `
                <p>${tareaTexto}</p>
                <button class="btn-delete"></button>
                `;
                ulTareas.appendChild(nuevaTarea);
            });

            if (tareasGuardadas.length > 0) {
                emptyMessage.style.display = 'none';
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Tarea agregada!!!',
                text: error,
                showConfirmButton: true,
                timer: 3000
            })
        }
    }

    function guardarTarea(tareaTexto) {
        try {
            const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
            tareasGuardadas.push(tareaTexto);
            localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tarea agregada!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Tarea agregada!!!',
                text: error,
                showConfirmButton: true,
                timer: 3000
            })
        }
    }

    function eliminarTarea(tareaTexto) {
        try {
            const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
            const index = tareasGuardadas.indexOf(tareaTexto);
            if (index > -1) {
                tareasGuardadas.splice(index, 1);
                localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tarea eliminada',
                showConfirmButton: false,
                timer: 1500
            })
            if (ulTareas.children.length === 0) {
                emptyMessage.style.display = 'block';
            }

        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Tarea agregada!!!',
                text: error,
                showConfirmButton: true,
                timer: 3000
            })
        }
    }


    btnAgregar.addEventListener('click', function (event) {
        event.preventDefault();
        const tareaTexto = inputTarea.value;
        if (tareaTexto.trim() === '') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No se pueden agregar tareas vacias...',
                showConfirmButton: false,
                timer: 2000
            })
            return
        }

        const nuevaTarea = document.createElement('li');
        nuevaTarea.innerHTML = `
          <p>${tareaTexto}</p>
          <button class="btn-delete"></button>
        `;
        ulTareas.appendChild(nuevaTarea);
        emptyMessage.style.display = 'none';
        inputTarea.value = '';
        guardarTarea(tareaTexto)
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete')) {
            const tareaTexto = event.target.parentElement.querySelector('p').textContent;
            event.target.closest('li').remove(); // Selecciona el elemento li y lo elimina
            eliminarTarea(tareaTexto)
        }
    });


});
