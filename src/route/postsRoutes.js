import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors"

const corsOptions = {
    origin: "http://localhost:8000", 
    optionsSuccessStatus: 200
}
// Configura o armazenamento de arquivos, definindo o diretório de destino e a forma como os arquivos serão nomeados.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define o diretório de destino para os arquivos. Neste caso, todos os arquivos serão armazenados na pasta 'uploads/'.
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define o nome do arquivo. Neste caso, o arquivo será salvo com o nome original.
        cb(null, file.originalname);
    }
});

// Cria uma instância do multer com a configuração de armazenamento definida.
// O parâmetro `dest: "./uploads"` é opcional no Linux e macOS, pois o `storage` já define o destino.
const upload = multer({ dest: "./uploads" , storage});

// Função que define as rotas da aplicação.
const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))
    // Habilita o middleware `express.json()`, que permite que o Express receba e analise dados no formato JSON enviados em requisições.

    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um novo post
    app.post("/posts", postarNovoPost );
    // Rota para fazer o upload de uma imagem
    app.post("/uploads", upload.single("imagem"), uploadImagem);

    app.put("/uploads/:id",atualizarNovoPost)
};

export default routes;