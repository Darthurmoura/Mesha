# Mesha
Teste técnico para o PS da Mesha

# O que é
O teste pedia que fossem desenvolvidos tanto o back-end quanto o front-end de uma aplicação para o registro e subsequente aprovação de novos usuários colaboradores de uma empresa.

# Tecnologias utilizadas
Front-End: React, React-Router-DOM, Chakra-UI
Back-End: Node, Express, Express-Validator, PostgreSQL

# Como rodar
Antes de tudo, é preciso ter um banco no PostgreSQL chamado `mangarosa`. 
Após isso, faça o clone desse repositório. Defina as variáveis de ambiente em um arquivo .env na raíz da pasta `back-end` com as credenciais para o BD criado:
> PGHOST=`endereço onde está rodando o Postgres, geralmente é localhost`
> 
> PGUSER=`nome do owner do BD criado`
>
> PGDATABASE=`mangarosa`
> 
> PGPASSWORD=`password do owner do BD criado`
>
> PGPORT=`porta em que está rodando o Postgres, geralmente é 5432`
  
Terminada essa etapa, pelo terminal, entre na pasta `back-end` e dê o comando `npm install`. Faça o mesmo na pasta `front-end`.
Depois de instaladas as dependências da aplicação, faça `npm run dev` na pasta `back-end` e abra outro terminal para fazer `npm start` na pasta `front-end`.

# Status da aplicação até agora

- [x] API Rest com Node e Express;
- [x] Validação com Express-Validator;
- [x] Estrutura do Front-end com React;
- [x] Consumo da API via Axios;
- [ ] Estilo das páginas e componentes com Chakra-UI;
- [ ] Adicionar Header com logo, ícone e menu;
- [ ] Adicionar mensagens de erro ao Form;
- [ ] Adicionar mensagem de atualização do registro (sucesso/falha);
- [ ] Adicionar estilo nos campos do Form que não estiverem válidos;

