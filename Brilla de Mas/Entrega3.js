const formulario = document.getElementById("miFormulario");

// Objeto  servicios de limpieza
const serviciosLimpieza = {
  colchon1plaza: {
    id: 1,
    nombre: "colchon 1 plaza",
    precio: 6000,
    aDomicilio: true,
  },
  colchon2plazas: {
    id: 2,
    nombre: "colchon 2 plazas",
    precio: 8500,
    aDomicilio: true,
  },
  sillon2cuerpos: {
    id: 3,
    nombre: "sillon 2 cuerpos",
    precio: 8000,
    aDomicilio: true,
  },
  sillon3cuerpos: {
    id: 4,
    nombre: "sillon 3 cuerpos",
    precio: 11000,
    aDomicilio: true,
  },
  vehiculo5asientos: {
    id: 5,
    nombre: "Vehiculo 5 asientos",
    precio: 9500,
    aDomicilio: false,
  },
  vehiculo7asientos: {
    id: "6",
    nombre: "Vehiculo 7 asientos",
    precio: 12000,
    aDomicilio: false,
  },
};

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const domicilio = document.getElementById("domicilio").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const servicio = document.getElementById("servicio").value;

  if (!nombre || !domicilio || !telefono || !email) {
    alert("Por favor, complete todos los campos y seleccione una cantidad.");
    return;
  }

  if (!serviciosLimpieza[servicio]) {
    alert("Por favor, seleccione un servicio válido.");
    return;
  }

  // Validacion del campo numero de teléfono
  if (!/^\d+$/.test(telefono)) {
    return;
  }
  if (nombre.length < 4) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El nombre de usuario es muy corto. Indentifiquese con nombre completo.",
    });
    return;
  }
  if (domicilio.length < 15) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, sea mas especifico al escribir su direccion.",
    });
    return;
  }
  if (telefono.length !== 10) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, verifique su numero de telefono. Solo puede colocar numero celular con el numero de area.",
    });
    return;
  }
  if (email.length > 100) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, verifique la longitud de los email.",
    });
    return;
  }

  // un objeto con los dats
  const datos = {
    nombre: nombre,
    domicilio: domicilio,
    telefono: telefono,
    email: email,
    servicio: servicio,
    mostrados: false,
  };

  // guardar datos en LocalStorage
  localStorage.setItem("datosUsuario", JSON.stringify(datos));

  alert("Datos guardados correctamente en LocalStorage.");

  // Limpiar el formulario
  formulario.submit();
});

//  Datos almacenados en LocalStorage
const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));

// Obtener el elemento HTML donde se muestran los datos
const datosMostrados = document.getElementById("datosMostrados");

// Verificacion de datos guardados en LocalStoragee
if (datosGuardados && !datosGuardados.mostrados) {
  const datos = { mostrados: true };
  localStorage.setItem("datosUsuario", JSON.stringify(datos));
  //Mensaje para mostrar los datos
  const mensaje = `
        <h2>Datos ingresados por el usuario:</h2>
        <p><strong>Nombre:</strong> ${datosGuardados.nombre}</p>
        <p><strong>Dirección:</strong> ${datosGuardados.domicilio}</p>
        <p><strong>Teléfono:</strong> ${datosGuardados.telefono}</p>
        <p><strong>Email:</strong> ${datosGuardados.email}</p>
        <p><strong>Servicio elegido:</strong> ${datosGuardados.servicio}</p>
       
      `;

  // Mostrar  el  mensaje en el elemento HTML
  datosMostrados.innerHTML = mensaje;
}

/////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const botonMostrarLista = document.getElementById("mostrarLista");
  const listaServicios = document.getElementById("listaServicios");

  botonMostrarLista.addEventListener("click", function () {
    listaServicios.innerHTML = ""; // Limpia la lista antes de mostrar los servicios("string vacio")

    for (const servicio in serviciosLimpieza) {
      const servicioData = serviciosLimpieza[servicio];
      const listItem = document.createElement("li");

      listItem.innerHTML = `
              <strong>Nombre:</strong> ${servicioData.nombre}<br>
              <strong>Tamaño:</strong> ${servicioData.id}<br>
              <strong>Precio:</strong> $${servicioData.precio}<br>
              <strong>Servicio a Domicilio:</strong> ${
                servicioData.aDomicilio ? "Sí" : "No"
              }
          `;

      listaServicios.appendChild(listItem);
    }
  });
});
