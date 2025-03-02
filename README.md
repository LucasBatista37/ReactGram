# ReactGram

Um projeto de rede social simplificada inspirada no Instagram.
Nesta aplicação, é possível **fazer cadastro e login**, **criar postagens**, **curtir, excluir e editar postagens** e **pesquisar**.

---

## :camera_flash: Demonstração

![ReactGram Preview](../main/frontend/src/assets/reactgram.png)

---

## :sparkles: Recursos

-   **Cadastro e Login** de usuários (com JWT).
-   **Upload de Imagens** (com Multer).
-   **Criação, Edição e Exclusão de postagens**.
-   **Pesquisa posts**.

---

## :wrench: Tecnologias Utilizadas

-   **Front-end**:

    -   React

-   **Back-end**:

    -   Node.js (Express)
    -   MongoDB
    -   JWT (para autenticação)
    -   
-   **Outras bibliotecas** (opcional):

    -   Multer (para upload de arquivos)
    -   bcrypt (para hash de senhas)
    -   dotenv (para variáveis de ambiente)

---

## :inbox_tray: Instalação e Execução


### 1. Clonar o repositório

```bash
git clone https://github.com/LucasBatista37/ReactGram.git
cd reactgram
```

### 2. Estrutura de Pastas

```
reactgram/
│── backend/
│    ├── package.json
│    ├── .env
│    └── ...
│
├── frontend/
│    ├── package.json
│    └── ...
└── README.md
```

### 3. Configurar Variáveis de Ambiente 1. 

Na pasta `backend`, crie um arquivo chamado `.env` no mesmo nível de `package.json`. 2. Copie o conteúdo de `.env.example` e substitua pelos valores reais. Exemplo:

```bash
   PORT=5000
   DB_USER=SEU_USUARIO 
   DB_PASSWORD=SUA_SENHA
   JWT_SECRET=SUA_CHAVE_SECRETA
```

### 4. Instalar Dependências

#### 4.1. Backend

```bash
cd backend
npm install
```

ou

```bash
yarn
```

#### 4.2. Front-end

```bash
cd ../frontend
npm install
```

ou

```bash
yarn
```

### 5. Executar o Projeto

#### 5.1. Backend

Volte à pasta do back-end:

```bash
cd ../backend
npm run server
```

ou

```bash
yarn dev
```

#### 5.2. Front-end

Abra outro terminal ou outra aba:

```bash
cd ../frontend
npm run dev
```

ou

```bash
yarn start
```

Agora, você deve ter o **back-end** rodando em `http://localhost:5000` e o **front-end** em `http://localhost:5173`.


## :wave: Contato

Em caso de dúvidas ou sugestões:

-   **E-mail**: [lucas.batista9734@gmail.com](mailto:lucas.batista9734@gmail.com)
-   **LinkedIn**: [linkedin.com/in/lucas-batista-004212263](https://www.linkedin.com/in/lucas-batista-004212263/)
-   **GitHub**: [github.com/LucasBatista37](https://github.com/LucasBatista37)