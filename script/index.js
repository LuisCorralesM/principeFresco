import {pintarProductos, modificar, addCarrito} from "./getProductos.js";
import {displayCarrito} from './displayCarrito.js'

const getProductos = async ()=>{
    try {
        const res = await fetch('http://localhost:3000/productos')
        const data = await res.json()
        pintarProductos(data)

        document.addEventListener('click', e=>{
            if(e.target.parentElement.matches('.imagen-producto') || e.target.parentElement.matches('.descripcion-producto')){
                let id = e.target.parentElement.dataset.id 
                console.log(id);
                modificar(data,id)
            }
            if(e.target.matches('.btn1')){
                console.log(e.target.dataset.id);
                addCarrito(data,e.target.dataset.id)
            }
            if(e.target.matches('.btn2')){
                console.log(e.target.dataset.id);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

getProductos()

document.addEventListener('click', e=>{
    e.preventDefault()
    if(e.target.matches('#btnCarrito')){
        displayCarrito(e)
    }
})
