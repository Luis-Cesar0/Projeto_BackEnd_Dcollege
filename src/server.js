const app = require('./app')

const port = 3000

// escutar a porta 3000
app.listen(port,()=>{
    console.log(`Servidor rodando no endereço http://localhost:${port}`)
    
})