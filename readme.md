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

```