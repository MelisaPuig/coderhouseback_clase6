class contenedor {
    constructor(nombre, apellido) {
      this.title = title;
      this.price = price;
      this.thumbnail = thumbnail;
    }
      
    async function readFile() {   
        try {
            const contenedor= await fs.promises.readFile(`./productos.txt`,`utf-8`);
        
            const productoData= JSON.parse(contenedor).contenedorObj;
        const producto={
         title: productoData.title,
         price: productoData.price,
        thumbnail: prodcutoData.thumbnail,
        main:infoData.main,
         }
        await fs.promises.writeFile(`./productos.txt`, JSON.stringify(producto));
         console.log(producto);
         producto.contenedor[] =`CoderHouse`;
         console.log(info);
        }catch (error){
            console.log(error); 
        }
        }
        
        readFile();