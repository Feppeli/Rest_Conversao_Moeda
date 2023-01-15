# Conversão de moedas

## Tecnologias usadas:

- node.js
- Javascript
- Mysql
- express

E para teste e utilização da API Rest utilizei o Postman

<hr>

OBS: O teste não teve continuidade por a API tem um limite de uso no padrão gratuito

### Instalação

- lembrando que quem for usar deve alterar a apikey da API externa utilizada nesse projeto, cuja a mesma foi indicada por vocês. após conseguir a apikey basta alterar a minha apikey na linha 20 do arquivo 'index.js'

- primeiramente baixar o repositório
- após o Download abrir o repositório com o CLI de sua preferência e instalar as dependências utilizadas no node, use o seguinte código: npm install
- Após toda a instalação da pasta node_modules com as devidas dependências do projeto abra a pasta 'DB' entre no arquivo 'db.js'
e configure o seguinte trexo do código: Linha 4 ( const connection = new Sequelize('conversion', 'root', 'root',{ ). os parâmetros passado ao Sequelize são referentes ao seu DB sendo na seguinte sequência: const sequelize = new Sequelize('database', 'username', 'password', {
- Antes de rodar o projeto crie um DB com o mesmo nome que você colocou no espaço database a cima.
- para rodar o projeto digite no CLI de sua preferência aberto no seu repositório o seguinte código: npm run dev.

<hr>

### Utilização

Para cadastrar siga os seguintes passos:
- Utilizando o metodo POST digite a seguinte url no postman: localhost/4400/conversion/ 'userID' / 'a moeda de origem' / 'o valor' / 'a moeda de destino'

exemplo: localhost:4400/conversion/45/brl/34.6/jpy

- Após digitar a url aperte no botão send e aguarde a resposta do servidor. ele deve retornar algo parecido com isto: 
{
        "id": 1,
        "userId": "2",
        "to": "brl",
        "amount": "15",
        "from": "usd",
        "quote": null,
        "date": "14/01/2023",
        "createdAt": "2023-01-14T20:05:20.000Z",
        "updatedAt": "2023-01-14T20:05:20.000Z"
    }
porém com muito mais informações.

- Para encontrar todas as transações realizadas basta passar a seguinte url no metodo GET dentro do postman: localhost:4400/conversions


OBS: Agradeço pela oportunidade e peço perdão por não ter concluido como o esperado. mas o sistema está funcionando