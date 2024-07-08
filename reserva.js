document.addEventListener('DOMContentLoaded', function () {
    const btnReservar = document.querySelectorAll('.btn-reservar');
    const seccionReserva = document.getElementById('seccion-reserva');
    const formReserva = document.getElementById('form-reserva');
    const hotelName = document.getElementById('hotelName');
    const precioNoche = document.getElementById('precioNoche');
    const fechaEntrada = document.getElementById('fechaEntrada');
    const fechaSalida = document.getElementById('fechaSalida');
    const precioTotal = document.getElementById('precioTotal');
    const extraServices = document.querySelectorAll('.form-check-input');
    const nombre = document.getElementById('nombre');
    const rut = document.getElementById('rut');
    const fechaNacimiento = document.getElementById('fechaNacimiento');

    function calcularPrecioTotal() {
        const precioPorNoche = parseInt(precioNoche.value.replace('$', ''));
        const fecha1 = new Date(fechaEntrada.value);
        const fecha2 = new Date(fechaSalida.value);
        const noches = Math.round((fecha2 - fecha1) / (1000 * 60 * 60 * 24));

        if (noches > 0) {
            let total = precioPorNoche * noches;

            extraServices.forEach(service => {
                if (service.checked) {
                    total += parseInt(service.value);
                }
            });

            precioTotal.value = `$${total}`;
            return noches;
        } else {
            precioTotal.value = "Fecha de salida debe ser posterior a la de entrada";
            return 0;
        }
    }

    function limpiarFormulario() {
        formReserva.reset();
        precioTotal.value = '';
    }

    btnReservar.forEach(btn => {
        btn.addEventListener('click', function () {
            const hotel = this.getAttribute('data-hotel');
            const precio = this.getAttribute('data-precio');

            hotelName.value = hotel;
            precioNoche.value = `$${precio}`;
            fechaEntrada.value = "";
            fechaSalida.value = "";
            precioTotal.value = "";

            seccionReserva.style.display = 'block';
            window.scrollTo(0, seccionReserva.offsetTop);
        });
    });

    fechaEntrada.addEventListener('change', calcularPrecioTotal);
    fechaSalida.addEventListener('change', calcularPrecioTotal);
    extraServices.forEach(service => {
        service.addEventListener('change', calcularPrecioTotal);
    });

    formReserva.addEventListener('submit', function (e) {
        e.preventDefault();
        const noches = calcularPrecioTotal();
        if (noches > 0) {
            alert(`Reserva confirmada para ${noches} noches. El checkout debe realizarse a las 13:00 el día ${fechaSalida.value}.`);
            limpiarFormulario();
        }
    });
});
