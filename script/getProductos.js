export {getProductos} 

const getProductos = async ()=>{
    try {
        const res = await fetch('http://localhost:3000/productos')
        const data = await res.json()
        pintarProductos(data)
    } catch (error) {
        console.log(error);
    }
}

const pintarProductos = (data)=>{
    // imagenes vista pequeña
    const 
    img1Pequeña = document.querySelector('.img1 img'),
    img2Pequeña = document.querySelector('.img2 img'),
    img3Pequeña = document.querySelector('.img3 img'),
    img4Pequeña = document.querySelector('.img4 img');

    img1Pequeña.setAttribute('src', data[0].imagenes[0])
    img2Pequeña.setAttribute('src', data[0].imagenes[1])
    img3Pequeña.setAttribute('src', data[0].imagenes[2])
    img4Pequeña.setAttribute('src', data[0].imagenes[3])

    // imagen vista grande e info producto
    const 
    divImgGrande = document.querySelector('.gird-item-grande img'),
    nombreProducto = document.querySelector('.nombre-producto h1'),
    precioProducto = document.querySelector('.precio p'),
    listaTallas = document.querySelectorAll('.lista-tallas li');
    
    divImgGrande.setAttribute('src', data[0].imagenes[0])

    nombreProducto.textContent = data[0].nombre
    precioProducto.textContent = data[0].precio
    
    listaTallas.forEach((li, index) => {
        li.textContent = data[0].tallas[index]
    })

    // Todos los productos
    const 
    // imgProducto1 = document.querySelector('.imgPro1 img'),
    // imgroducto2 = document.querySelector('.imgPro2 img'),
    // imgroducto3 = document.querySelector('.imgPro3 img'),
    rowProductos = document.querySelector('.grid-row-productos')

    for(let i=1; i<4; i++){
       rowProductos.innerHTML += `
       <div class="grid-column-producto">
            <div class="imagen-producto imgPro${i}">
                <img src="${data[i].imagenes[0]}" alt="">
            </div>
            <div class="descripcion-producto">
                <p class="nombre-producto">${data[i].nombre}</p>
                <p class="precio-producto">${data[i].precio}</p>
            </div>
       </div>
       `
    }
}

