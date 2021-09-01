export {getProductos} 
let Carrito = []

const getProductos = async (p)=>{
    try {
        const res = await fetch('http://localhost:3000/productos')
        const data = await res.json()
        pintarProductos(data,p)
        buttonCarrito(data,p)
    } catch (error) {
        console.log(error);
    }
}

const pintarProductos = (data,p)=>{
    // imagenes vista pequeña
    const 
    img1Pequeña = document.querySelector('.img1 img'),
    img2Pequeña = document.querySelector('.img2 img'),
    img3Pequeña = document.querySelector('.img3 img'),
    img4Pequeña = document.querySelector('.img4 img');

    img1Pequeña.setAttribute('src', data[p].imagenes[0])
    img2Pequeña.setAttribute('src', data[p].imagenes[1])
    img3Pequeña.setAttribute('src', data[p].imagenes[2])
    img4Pequeña.setAttribute('src', data[p].imagenes[3])

    // imagen vista grande e info producto
    const 
    divImgGrande = document.querySelector('.gird-item-grande img'),
    nombreProducto = document.querySelector('.nombre-producto h1'),
    precioProducto = document.querySelector('.precio p'),
    listaTallas = document.querySelectorAll('.lista-tallas li'),
    btns = document.querySelector('.botones')
    
    divImgGrande.setAttribute('src', data[p].imagenes[0])

    nombreProducto.textContent = data[p].nombre
    precioProducto.textContent = data[p].precio
    
    listaTallas.forEach((li, index) => {
        li.textContent = data[p].tallas[index]
    })

    btns.innerHTML = `
    <button class="btn1" data-id="${data[p].id}">ADD TO CART</button>
    <button class="btn2" data-id="${data[p].id}">BUY  IT NOW</button>
   
    `
    // Todos los productos
    const 
    rowProductos = document.querySelector('.grid-row-productos')

    rowProductos.innerHTML = ''
    for(let i=1; i<4; i++){
       rowProductos.innerHTML += `
       <div class="grid-column-producto">
            <div class="imagen-producto imgPro${i}"  data-id="${data[i].id}">
                <img src="${data[i].imagenes[0]}" alt="">
            </div>
            <div class="descripcion-producto"  data-id="${data[i].id}">
                <p class="nombre-producto">${data[i].nombre}</p>
                <p class="precio-producto">${data[i].precio}</p>
            </div>
       </div>
       `
    }
}


const 
cardProducto = document.querySelector('.grid-column-producto')

document.addEventListener('click', e=>{
    if(e.target.parentElement.matches('.imagen-producto') || e.target.parentElement.matches('.descripcion-producto')){
        let id = e.target.parentElement.dataset.id 
        console.log('bingo');
        console.log(id);
        getProductos(id)
    }
})




//Funcion listar carrito
let listaCompra = document.getElementById('items')
let listaTotal = document.getElementById('footer')
const listarCarrito = () => {
    listaCompra.innerHTML = '';
    let total = 0;
    let totalInt = 0;
    Carrito = JSON.parse(localStorage.getItem('Carrito'));
    Carrito === null ? (Carrito = []) : (
    Carrito.forEach(element => {
        totalInt += element.precio;
        listaCompra.innerHTML += ``
        total = totalInt;
    })
    );
    getTotal(total);

}
function getTotal(total){
    listaTotal.innerHTML = '';
    listaTotal.innerHTML += ``
    localStorage.setItem("Total",total);
}


    //Btn para añadir a carrito

function buttonCarrito(data,p) {
    let btnAddCarrito = document.getElementById(`${data[p].id}`)
    btnAddCarrito.addEventListener('click',e=>{
        e.preventDefault
        // let idTarget = e.target.dataset.id;
        //console.log(e.target.dataset.id)
        const {id,nombre, cantidad, tallas, precio} = data[p]
        // if (idTarget ==id ) {
            const productoComprado = {
                id: id,
                nombre: nombre,
                cantidad:cantidad,
                tallas:tallas[0],
                precio:precio   
            }
            localStorage.setItem("Producto",JSON.stringify(productoComprado));
            Carrito.push(productoComprado)
            localStorage.setItem('carrito', JSON.stringify(Carrito))
            listarCarrito()
        // }
        })
    
}
    






//Modal del boton BUY IT NOW
