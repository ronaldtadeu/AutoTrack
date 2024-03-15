// Modulos
const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// variaveis de ambiente
let automoveis = [];
let motoristas = [];
let utilizacoes = [];

// Funções auxiliares para encontrar elementos usando o ID
const findAutoById = (id) => automoveis.find(auto => auto.id === id);
const findDriverById = (id) => motoristas.find(motorista => motorista.id === id);

// Carrega Pagina que explica como utilizar no Postman
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

// Rotas para automóveis

// Rota para Inserção de Automovel
app.post('/automoveis', (req, res) => {
    const automovel = req.body;
    automovel.id = automoveis.length + 1;
    automoveis.push(automovel);
    res.status(201).json(automovel);
});

// Rota para Atualizar Automovel pelo ID
app.put('/automoveis/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const autoIdx = automoveis.findIndex(auto => auto.id === id);
    automoveis[autoIdx] = req.body;
    automoveis[autoIdx].id = id;

    if (autoIdx == -1) {
        res.status(404).send('Automóvel não encontrado');
        return;
    }

    res.json(automoveis[autoIdx]);
});

// Rota para Deletar Automovel pelo ID
app.delete('/automoveis/:id', (req, res) => {
    const id = parseInt(req.params.id);
    automoveis = automoveis.filter(auto => auto.id !== id);
    res.sendStatus(204);
});

// Rota para Carregar Automovel pelo ID
app.get('/automoveis/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const automovel = findAutoById(id);

    if (!automovel) {
        res.status(404).send('Automóvel não encontrado');
        return;
    }

    res.json(automovel);
});

// Rota para Carregar Automovel
app.get('/automoveis', (req, res) => {
    let result = automoveis;

    if (req.query.cor) {
        result = result.filter(auto => auto.cor === req.query.cor);
    }
    if (req.query.marca) {
        result = result.filter(auto => auto.marca === req.query.marca);
    }
    res.json(result);
});

// Rotas para motoristas

// Rota para Cadastrar Motorista
app.post('/motoristas', (req, res) => {
    const motorista = req.body;
    motorista.id = motoristas.length + 1;
    motoristas.push(motorista);
    res.status(201).json(motorista);
});

// Rota para Editar Motorista pelo ID
app.put('/motoristas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const motoristaIndex = motoristas.findIndex(motorista => motorista.id === id);
    if (motoristaIndex !== -1) {
        motoristas[motoristaIndex] = req.body;
        motoristas[motoristaIndex].id = id;
        res.json(motoristas[motoristaIndex]);
    } else {
        res.status(404).send('Motorista não encontrado');
    }
});

// Rota para Excluir Motorista pelo ID
app.delete('/motoristas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    motoristas = motoristas.filter(motorista => motorista.id !== id);
    res.sendStatus(204);
});

// Rota para Carregar Motorista pelo ID
app.get('/motoristas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const motorista = findDriverById(id);
    if (motorista) {
        res.json(motorista);
    } else {
        res.status(404).send('Motorista não encontrado');
    }
});

// Rota para Filtrar Motorista pelo NOME
app.get('/motoristas', (req, res) => {
    let result = motoristas;
    if (req.query.nome) {
        result = result.filter(motorista => motorista.nome === req.query.nome);
    }
    res.json(result);
});

// Rotas para utilização de automóveis

// Rota para Cadastrar Utilização
app.post('/utilizacoes', (req, res) => {
    const utilizacao = req.body;
    const automovel = findAutoById(utilizacao.automovelId);
    const motorista = findDriverById(utilizacao.motoristaId);
    if (!automovel || !motorista) {
        res.status(404).send('Automóvel ou motorista não encontrado');
    } else if (automovel.emUso) {
        res.status(400).send('Automóvel já está em uso');
    } else {
        automovel.emUso = true;
        utilizacao.id = utilizacoes.length + 1;
        utilizacoes.push(utilizacao);
        res.status(201).json(utilizacao);
    }
});

// Rota para Finalizar Utilização
app.put('/utilizacoes/:id/finalizar', (req, res) => {
    const id = parseInt(req.params.id);
    const utilizacao = utilizacoes.find(uti => uti.id === id);

    if (!utilizacao) {
        res.status(404).send('Utilização não encontrada');
    } 
    
    const automovel = findAutoById(utilizacao.automovelId);
    automovel.emUso = false;
    utilizacao.dataTermino = new Date();

    console.log(utilizacao);
    res.status(200).json(utilizacao);
    
});

// Rota para Listar Utilização
app.get('/utilizacoes', (req, res) => {
    res.json(utilizacoes);
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servirdor rodando na porta ${PORT}`));

module.exports = app;
