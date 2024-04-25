require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || "https://backendnovo3.onrender.com";

const app = express();

// Middleware CORS configurado para permitir solicitações do seu front end
app.use(cors({
  origin: 'https://front-end-omega-weld.vercel.app',
  credentials: true
}));

// Configuração para permitir solicitações JSON e de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Diretório de uploads estáticos
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Conexão com o banco de dados
require("./config/db.js");

// Rotas
const router = require("./routes/Router.js");
app.use(router);

// Adicionando um middleware para definir cabeçalhos CORS na resposta
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://front-end-omega-weld.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
