import app from "./express";
import config from "../config/config";
import template from "../client/template";
import userRouter from "./routers/user.routes";
import authRouter from './routers/auth.routes'


// Register the API endpoints
app.use('/',userRouter);
app.use('/',authRouter);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({'error': err.name+" : "+err.message});
    } else if (err) {
        res.status(400).json({'error': err.name+" : "+ err.message});
        console.log(err);
    }
})

// set to render the base template
app.get('/', (req, res) => {
    res.status(200).send(template());
});

// listen the for port and start the server
app.listen(config.port,()=>{
    console.log(`Server running on port ${config.port} `)
})