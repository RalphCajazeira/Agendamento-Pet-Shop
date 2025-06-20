## 🧩 TÓPICO 1 – Criando e configurando o JSON Server

### ✅ 1.1 – Instalação do JSON Server

Abra o terminal integrado no VS Code usando o menu `View > Terminal` ou atalho do seu sistema.

Execute o comando:

```bash
npm i json-server@0.17.3 --save-dev
````

> A versão `0.17.3` é usada na aula para evitar problemas com atualizações futuras.

---

### ✅ 1.2 – Criar o `.gitignore`

Crie um arquivo chamado `.gitignore` na raiz do projeto e adicione:

```
node_modules
```

> Isso evita enviar a pasta `node_modules` para o GitHub. Ela pode ser recriada com `npm install`.

---

### ✅ 1.3 – Criar o arquivo `server.json`

Crie um arquivo chamado `server.json` na raiz do projeto com o conteúdo:

```json
{
  "schedules": []
}
```

> Esse será seu banco de dados local, com a rota `http://localhost:3333/schedules`.

---

### ✅ 1.4 – Adicionar o script no `package.json`

Abra o arquivo `package.json` e adicione em `"scripts"`:

```json
"scripts": {
  "server": "json-server --watch server.json --port 3333"
}
```

---

### ✅ 1.5 – Executar o servidor

Rode o comando:

```bash
npm run server
```

> Se ocorrer erro de "muitos arquivos abertos", reinicie o VS Code e execute novamente.

---

### ✅ 1.6 – Acessar a API no navegador

Abra:

```
http://localhost:3333/schedules
```

Inicialmente, irá exibir:

```json
[]
```

Você pode editar o `server.json` e adicionar manualmente:

```json
{
  "schedules": [
    {
      "id": 7,
      "name": "Teste",
      "when": "2025-06-21T10:00:00.000Z"
    }
  ]
}
```

> Salve o arquivo e atualize a página para ver o conteúdo modificado.

---

### ✅ 1.7 – Exemplo de requisição POST com `fetch`

```js
fetch("http://localhost:3333/schedules", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Ralph",
    when: "2025-06-20T22:00:00.000Z"
  })
});
```

> O campo `id` será gerado automaticamente com um valor único.

---

### ✅ 1.8 – Boas práticas no terminal do VS Code

* Deixe o terminal com o servidor rodando aberto.
* Clique com o botão direito no terminal e renomeie como `server`.
* Abra outro terminal com `+` e renomeie para `web` (ou `frontend`), para rodar outras tarefas.

---

> ✅ **Conclusão:** agora você tem uma API local funcional com JSON Server, pronta para ser usada com `fetch`, `axios`, ou qualquer client HTTP.


---

## 🧩 TÓPICO 2 – Instalação e Configuração do Webpack

### ✅ 2.1 – Instalar o Webpack e Webpack CLI

Execute no terminal:

```bash
npm install webpack@5.89.0 webpack-cli@5.1.4 --save-dev
````

> Use as mesmas versões da aula para evitar problemas com atualizações futuras.

---

### ✅ 2.2 – Adicionar script de build no `package.json`

No arquivo `package.json`, adicione:

```json
"scripts": {
  "server": "json-server --watch server.json --port 3333",
  "build": "webpack"
}
```

---

### ✅ 2.3 – Criar o entry point da aplicação

Na pasta `src/`, crie o arquivo:

```text
src/main.js
```

Esse será o **ponto de entrada** da aplicação (entry point).

---

### ✅ 2.4 – Criar o arquivo de configuração `webpack.config.js`

Na raiz do projeto (fora da pasta `src`), crie o arquivo:

```text
webpack.config.js
```

Com o conteúdo:

```js
const path = require("path");

module.exports = {
  target: "web",
  mode: "development",
  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

> 📌 **Explicações**:
>
> * `target: "web"` → define que será uma aplicação para navegador.
> * `mode: "development"` → modo de desenvolvimento.
> * `entry` → arquivo principal da aplicação.
> * `output` → onde o Webpack vai gerar o arquivo final, dentro da pasta `dist`.

---

### ✅ 2.5 – Gerar a build com Webpack

Execute o comando:

```bash
npm run build
```

> Isso criará a pasta `dist/` com o arquivo `main.js` (por enquanto vazio).

---

### ✅ 2.6 – Dica: recarregar estrutura de arquivos no VS Code

Se a pasta `dist/` não aparecer de imediato, clique no ícone de **reload da aba de arquivos** no VS Code para atualizar a visualização da estrutura do projeto.

---

### ✅ 2.7 – Conclusão

Agora o Webpack está instalado e configurado para:

* Usar `src/main.js` como ponto de entrada.
* Gerar um bundle final em `dist/main.js`.
* Trabalhar no modo `development`.

Na próxima etapa, você poderá adicionar funcionalidades ao `main.js`, importar CSS, HTML, etc., e configurar novos loaders no `webpack.config.js`.

```