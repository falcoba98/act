document.addEventListener("DOMContentLoaded", function () {
    const contenedorElement = document.getElementById("contenedor"); // toma el contenedor donde irán apareciendo los items
    const inputItem = document.getElementById("item"); // toma los items que se agregan en el input con este id
    const btnAgregar = document.getElementById("agregar"); // toma el botón agregar
    const btnLimpiar = document.getElementById("limpiar"); // toma el botón limpiar

    //localStorage es una API de almacenamiento web 
    //A diferencia de una variable normal en JavaScript que solo existe en la memoria mientras la página está abierta,
    //los datos almacenados en localStorage
    //permanecen en el navegador hasta que se eliminen explícitamente, ya sea por el usuario o mediante código JavaScript.
    function obtenerListado() {
        const listadoGuardado = localStorage.getItem("listadoItems"); //actua como variable persistente que se almacena en el navegador usando localStorage
        if (listadoGuardado) {
            // si hay una lista guardada, parsea la cadena json a un array
            return JSON.parse(listadoGuardado);
        } else {
            // si no hay un listado guardado se dretorna un arreglo vacio
            return [];
        }
    }

    // para guardar el listado en `localStorage`
    function guardarListado(listado) {
        localStorage.setItem("listadoItems", JSON.stringify(listado)); //aca convertimos un arreglo a una cadena de texto en formato json
    }

    // para actualizar la vista del listado
    function actualizarVistaListado() { //muestra en el contenedor los items del listado guardados en localstorage
        const listado = obtenerListado();
        contenedorElement.innerHTML = ""; 
        listado.forEach(function (item) {
            const li = document.createElement("li");
            li.textContent = item;
            li.className = "list-group-item"; //se define esta clase para que quede con estilo de lista de Bootstrap
            contenedorElement.appendChild(li);
        });
    }

    // Evento para agregar items
    btnAgregar.addEventListener("click", function () { //configura un "event listener", se ejecuta esto cuando el boton sea cliqueado.
        const nuevoItem = inputItem.value.trim(); // declara una constante nuevoItem que almacenara el valor del input
        if (nuevoItem) {
            const listado = obtenerListado(); //llama a la función obtenerlistado definida antes, que obtiene los elementos ya guardados en localstorage
            listado.push(nuevoItem); //añade un nuevo elemento al final del arreglo.
            guardarListado(listado);  //llama a función ya definida que guarda el listado en localstorage
            actualizarVistaListado(); //llama a función ya definida que actualiza el contenedor para que aparezcan items del listado
            inputItem.value = ""; 
        }
    });

    // Evento para limpiar el listado
    btnLimpiar.addEventListener("click", function () {
        localStorage.removeItem("listadoItems"); //remueve elementos del localstorage
        actualizarVistaListado(); //se actualiza contenedor con listado vacío (no se ve ningún elemento)
    });

    // Inicializar la vista del listado al cargar la página
    actualizarVistaListado();
});
