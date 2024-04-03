const {readFile, writeFile}= require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)



class Database{
    constructor(){
        this.NOME_ARQUIVO = 'carros.json'
    }

    async obterArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO,'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(carro){
        const dados = await this.obterArquivo()
        const id = carro.id <= 2 ? carro.id : Date.now()
        const carroComId ={
            id,
            ...carro
        }
       
        const dadosFinal=[
            ...dados,
            carroComId
        ]

        const resultado = await this.escreverArquivo(dadosFinal)

        return resultado

    }

    async listar(id){
        const dados = await this.obterArquivo()
        const dadosFiltrados = dados.filter(item => (id ? item.id === id : true))
        return dadosFiltrados
    }

    async remover(id){
        if(!id){
            return await this.escreverArquivo([])
        }

        const dados = await this.obterArquivo()
        const indice = dados.findIndex(item=> item.id === parseInt(id))

        if(indice === -1){
            throw Error('O veículo não foi encontrado')
        }

        dados.splice(indice, 1)

        return await this.escreverArquivo(dados)
    }

    async atualizar(id, modificacao){

        const dados = await this.obterArquivo()
        const indice = await dados.findIndex(item=> item.id === parseInt(id)) 
        if(indice === -1){
            throw Error('O veículo não foi encontrado')
        }

        const atual = dados[indice]

        const objetoAtualiza ={
            ...atual,
            ...modificacao
        }

        dados.splice(indice, 1)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualiza
        ])
    }
}

module.exports = new Database()