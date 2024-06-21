import  express  from "express";
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js'

const app = express()

const PORT = process.env.PORT || 8080 ;

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views')
app.set('view engine', 'handlebars')

const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))

app.use(express.json());
app.use(express.static('./src/public'))
app.use(express.urlencoded({extended:true}))

app.use('/products',viewsRouter);

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

const socketServer = new Server(server);
socketServer.on('connection',(socketClient) => {
    console.log("Cliente Conectado");
    socketServer.emit('productAdded');

    socketClient.on('addProduct', data =>{
        console.log(`Se agrego el producto con el id ${data}`);
        socketServer.emit('productAdded');
    })
});