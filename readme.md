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

Perfeito! Aqui está o **TÓPICO 6 – Configurando carregamento de CSS no Webpack**, formatado em `.md` de forma clara e didática, seguindo exatamente o passo a passo da aula:

---

## 🧩 TÓPICO 6 – Configurando carregamento de CSS no Webpack

### ✅ 6.1 – Instalar os loaders de CSS

Execute no terminal:

```bash
npm install style-loader@3.3.3 css-loader@6.8.1 --save-dev
```

> Esses loaders permitem que o Webpack leia arquivos `.css` e os injete no HTML final.

---

### ✅ 6.2 – Configurar os loaders no `webpack.config.js`

Logo abaixo do bloco de `plugins`, adicione:

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
  ];
}
```

> Isso informa ao Webpack que todos os arquivos `.css` devem ser processados com os dois loaders.

---

### ✅ 6.3 – Importar os arquivos CSS no `main.js`

No arquivo `src/main.js`, adicione:

```js
"use strict";

import "./styles/global.css";
import "./styles/form.css";
import "./styles/schedule.css";
```

> Essas importações substituem o uso de `<link>` no HTML. O Webpack cuidará de injetar os estilos dinamicamente.

---

### ✅ 6.4 – Remover o `<link>` do `index.html`

No arquivo `index.html`, remova a antiga importação de CSS (caso exista):

```html
<!-- Remover esta linha -->
<link rel="stylesheet" href="index.css" />
```

---

### ✅ 6.5 – Executar a build

Rode:

```bash
npm run build
```

Você verá no terminal algo como:

```
[webpack] ./src/styles/global.css
[webpack] ./src/styles/form.css
[webpack] ./src/styles/schedule.css
```

> Isso indica que os estilos foram processados corretamente.

---

### ✅ 6.6 – Rodar com Dev Server e verificar resultado

Execute:

```bash
npm run dev
```

Abra no navegador:

```
http://localhost:3000
```

> O conteúdo agora estará **estilizado corretamente**! As classes CSS foram aplicadas e a aparência da aplicação será visível.

---

### ⚠️ OBS: Ícones não aparecem ainda

A pasta `assets/` (onde estão os ícones SVG) **ainda não está sendo copiada para a pasta `dist`**. Isso será configurado na próxima aula.

---

### ✅ 6.7 – Conclusão

Agora sua aplicação:

- Carrega e aplica estilos CSS corretamente via Webpack.
- Remove a necessidade de `<link>` manual no HTML.
- Injeta os estilos dinamicamente via `JavaScript`.

Perfeito! Aqui está o **TÓPICO 7 – Copiando arquivos estáticos (assets) para a pasta de build com Webpack**, já formatado em Markdown `.md` para continuar sua documentação passo a passo:

---

## 🧩 TÓPICO 7 – Copiando arquivos estáticos (assets) com Webpack

### ✅ 7.1 – Problema: Ícones não estavam sendo carregados

Mesmo após configurar o CSS, os ícones (como SVGs) da pasta `assets/` não apareciam na aplicação porque não estavam sendo copiados para a build final.

---

### ✅ 7.2 – Solução: instalar o plugin `copy-webpack-plugin`

Execute no terminal:

```bash
npm install copy-webpack-plugin@11.0.0 --save-dev
```

---

### ✅ 7.3 – Importar o plugin no `webpack.config.js`

Adicione no topo do arquivo:

```js
const CopyWebpackPlugin = require("copy-webpack-plugin");
```

---

### ✅ 7.4 – Configurar o plugin no bloco `plugins`

Logo após o `HtmlWebpackPlugin`, adicione:

```js
new CopyWebpackPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, "src", "assets"),
      to: path.resolve(__dirname, "dist", "src", "assets"),
    },
  ],
});
```

> 📌 Explicação:
>
> - `from`: caminho da pasta original com os arquivos (SVGs, imagens, etc.).
> - `to`: destino final dentro da pasta `dist/`.

---

### ✅ 7.5 – Rodar a build

Execute:

```bash
npm run build
```

Se a pasta `dist/src/assets/` não aparecer de imediato no VS Code, clique no botão de **recarregar estrutura de arquivos**.

---

### ✅ 7.6 – Rodar o Dev Server e testar

Execute:

```bash
npm run dev
```

Abra:

```
http://localhost:3000
```

> Agora os ícones e imagens devem estar aparecendo corretamente no navegador 🎉

---

### ✅ 7.7 – Conclusão

Com isso:

- Os arquivos estáticos da pasta `assets/` estão incluídos na build final.
- Todos os ícones, imagens e SVGs serão carregados corretamente pela aplicação.

Excelente! Aqui está o **TÓPICO 8 – Adicionando Babel ao Webpack para compatibilidade de navegadores**, já formatado em `.md` e pronto para colar no seu arquivo de anotações:

---

## 🧩 TÓPICO 8 – Adicionando Babel ao Webpack

### ✅ 8.1 – Objetivo

O Babel permite converter código moderno JavaScript para versões compatíveis com navegadores mais antigos.

---

### ✅ 8.2 – Instalar os pacotes necessários

Execute no terminal:

```bash
npm install babel-loader@9.1.3 @babel/core@7.23.7 @babel/preset-env@7.23.7 --save-dev
```

---

### ✅ 8.3 – Verificar instalação

No `package.json`, você verá:

```json
"devDependencies": {
  "babel-loader": "9.1.3",
  "@babel/core": "7.23.7",
  "@babel/preset-env": "7.23.7"
}
```

---

### ✅ 8.4 – Configurar o Babel no `webpack.config.js`

No bloco `module.rules`, abaixo da regra de CSS, adicione:

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"]
    }
  }
}
```

