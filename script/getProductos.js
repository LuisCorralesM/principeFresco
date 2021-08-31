export {getProductos} 

const getProductos = async ()=>{
    try {
        const res = await fetch('https://http://localhost:3000/')
        const data = await res.json()
        pintarCards(data)
    } catch (error) {
        console.log(error);
    }
}

const pintarCards = (data)=>{
    const templatedCard = document.querySelector('.templated-card').content
    const fragment = document.createDocumentFragment()
    const cardMujeres = document.querySelector('#cardMujeres')
    const cardHombres = document.querySelector('#cardHombres')

            if(cardMujeres){
                data.forEach(foto => {
                    if(foto.albumId == 1){
                        // console.log('seccion mujeres');
                        // console.log(foto.albumId)
    
                        const {url, title, id} = foto
                        templatedCard.querySelector('#btn-carrito').dataset.id = id
                        templatedCard.querySelector('img').setAttribute('src', url)
                        templatedCard.querySelector('h5').textContent = title
                        templatedCard.querySelector('p').textContent = `${(Math.round(Math.random()*150000))}`
                        const clone = templatedCard.cloneNode(true)
                        fragment.append(clone)       
                    }
                });
                cardMujeres.append(fragment)
            } 

            if(cardHombres){
                data.forEach(foto => {
                    if(foto.albumId == 2){
                        // console.log('seccion hombres');
                        // console.log(foto.albumId)
    
                        const {url, title, id} = foto
                        templatedCard.querySelector('#btn-carrito').dataset.id = id
                        templatedCard.querySelector('img').setAttribute('src', url)
                        templatedCard.querySelector('h5').textContent = title
                        templatedCard.querySelector('p').textContent = `${(Math.round(Math.random()*150000))}`
                        const clone = templatedCard.cloneNode(true)
                        fragment.append(clone)       
                    }
                });
                cardHombres.append(fragment)
            } 
}
