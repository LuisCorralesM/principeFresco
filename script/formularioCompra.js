
let productosCompra = {}


let formCompra = document.querySelector('.btnForm')

    formCompra.addEventListener('click', (e) =>{
        e.preventDefault()
        let nombreUsuario = document.getElementById('nombre-comprador').value
        let fechaCompra = document.getElementById('fecha-compra').value


        console.log(e.target);

        productosCompra = JSON.parse(localStorage.getItem('carrito'));

        console.log(productosCompra)
        const datosCompra = {
            nombreUsuario:nombreUsuario,
            fechaCompra:fechaCompra,
            productosCompra:productosCompra
        }
        console.log(datosCompra);
        localStorage.setItem('datosCompra', JSON.stringify(datosCompra))
       
    })


