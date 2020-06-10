// Lógica da aplicação de controle de despesas pessoais do curso Desenvolvimento Web Completo 2020


//Definição das lógicas da página "index.html"

class Despesa {
    //Definição do objeto Despesa
    constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
    }

    
    validarDados() {
    //Função para validação dos dados submetidos no formulário
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
    
}


//Definição da lógica do banco de dados

class BD {
    //Definição do objeto Banco de dados

    constructor () {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar (d) {
        //localStorage.setItem('despesa', JSON.stringify(d))
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        
        //array para armazenar as despesas
        let despesas = Array ()

        let id = localStorage.getItem('id') //Buscando o valor do último id cadastrado

        //recuperar todas as despesas cadastradas
        for(let i = 1; i <= id; i++) {

            let despesa = JSON.parse(localStorage.getItem(i))
            

            //verificando os ids para não adicionar valor vazio no array;
            if(despesa === null){
                continue
            }

            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {

        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        if (despesa.ano != ""){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        if (despesa.mes != ""){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if (despesa.dia != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        if (despesa.tipo != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        if (despesa.descricao != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if (despesa.valor != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}


let bd = new BD()

function cadastrarDespesa () {
    //Definição da função que recupera os valores inseridos na index.html
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //Instanciando uma nova Despesa
    let despesa = new Despesa (
        ano.value,
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )
    

    //Validação dos dados submetidos
    if(despesa.validarDados()) {
        //Armazenando os dados no Local Storage
        bd.gravar(despesa)

        //Editando o Modal Status de Gravação
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_status').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Cadastrado com sucesso'
        document.getElementById('modal_btn').className = 'btn btn-success'


        $('#modalGravacao').modal('show')
        
        //Limpando os campos do formulário após a gravação dos dados
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {

        //Editando o Modal Status de Gravação
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_status').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação. Verifique o preenchimento dos campos.'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        
        $('#modalGravacao').modal('show')
        console.log('Dados inválidos')
    }
}


//Definição das lógicas da página "consulta.html"

function carregaListaDespesas(despesas = Array(), filtro = false) {
    

    //despesas = bd.recuperarTodosRegistros()
    
    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }
    //Inserindo dados na tabela listaDespesas
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = '' //limpando o conteúdo na tabela

    despesas.forEach(function(d) { //percorrendo o array para buscar o valores do BD
        let linha = listaDespesas.insertRow() //Inserindo linhas na tabela

        //criando as colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 
        
        //ajustando o tipo
        switch(parseInt(d.tipo)){
            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Saúde'
                break
            case 5: d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //criando botão de exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = 'id_despesa_' + d.id
        btn.onclick = function() {
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

function pesquisarDespesa() {
    //função para realizar pesquisa das despesas
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    //instanciando um novo objeto para as despesas
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    //recuperando bd e aplicando metódo pesquisar
    let despesas = bd.pesquisar(despesa)


    this.carregaListaDespesas(despesas, true)
    
}
