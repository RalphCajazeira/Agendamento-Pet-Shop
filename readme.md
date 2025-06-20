## 🧩 TÓPICO 1 – Criando e configurando o JSON Server

### ✅ 1.1 – Instalação do JSON Server

Abra o terminal integrado no VS Code usando o menu `View > Terminal` ou atalho do seu sistema.

Execute o comando:

```bash
npm i json-server@0.17.3 --save-dev
```

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
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Ralph",
    when: "2025-06-20T22:00:00.000Z",
  }),
});
```

> O campo `id` será gerado automaticamente com um valor único.

---

### ✅ 1.8 – Boas práticas no terminal do VS Code

- Deixe o terminal com o servidor rodando aberto.
- Clique com o botão direito no terminal e renomeie como `server`.
- Abra outro terminal com `+` e renomeie para `web` (ou `frontend`), para rodar outras tarefas.

---

> ✅ **Conclusão:** agora você tem uma API local funcional com JSON Server, pronta para ser usada com `fetch`, `axios`, ou qualquer client HTTP.

---

## 🧩 TÓPICO 2 – Instalação e Configuração do Webpack

### ✅ 2.1 – Instalar o Webpack e Webpack CLI

Execute no terminal:

```bash
npm install webpack@5.89.0 webpack-cli@5.1.4 --save-dev
```

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
    path: path.resolve(__dirname, "dist"),
  },
};
```

> 📌 **Explicações**:
>
> - `target: "web"` → define que será uma aplicação para navegador.
> - `mode: "development"` → modo de desenvolvimento.
> - `entry` → arquivo principal da aplicação.
> - `output` → onde o Webpack vai gerar o arquivo final, dentro da pasta `dist`.

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

- Usar `src/main.js` como ponto de entrada.
- Gerar um bundle final em `dist/main.js`.
- Trabalhar no modo `development`.

---

## 🧩 TÓPICO 3 – Instalação e Configuração do Webpack Dev Server

### ✅ 3.1 – Instalar o Webpack Dev Server

Execute no terminal:

```bash
npm install webpack-dev-server@4.15.1 --save-dev
```

> Essa ferramenta cria um servidor local que atualiza a aplicação automaticamente ao detectar mudanças.

---

### ✅ 3.2 – Configurar o `webpack.config.js`

No arquivo `webpack.config.js`, logo abaixo da configuração `output`, adicione:

```js
devServer: {
  static: {
    directory: path.join(__dirname, "dist")
  },
  port: 3000,
  open: true,
  liveReload: true
}
```

> 📌 Explicação:
>
> - `static.directory` → indica a pasta onde estão os arquivos a serem servidos.
> - `port` → define a porta do servidor local.
> - `open: true` → abre o navegador automaticamente.
> - `liveReload: true` → recarrega a página ao salvar alterações.

---

### ✅ 3.3 – Adicionar script de desenvolvimento no `package.json`

No bloco `"scripts"` do `package.json`, adicione:

```json
"dev": "webpack serve"
```

Exemplo completo:

```json
"scripts": {
  "server": "json-server --watch server.json --port 3333",
  "build": "webpack",
  "dev": "webpack serve"
}
```

---

### ✅ 3.4 – Rodar o servidor com Webpack Dev Server

Execute:

```bash
npm run dev
```

> Isso abrirá o navegador automaticamente na URL `http://localhost:3000`.

---

### ✅ 3.5 – Resultado Esperado

Como ainda não há arquivos HTML integrados, o navegador mostrará apenas o conteúdo do `main.js`. Na próxima etapa será configurado o HTML para ser injetado automaticamente no build.

---

### ✅ 3.6 – Conclusão

Com o Webpack Dev Server configurado, agora sua aplicação:

- Está servida localmente via `localhost:3000`.
- Atualiza automaticamente ao salvar arquivos.
- Abre o navegador sempre que executada com `npm run dev`.

---

## 🧩 TÓPICO 4 – Configurando HTML com Webpack (HtmlWebpackPlugin)

### ✅ 4.1 – Problema: HTML não incluído na build

Ao rodar `npm run dev`, apenas o `main.js` aparece na pasta `dist`. O HTML não é levado automaticamente para a build, então precisamos configurar isso com um plugin do Webpack.

---

### ✅ 4.2 – Instalar o HtmlWebpackPlugin

Execute no terminal:

```bash
npm install html-webpack-plugin@5.6.0 --save-dev
```

---

### ✅ 4.3 – Importar o plugin no `webpack.config.js`

No topo do `webpack.config.js`, adicione:

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

---

### ✅ 4.4 – Adicionar o plugin na configuração

Abaixo da configuração `devServer`, adicione:

```js
plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "index.html"),
  }),
];
```

> Isso informa ao Webpack para copiar o `index.html` original e inseri-lo na build, junto com os scripts JS.

---

### ✅ 4.5 – Executar o build e verificar a pasta `dist`

Execute:

```bash
npm run build
```

> Agora a pasta `dist/` conterá:
>
> - `main.js` (gerado pelo Webpack)
> - `index.html` (gerado pelo plugin)

Se não aparecer de imediato no VS Code, clique no botão de **reload da aba de arquivos**.

---

### ✅ 4.6 – Executar com Dev Server e visualizar no navegador

Execute:

```bash
npm run dev
```

> Agora o HTML será exibido corretamente no navegador em `http://localhost:3000`, embora ainda sem estilo (o CSS será configurado nas próximas aulas).

---

### ✅ 4.7 – Conclusão

Agora o Webpack está preparado para:

- Injetar o JavaScript no HTML automaticamente.
- Levar o HTML para a pasta `dist`.
- Renderizar corretamente a página via Dev Server.

Ótimo! Com base na transcrição da aula, aqui está o **TÓPICO 5 – Adicionando o Favicon ao HTML gerado pelo Webpack**, já formatado em `.md` e pronto para ser colado no seu arquivo de anotações:

---

## 🧩 TÓPICO 5 – Adicionando o Favicon ao HTML via Webpack

### ✅ 5.1 – Contexto

Na build gerada anteriormente, o favicon (ícone da aba do navegador) **não foi incluído**. Vamos configurar o Webpack para incluir o favicon automaticamente via `html-webpack-plugin`.

---

### ✅ 5.2 – Caminho do favicon

O favicon está localizado em:

```

src/assets/favicon.svg

```

---

### ✅ 5.3 – Editar o `webpack.config.js`

Na configuração do plugin `HtmlWebpackPlugin`, adicione a propriedade `favicon`:

```js
plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "index.html"),
    favicon: path.resolve(__dirname, "src", "assets", "favicon.svg"),
  }),
];
```

---

### ✅ 5.4 – Atualizar a build

Se o Dev Server estiver rodando, você pode **parar e executar o build** para testar:

```bash
npm run build
```

> Verifique na pasta `dist/` se o favicon foi copiado corretamente.

---

### ✅ 5.5 – Rodar novamente com o Dev Server

Depois da build, execute:

```bash
npm run dev
```

> Ao abrir a aplicação em `http://localhost:3000`, o ícone do navegador será exibido corretamente na aba (favicon).

---

### ✅ 5.6 – Conclusão

Agora sua aplicação Webpack:

- Inclui o favicon automaticamente na build.
- Copia o arquivo para `dist/`.
- Exibe corretamente no navegador ao usar o Dev Server.

Na próxima aula, será feita a configuração do carregamento de CSS na aplicação.

```

---

Pronto para seguir com o **TÓPICO 6 – Importando e aplicando CSS no Webpack** assim que você enviar a próxima aula. Deseja manter a mesma organização?
```
