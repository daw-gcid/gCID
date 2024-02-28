# Projeto Next.js + Nest.js

Este é um projeto que utiliza Next.js para o frontend e Nest.js para o backend. 

## Frameworks utilizados

- Frontend: [Next.js](https://nextjs.org/)

- Backend: [Nest.js](https://nestjs.com/)

## Configuração e Execução

Para executar o projeto, siga estas etapas:

1. Certifique-se de ter o Docker Engine instalado em sua máquina.

2. Clone este repositório para sua máquina local:

    ```bash
    git clone https://github.com/daw-gcid/gCID.git
    ```

3. Navegue até o diretório do projeto:

    ```bash
    cd gCID
    ```

4. Execute o comando a seguir para construir as imagens Docker:

    ```bash
    docker-compose build
    ```

5. Após a conclusão da construção, inicie os contêineres com o seguinte comando:

    ```bash
    docker-compose up -d
    ```

Isso iniciará os contêineres do frontend, backend e banco de dados em segundo plano.

Agora, você pode acessar o frontend em [http://localhost:80](http://localhost:80).

## Comandos Úteis do Docker Compose

- Parar os contêineres em execução:

    ```bash
    docker-compose down
    ```

- Visualizar logs dos contêineres em tempo real:

    ```bash
    docker-compose logs -f
    ```

