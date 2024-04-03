const {deepEqual, ok} = require('assert')
const database = require('./database')

const DEFAULT_CARRO_CADASTRADO_1 ={
    marca: 'Toyota',
    modelo: 'Supra Mk IV',
    velocidade: '270 km/h',
    motor: '2JZ-GTE',
    id: 1
}

const DEFAULT_CARRO_CADASTRADO_2 ={
    marca: 'Nissan',
    modelo: 'Skyline',
    velocidade: '260 km/h',
    motor: 'RB26DETT',
    id: 2
}

const DEFAULT_CARRO_CADASTRADO_3 ={
    marca: 'Mazda',
    modelo: 'RX-7',
    velocidade: '255 km/h',
    motor: '13B-REW',
    id: 3
}

const DEFAULT_CARRO_ATUALIZADO_1 ={
    marca: 'Toyota',
    modelo: 'AE86',
    velocidade: '201 km/h',
    motor: '4A-GE',
    id: 4
}

const DEFAULT_CARRO_ATUALIZADO_2 ={
    marca: 'Honda',
    modelo: 'Civic EK9',
    velocidade: '225 km/h',
    motor: 'B16B',
    id: 5
}


describe('Manipulação de veículos no JSON', () =>{
    before(async()=>{
        await database.remover()
        await database.cadastrar(DEFAULT_CARRO_CADASTRADO_1)
        await database.cadastrar(DEFAULT_CARRO_CADASTRADO_2)
        await database.cadastrar(DEFAULT_CARRO_CADASTRADO_3)
        await database.cadastrar(DEFAULT_CARRO_ATUALIZADO_1)
        await database.cadastrar(DEFAULT_CARRO_ATUALIZADO_2)
    })

   it('Realizar pesquisa de veículos no arquivo', async()=>{
        console.log('')
        console.log('Listar todos veículos do arquivo')
        const search1 = DEFAULT_CARRO_CADASTRADO_1
        const [result1] = await database.listar(search1.id)
        deepEqual(result1,search1)
        console.log('')
        console.log('Primeiro veículo: ', DEFAULT_CARRO_CADASTRADO_1)
        console.log('')
        console.log('Segundo veículo: ', DEFAULT_CARRO_CADASTRADO_2)
        console.log('')
        console.log('Terceiro veículo: ', DEFAULT_CARRO_CADASTRADO_3)
        console.log('')
        console.log('Quarto veículo: ', DEFAULT_CARRO_ATUALIZADO_1)
        console.log('')
        console.log('Quinto veículo: ', DEFAULT_CARRO_ATUALIZADO_2)
    })

    it('Deve cadastrar veículos no arquivo', async()=>{
        console.log('')
        console.log('Cadastro de três veículos')
        console.log('')
        const register1 = DEFAULT_CARRO_CADASTRADO_1
        await database.cadastrar(DEFAULT_CARRO_CADASTRADO_1)
        const [result1] = await database.listar(register1.id)
        deepEqual(result1,register1)
        console.log('Veículo 01 cadastrado:', DEFAULT_CARRO_CADASTRADO_1)
        
        console.log('')
       
        const register2 = DEFAULT_CARRO_CADASTRADO_2
        await database.cadastrar(DEFAULT_CARRO_CADASTRADO_2)
        const [result2] = await database.listar(register2.id)
        deepEqual(result2, register2)
        console.log('Veículo 02 cadastrado:', DEFAULT_CARRO_CADASTRADO_2)

        console.log('')

        const register3 = DEFAULT_CARRO_CADASTRADO_3
        await database.cadastrar(DEFAULT_CARRO_CADASTRADO_3)
        const [result3] = await database.listar(register3.id)
        deepEqual(result3, register3)
        console.log('Veículo 03 cadastrado:', DEFAULT_CARRO_CADASTRADO_3)
    })

    it.only('Deve atualizar dois veículos pelo id', async()=>{
        console.log('')
        console.log('Atualizar dois veículos')
        const update1 ={
            ...DEFAULT_CARRO_ATUALIZADO_1,
            marca: 'Mitsubishi',
            modelo: 'Lancer Evolution IX',
            velocidade: '255 km/h',
            motor: '4G63'
        }

        const novoDado ={
            ...DEFAULT_CARRO_ATUALIZADO_1,
            marca: 'Mitsubishi',
            modelo: 'Lancer Evolution IX',
            velocidade: '255 km/h',
            motor: '4G63'
        }

        const update2 ={
            ...DEFAULT_CARRO_ATUALIZADO_2,
            marca: 'Subaru',
            modelo: 'Impreza WRX STI',
            velocidade: '255 km/h', 
            motor: 'EJ25'     
        }

        const novoDado2 ={
            ...DEFAULT_CARRO_ATUALIZADO_2,
            marca: 'Subaru',
            modelo: 'Impreza WRX STI',
            velocidade: '255 km/h',
            motor:'EJ25' 
        }

        await database.atualizar(DEFAULT_CARRO_ATUALIZADO_1.id, novoDado)
        await database.atualizar(DEFAULT_CARRO_ATUALIZADO_2.id, novoDado2)

        const [result6] = await database.listar(DEFAULT_CARRO_ATUALIZADO_1.id)
        deepEqual(result6, update1)
        console.log('Primeiro veículo atualizado: ',DEFAULT_CARRO_ATUALIZADO_1)
        console.log('')


        const [result7] = await database.listar(DEFAULT_CARRO_ATUALIZADO_2.id)
        deepEqual(result7, update2)
        console.log('Segundo veículo atualizado: ',DEFAULT_CARRO_ATUALIZADO_2)

    })

    it('Deve remover os veículos do arquivo pelo id', async()=>{
        console.log('')
        console.log('Remoção de todos veículos no JSON')
        const remove = true
        const result8 = await database.remover(DEFAULT_CARRO_CADASTRADO_1.id)
        deepEqual(result8, remove)
     
        const result9 = await database.remover(DEFAULT_CARRO_CADASTRADO_2.id)
        deepEqual(result9, remove)
        const result10 = await database.remover(DEFAULT_CARRO_CADASTRADO_3.id)
        deepEqual(result10, remove)
       
        const result11 = await database.remover(DEFAULT_CARRO_ATUALIZADO_1.id)
        deepEqual(result11,remove)
       
        const result12 = await database.remover(DEFAULT_CARRO_ATUALIZADO_2.id)
        deepEqual(result12, remove)
    })
})