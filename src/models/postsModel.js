import 'dotenv/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Importa a função `conectarAoBanco` do arquivo `dbConfig.js`. Essa função será responsável por estabelecer a conexão com o banco de dados.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Chama a função `conectarAoBanco` e armazena a conexão estabelecida na variável `conexao`. A string de conexão é obtida da variável de ambiente `process.env.STRING_CONEXAO`.

// Função assincrona para buscar todos os posts do BD
export async function getTodosPosts(){
    const db = conexao.db("imersao-instabytes")
    // Obtém o banco de dados com o nome "imersao-instabytes" a partir da conexão estabelecida.
    const colecao = db.collection("posts")
    // Obtém a coleção "posts" dentro do banco de dados.
    return colecao.find().toArray()
     // Executa uma consulta para encontrar todos os documentos na coleção "posts" e retorna os resultados como um array.
    }

    export async function criarPost(novoPost) {
        const db = conexao.db("imersao-instabytes")
        const colecao = db.collection("posts")
        return colecao.insertOne(novoPost)
    }
    export async function atualizarPost(id, novoPost) {
               const db = conexao.db("imersao-instabytes")
        const colecao = db.collection("posts")
        const objID = ObjectId.createFromHexString(id)
        return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
    }
