export {displayCarrito}

const section = document.querySelector('section')
const contenedorCarrito = document.querySelector('#contenedor-carrito')

const displayCarrito = e => {
    section.classList.toggle('displayNone')
    contenedorCarrito.classList.toggle('displayNone')
    document.querySelector('.footer-will').classList.toggle('displayNone')
}