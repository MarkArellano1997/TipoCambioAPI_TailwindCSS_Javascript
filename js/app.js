window.addEventListener('DOMContentLoaded', () => {

    const monedaSelect = document.querySelector('#moneda')

    const changeMonedaSelect = document.querySelector('#moneda-cambio')

    const formulario = document.querySelector('#formulario')

    const resultado = document.querySelector('#resultado')

    formulario.addEventListener('submit', validarFormulario)

    obtenerMonedas()

    async function obtenerMonedas() {

        const url = 'https://api.frankfurter.app/currencies'

        try {
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            mostrarMonedas(resultado);

        } catch (error) {
            console.log(error)
        }

    }

    function mostrarMonedas(monedas) {

        for (let moneda in monedas) {

            const option = document.createElement('option')
            option.value = moneda
            option.textContent = monedas[moneda]

            monedaSelect.appendChild(option);

        }

        for (let moneda in monedas) {

            const option = document.createElement('option')
            option.value = moneda
            option.textContent = monedas[moneda]

            changeMonedaSelect.appendChild(option);

        }

    }

    function validarFormulario(e) {
        e.preventDefault()
        const monedaSelect = document.querySelector('#moneda').value

        const changeMonedaSelect = document.querySelector('#moneda-cambio').value

        if ([monedaSelect, changeMonedaSelect].some(campo=>campo==='')) {
            mostrarAlerta('Todos los campos son obligatorios')
            return
        }
        
        consultarCambio(monedaSelect, changeMonedaSelect)
    }

    function mostrarAlerta(mensaje) {
        
        limpiarHtml()

        const alerta = document.createElement('p')

        alerta.classList.add('bg-red-100', 'text-red-500', 'w-full', 'p-2', 'mt-4', 'rounded', 'text-center')

        alerta.textContent = mensaje

        resultado.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }

    function limpiarHtml() {
        
        while (resultado.firstChild) {
            resultado.removeChild(resultado.firstChild)
        }
    }

    async function consultarCambio(moneda, monedaCambio) {

        const monedaCantidad = document.querySelector('#moneda-cantidad').value
        
        const url = `https://api.frankfurter.app/latest?amount=${monedaCantidad}&from=${moneda}&to=${monedaCambio}`
        
        try {
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            
            mostrarCambio(resultado.rates[monedaCambio]);
            
        } catch (error) {
            console.log(error);
            
        }

    }


    function mostrarCambio(resultado) {

        const monedaCambioCantidad = document.querySelector('#moneda-cambio-cantidad')
        monedaCambioCantidad.value = resultado

        console.log(resultado);
        
    }
})