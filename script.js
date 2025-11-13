// Variables básicas
const titulo = "Generador de Tarjetas de Usuario";
const cantidadDefault = 5;
const contenedor = document.getElementById("contenedor-tarjetas");
const boton = document.getElementById("generar-btn");

// Clase Usuario
class Usuario {
  constructor(nombre, edad, email, activo) {
    this.nombre = nombre;
    this.edad = edad;
    this.email = email;
    this.activo = activo;
    this.fecha = new Date();
  }

  presentar() {
    return `${this.nombre} (${this.edad} años) - ${this.email}`;
  }

  esMayor() {
    return this.edad >= 18;
  }
}

// Función para generar usuarios
function generarUsuarios(cantidad) {
  const usuarios = [];
  for (let i = 1; i <= cantidad; i++) {
    const edad = Math.floor(Math.random() * 48) + 18; // entre 18 y 65
    const email = `usuario${i}@correo.com`;
    const activo = Math.random() > 0.3; 
    usuarios.push(new Usuario(`Usuario ${i}`, edad, email, activo));
  }
  return usuarios;
}

// Mostrar usuarios en el DOM
function mostrarUsuarios(usuarios) {
  contenedor.innerHTML = ""; // limpiar
  usuarios.forEach(u => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <h2>${u.nombre}</h2>
      <p><strong>Edad:</strong> ${u.edad}</p>
      <p><strong>Email:</strong> ${u.email}</p>
      <p><strong>Activo:</strong> ${u.activo ? "Sí " : "No "}</p>
      <p><em>Registrado: ${u.fecha.toLocaleDateString()}</em></p>
    `;
    tarjeta.style.borderColor = u.esMayor() ? "#007bff" : "red";
    tarjeta.style.opacity = u.activo ? "1" : "0.7";
    contenedor.appendChild(tarjeta);
  });
}

// Evento del botón
boton.addEventListener("click", () => {
  let cantidad = parseInt(prompt("¿Cuántos usuarios deseas generar?"), 10);
  if (isNaN(cantidad) || cantidad <= 0) cantidad = cantidadDefault;
  const usuarios = generarUsuarios(cantidad);
  mostrarUsuarios(usuarios);
});

