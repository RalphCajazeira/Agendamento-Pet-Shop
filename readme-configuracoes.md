# 🚀 Guia Completo de Configuração de Projeto Web (baseado nas aulas)

Este guia foi feito para quem está aprendendo a programar e quer configurar um projeto moderno usando **Webpack**, **Babel**, **Day.js** e **JSON Server**. Siga as etapas abaixo na ordem em que foram ensinadas nas aulas.

---

## 🧩 TÓPICO 1 – Criando e configurando o JSON Server (API fake)

### 📦 Instalar o JSON Server

```bash
npm install json-server --save-dev
```

### 📁 Criar o arquivo `db.json`

Este será seu banco de dados fake. Exemplo de conteúdo:

```json
{
  "items": []
}
```

### 🧠 Adicionar script no `package.json`

```json
"scripts": {
  "server": "json-server --watch db.json --port 3333"
}
```

### ▶️ Rodar o servidor fake

```bash
npm run server
```

> A API estará disponível em: `http://localhost:3333/items`

---

## 🧩 TÓPICO 2 – Instalando e configurando o Webpack

### 📦 Instalar Webpack

```bash
npm install webpack webpack-cli --save-dev
```

### 📁 Estrutura de pastas recomendada

```
seu-projeto/
├── dist/
├── src/
│   └── main.js
└── webpack.config.js
```

### 🧠 Criar `webpack.config.js`

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

---

## 🧩 TÓPICO 3 – Configurando o Webpack Dev Server

### 📦 Instalar

```bash
npm install webpack-dev-server --save-dev
```

### 🧠 Adicionar script no `package.json`

```json
"scripts": {
  "dev": "webpack serve"
}
```

### 🔥 Executar o projeto localmente

```bash
npm run dev
```

> A aplicação será aberta automaticamente no navegador: `http://localhost:3000`

---

## 🧩 TÓPICO 4 – Injetando o HTML com HtmlWebpackPlugin

### 📦 Instalar

```bash
npm install html-webpack-plugin --save-dev
```

### 🧠 Importar e configurar no `webpack.config.js`

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "index.html"),
  }),
];
```

> Isso injeta automaticamente o JS gerado no HTML final.

---

## 🧩 TÓPICO 5 – Adicionando o favicon (ícone da aba do navegador)

### 🧠 Atualizar o `HtmlWebpackPlugin` no `webpack.config.js`

```js
new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "index.html"),
  favicon: path.resolve(__dirname, "src", "assets", "favicon.svg"),
});
```

> O favicon será copiado para a build e exibido na aba do navegador.

---

## 🧩 TÓPICO 6 – Importando e carregando arquivos CSS

### 📦 Instalar os loaders

```bash
npm install style-loader css-loader --save-dev
```

### 🧠 Adicionar regra no `webpack.config.js`

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

### 🧠 Importar os arquivos CSS no `main.js`

```js
import "./styles/global.css";
import "./styles/form.css";
import "./styles/schedule.css";
```

### ❌ Remover `<link>` do HTML

Remova qualquer `<link rel="stylesheet" href="...">` do `index.html`. O Webpack fará isso automaticamente.

---

## 🧩 TÓPICO 7 – Copiando arquivos estáticos (imagens, ícones, etc.)

### 📦 Instalar CopyWebpackPlugin

```bash
npm install copy-webpack-plugin --save-dev
```

### 🧠 Importar e configurar no `webpack.config.js`

```js
const CopyWebpackPlugin = require("copy-webpack-plugin");

plugins: [
  new HtmlWebpackPlugin({ ... }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "src", "assets"),
        to: path.resolve(__dirname, "dist", "src", "assets")
      }
    ]
  })
]
```

> Isso garante que a pasta `src/assets` seja copiada para `dist/`.

---

## 🧩 TÓPICO 8 – Configurando Babel para compatibilidade com navegadores

### 📦 Instalar Babel

```bash
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

### 🧠 Adicionar nova regra no `webpack.config.js`

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

> Isso converte seu código moderno em versões que funcionam em navegadores mais antigos.

---

## 🧩 TÓPICO 9 – Trabalhando com datas usando Day.js

### 📦 Instalar

```bash
npm install dayjs
```

### 📁 Criar arquivo `src/libs/dayjs.js`

```js
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");
```

### 🧠 Importar no `main.js`

```js
import "./libs/dayjs.js";
```

Agora você pode usar Day.js em qualquer lugar:

```js
import dayjs from "dayjs";
console.log(dayjs().format("DD/MM/YYYY HH:mm"));
```

---

## 🧠 Scripts finais no `package.json`

```json
"scripts": {
  "server": "json-server --watch db.json --port 3333",
  "dev": "webpack serve",
  "build": "webpack"
}
```

---

## ✅ Pronto! Agora seu projeto está com:

- ✅ Webpack configurado para empacotar JS e CSS
- ✅ Servidor local com recarregamento automático
- ✅ HTML injetado com plugin
- ✅ Favicon incluído automaticamente
- ✅ Babel para compatibilidade de navegadores
- ✅ JSON Server para simular APIs
- ✅ Day.js para trabalhar com datas
- ✅ Estrutura organizada e profissional

---

Com isso, você tem uma base sólida para iniciar **qualquer projeto Web moderno**.

> Mantenha o `npm run dev` rodando para ver as alterações ao vivo enquanto desenvolve. Use `npm run build` para gerar a versão final para produção.

```

```
