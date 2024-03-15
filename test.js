const request = require('supertest');
const app = require('./app'); // Caminho para o arquivo principal da sua aplicação

describe('Testes para as rotas da aplicação', () => {
    // Teste para cadastrar um automóvel
    it('Deve cadastrar um automóvel', async () => {
        const novoAutomovel = {
            placa: 'ABC1234',
            cor: 'Preto',
            marca: 'Fiat'
        };

        // Envia uma requisição POST para a rota de cadastro de automóveis
        const response = await request(app)
            .post('/automoveis')
            .send(novoAutomovel);

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(201);

        // Verifica se a resposta contém os dados do automóvel cadastrado
        expect(response.body).toMatchObject(novoAutomovel);

        // Verifica se o automóvel foi adicionado à lista de automóveis
        const automovelCadastrado = await request(app).get(`/automoveis/${response.body.id}`);
        expect(automovelCadastrado.body).toMatchObject(novoAutomovel);
    });

    // Teste para atualizar um automóvel
    it('Deve atualizar um automóvel', async () => {
        // Suponha que já existe um automóvel cadastrado com o ID 1
        const automovelAtualizado = {
            placa: 'XYZ5678',
            cor: 'Azul',
            marca: 'Ford'
        };

        // Envia uma requisição PUT para a rota de atualização de automóveis
        const response = await request(app)
            .put('/automoveis/1')
            .send(automovelAtualizado);

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(200);

        // Verifica se a resposta contém os dados do automóvel atualizado
        expect(response.body).toMatchObject(automovelAtualizado);
    });

    // Teste para listar motoristas
    it('Deve listar os motoristas cadastrados', async () => {
        // Envia uma requisição GET para a rota de listagem de motoristas
        const response = await request(app)
            .get('/motoristas');

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(200);

        // Verifica se a resposta contém uma lista de motoristas
        expect(response.body).toBeInstanceOf(Array);
    });

    // Teste para cadastrar um motorista
    it('Deve cadastrar um motorista', async () => {
        const novoMotorista = {
            nome: 'João da Silva'
        };

        // Envia uma requisição POST para a rota de cadastro de motoristas
        const response = await request(app)
            .post('/motoristas')
            .send(novoMotorista);

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(201);

        // Verifica se a resposta contém os dados do motorista cadastrado
        expect(response.body).toMatchObject(novoMotorista);
    });

    // Teste para atualizar um motorista
    it('Deve atualizar um motorista', async () => {
        // Suponha que já existe um motorista cadastrado com o ID 1
        const motoristaAtualizado = {
            nome: 'Maria da Silva'
        };

        // Envia uma requisição PUT para a rota de atualização de motoristas
        const response = await request(app)
            .put('/motoristas/1')
            .send(motoristaAtualizado);

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(200);

        // Verifica se a resposta contém os dados do motorista atualizado
        expect(response.body).toMatchObject(motoristaAtualizado);
    });

    // Teste para listar registros de utilização de automóveis
    it('Deve listar os registros de utilização de automóveis', async () => {
        // Envia uma requisição GET para a rota de listagem de registros de utilização
        const response = await request(app)
            .get('/utilizacoes');

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(200);

        // Verifica se a resposta contém uma lista de registros de utilização
        expect(response.body).toBeInstanceOf(Array);
    });

    // Teste para cadastrar um registro de utilização de automóvel
    it('Deve cadastrar um registro de utilização de automóvel', async () => {
        // Suponha que os IDs do automóvel e do motorista já existem
        const novaUtilizacao = {
            automovelId: 1,
            motoristaId: 1,
            dataInicio: new Date().toISOString(),
            motivoUtilizacao: 'Viagem de negócios'
        };

        // Envia uma requisição POST para a rota de cadastro de registros de utilização
        const response = await request(app)
            .post('/utilizacoes')
            .send(novaUtilizacao);

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(201);

        // Verifica se a resposta contém os dados do registro de utilização cadastrado
        expect(response.body).toMatchObject(novaUtilizacao);
    });

    // Teste para finalizar a utilização de um automóvel
    it('Deve finalizar a utilização de um automóvel', async () => {
        // Suponha que o registro de utilização com o ID 1 já existe
        const idUtilizacao = 1;

        // Envia uma requisição PUT para a rota de finalização de utilização de automóvel
        const response = await request(app)
            .put(`/utilizacoes/${idUtilizacao}/finalizar`);

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(200);
    });


    // Teste para deletar um motorista
    it('Deve deletar um motorista', async () => {
        // Suponha que o motorista com o ID 1 já foi cadastrado anteriormente
        const idMotorista = 1;

        // Envia uma requisição DELETE para a rota de exclusão de motoristas
        const response = await request(app)
            .delete(`/motoristas/${idMotorista}`);

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(204);

        // Verifica se o motorista foi removido da lista de motoristas
        const motoristaRemovido = await request(app).get(`/motoristas/${idMotorista}`);
        expect(motoristaRemovido.status).toBe(404);
    });

    // Teste para deletar um automóvel
    it('Deve deletar um automóvel', async () => {
        // Suponha que o automóvel com o ID 1 já foi cadastrado anteriormente
        const idAutomovel = 1;

        // Envia uma requisição DELETE para a rota de exclusão de automóveis
        const response = await request(app)
            .delete(`/automoveis/${idAutomovel}`);

        // Verifica se a resposta da API possui o status esperado
        expect(response.status).toBe(204);

        // Verifica se o automóvel foi removido da lista de automóveis
        const automovelRemovido = await request(app).get(`/automoveis/${idAutomovel}`);
        expect(automovelRemovido.status).toBe(404);
    });
});
