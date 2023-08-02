import express from 'express'
import apiRoutes from './routes/app.routers.js'

const PORT = 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api', apiRoutes);

//Listen
app.listen(PORT, () => {
    console.log("Listening on PORT => ", PORT);
});




