export {pintarProductos, modificar, addCarrito} 

    // imagenes vista pequeña

const 
img1Pequeña = document.querySelector('.img1 img'),
img2Pequeña = document.querySelector('.img2 img'),
img3Pequeña = document.querySelector('.img3 img'),
img4Pequeña = document.querySelector('.img4 img');

// imagen vista grande e info producto
const 
divImgGrande = document.querySelector('.gird-item-grande img'),
nombreProducto = document.querySelector('.nombre-producto h1'),
precioProducto = document.querySelector('.precio p'),
listaTallas = document.querySelectorAll('.lista-tallas li'),
btns = document.querySelector('.botones')

// Todos los productos
const 
rowProductos = document.querySelector('.grid-row-productos')

// contenedor cards
const 
cardProducto = document.querySelector('.grid-column-producto')

const pintarProductos = (data)=>{
    img1Pequeña.setAttribute('src', data[0].imagenes[0])
    img2Pequeña.setAttribute('src', data[0].imagenes[1])
    img3Pequeña.setAttribute('src', data[0].imagenes[2])
    img4Pequeña.setAttribute('src', data[0].imagenes[3])

    divImgGrande.setAttribute('src', data[0].imagenes[0])

    nombreProducto.textContent = data[0].nombre
    precioProducto.textContent = data[0].precio
    
    listaTallas.forEach((li, index) => {
        li.textContent = data[0].tallas[index]
    })

    btns.innerHTML = `
    <button class="btn1" data-id="${data[0].id}">ADD TO CART</button>
    <button class="btn2" data-id="${data[0].id}">BUY  IT NOW</button>
    `
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

const modificar = (data,p)=>{
    img1Pequeña.setAttribute('src', data[p].imagenes[0])
    img2Pequeña.setAttribute('src', data[p].imagenes[1])
    img3Pequeña.setAttribute('src', data[p].imagenes[2])
    img4Pequeña.setAttribute('src', data[p].imagenes[3])

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
}   

let carrito = {}

const items = document.querySelector('#items')
const footer = document.querySelector('#footer')
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content
const fragment = document.createDocumentFragment()

const addCarrito = (data,id)=>{
    const producto = {
        id: data[id].id,
        titulo: data[id].nombre,
        precio: data[id].precio,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    // console.log(producto);
    // console.log(carrito);
    pintarCarrito()
}

const pintarCarrito = ()=>{
    // console.log(carrito);
    items.innerHTML = ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.titulo
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id 
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.append(clone)
    })
    items.append(fragment)

    const btnSumaResta = document.querySelectorAll('.btn-sm')
    btnSumaResta.forEach(btn =>{
        btn.addEventListener('click', e => {
            document.addEventListener('click',e=>{
                if(e.target.matches('.sumar')){
                    btnSumar(e)
                }
                if(e.target.matches('.restar')){
                    btnRestar(e)
                }
            })
            
        })
    })

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}


const 
btnSumar = (e)=>{
    const producto = carrito[e.target.dataset.id]
    producto.cantidad++
    let idModificar = e.target.dataset.id   
    
    pintarCarrito()
},
btnRestar = (e)=>{
    const producto = carrito[e.target.dataset.id]
    producto.cantidad--
    if(producto.cantidad === 0){
        delete carrito[e.target.dataset.id]
    }
    pintarCarrito()
}

const pintarFooter = ()=>{
    footer.innerHTML= ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        // iconoCarrito.textContent = ''
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad, precio}) => acc + (cantidad * 
    precio),0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio
    // Pasar la cantidad al icono carrito del nav
    // iconoCarrito.textContent = nCantidad

    const clone = templateFooter.cloneNode(true)
    fragment.append(clone)
    footer.append(fragment)

    const btnVaciar = document.querySelector('#vaciar-carrito')
    btnVaciar.addEventListener('click', ()=>{
        carrito = {}
        pintarCarrito()
    })

    const btnPagar = document.querySelector('#finalizar-compra')
    btnPagar.addEventListener('click', e =>{
        open('pagar.html')        
    })


}




