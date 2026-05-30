const botones = document.querySelectorAll('.btn-mostrar-info');
const formularioSection = document.getElementById('modal-formulario');
const botonCerrar = document.querySelector('.btn-cerrar-form');

botones.forEach((boton) => {
    boton.addEventListener('click', () => {
        formularioSection.classList.add('activo');
        document.getElementById('errores').innerHTML = '';
    });
});

if (botonCerrar) {
    botonCerrar.addEventListener('click', () => {
        formularioSection.classList.remove('activo');
    });
}

function emailValido(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function telefonoValido(telefono) {
    let regex = /^\+?[0-9\s]{8,15}$/;
    return regex.test(telefono);
}

function guardarEnCSV(nombre, apellidos, email, telefono) {
    const encabezados = ["Nombre", "Apellidos", "Email", "Telefono"];
    const limpiar = (texto) => `"${texto.replace(/"/g, '""')}"`;

    const filaDatos = [
        limpiar(nombre),
        limpiar(apellidos),
        limpiar(email),
        limpiar(telefono)
    ];

    const contenidoCSV = "\uFEFF" + encabezados.join(",") + "\n" + filaDatos.join(",");
    const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
    const enlace = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    enlace.setAttribute("href", url);
    enlace.setAttribute("download", `registro_${nombre.toLowerCase()}.csv`);
    enlace.style.visibility = 'hidden';
    
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

document.getElementById('formulario').addEventListener('submit', function(event) {
    let errores = [];

    let nombre = document.getElementById('nombre').value.trim();
    let apellidos = document.getElementById('apellidos').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefono = document.getElementById('telefono').value.trim();

    if (nombre === '') {
        errores.push('El campo Nombre es Obligatorio.');
    }

    if (apellidos === '') {
        errores.push('El campo Apellidos es Obligatorio.');
    }

    if (email === '') {
        errores.push('Debe ingresar un correo electrónico.');
    } else if (!emailValido(email)) {
        errores.push('El formato del correo electrónico no es válido (ejemplo@dominio.com).');
    }

    if (telefono === '') {
        errores.push('Debe ingresar un número de teléfono.');
    } else if (!telefonoValido(telefono)) {
        errores.push('El número de teléfono no es válido (ingrese solo números o formato +569...).');
    }

    if (errores.length > 0) {
        event.preventDefault();
        document.getElementById('errores').innerHTML = errores.join('<br>');
    } else {
        event.preventDefault();
        guardarEnCSV(nombre, apellidos, email, telefono);
        alert('Formulario enviado');
        document.getElementById('formulario').reset();
        document.getElementById('errores').innerHTML = '';
        formularioSection.classList.remove('activo');
    }
});