> 📌 Explicação:
>
> - `test: /\.js$/`: aplica a regra a arquivos `.js`.
> - `exclude`: ignora a pasta `node_modules`.
> - `loader`: usa o `babel-loader`.
> - `presets`: define que o Babel deve usar o preset `@babel/preset-env`.

---

### ✅ 8.5 – Erros comuns (exemplo prático da aula)

Se houver erro como:

```
Cannot find package '@babel/presets-env'
```

Verifique se escreveu `presets` com "s". O correto é:

```js
presets: ["@babel/preset-env"];
```

> A ocorrência desse erro mostra que o Webpack passou pela regra do Babel, mas não encontrou o pacote corretamente.

---

### ✅ 8.6 – Testar a configuração

Execute:

```bash
npm run build
```

Se tudo estiver correto, a build será concluída com sucesso.

---

### ✅ 8.7 – Rodar o projeto normalmente

Abra dois terminais:

- No primeiro:

```bash
npm run server
```

- No segundo:

```bash
npm run dev
```

> Agora a aplicação Web e a API JSON Server estarão rodando ao mesmo tempo, sem conflitos de porta.

---

### ✅ 8.8 – Conclusão

Agora seu projeto está configurado para:

- Usar Babel e garantir compatibilidade de JavaScript com navegadores antigos.
- Continuar funcionando perfeitamente com as builds via Webpack.

Perfeito! Aqui está o **TÓPICO 9 – Instalação e configuração do Day.js**, totalmente formatado em Markdown `.md`, seguindo o padrão dos tópicos anteriores:

---

## 🧩 TÓPICO 9 – Instalação e configuração do Day.js

### ✅ 9.1 – Objetivo

O Day.js será utilizado para manipular e formatar **datas e horas** com uma sintaxe moderna e leve. Também será configurado para usar o idioma **Português do Brasil (pt-br)** por padrão.

---

### ✅ 9.2 – Instalar o Day.js

Execute no terminal:

```bash
npm install dayjs@1.11.10
```

> O Day.js é uma dependência de produção, pois será usado tanto no desenvolvimento quanto na aplicação final.

---

### ✅ 9.3 – Criar pasta para bibliotecas (`libs`)

Na pasta `src/`, crie a estrutura:

```
src/
├── libs/
│   └── dayjs.js
```

---

### ✅ 9.4 – Configurar o arquivo `src/libs/dayjs.js`

Adicione o seguinte conteúdo:

```js
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

// Define o idioma padrão como português do Brasil
dayjs.locale("pt-br");
```

> Isso garante que toda vez que `dayjs` for usado no projeto, ele já estará configurado para o padrão brasileiro.

---

### ✅ 9.5 – Importar a configuração no `main.js`

No topo do arquivo `src/main.js`, adicione:

```js
"use strict";

// Configuração global do Day.js
import "./libs/dayjs.js";
```

---

### ✅ 9.6 – Teste rápido de funcionamento (opcional)

Você pode testar adicionando temporariamente:

```js
import dayjs from "dayjs";

console.log(dayjs().format("HH:mm"));
console.log(dayjs().format("DD/MM/YYYY"));
```

> Ao abrir o navegador e inspecionar o console, deve aparecer a hora atual e a data formatada em pt-BR.

---

### ✅ 9.7 – Conclusão

Com o Day.js configurado:

- Todas as manipulações de data e hora já virão formatadas para o idioma português do Brasil.
- Você pode usar `dayjs().format(...)` em qualquer parte da aplicação.
- A configuração está centralizada e pronta para reaproveitamento.

Na próxima etapa, será iniciada a implementação das funcionalidades reais da aplicação (agendamento, formulários, etc.).

```

---

Pronto para seguir com o **TÓPICO 10** quando você enviar a próxima transcrição. Deseja que eu monte também um **sumário final dos tópicos** ao concluir todos os módulos?
```
