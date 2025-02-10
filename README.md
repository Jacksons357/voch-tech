<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

## Processo Seletivo VOCH TECH

### Tecnologias Utilizadas

- PHP
- Laravel
- Docker
- MySQL
- React
- Tailwind CSS

### Como Rodar o Projeto

Certifique-se de ter as seguintes dependências instaladas em sua máquina:

- Docker
- Node.js
- VSCode
- Extensão DevDB ou MySQL Workbench
- Git
- Composer
- PHP

**Docker Compose**: Geralmente já incluído no Docker Desktop.  
**Git (opcional)**: Para clonar o repositório do projeto.

### Passos para Instalação

1. **Clonar o Repositório**

   Clone o repositório com o seguinte comando:

   ```bash
   git clone https://github.com/Jacksons357/voch-tech
   ```

2. **Configurar o `.env`**

   No arquivo `.env`, defina as variáveis conforme abaixo:

   ```bash
   APP_NAME=VochTech
   APP_URL=http://localhost
   DB_DATABASE=voch_tech
   DB_USERNAME=admin
   DB_PASSWORD=admin
   ```

3. **Instale Laravel Sail e suas dependencias:**

   Use o comando abaixo para instalar:

   ```bash
   composer require laravel/sail --dev
   ```

4. **Inicializar os Contêineres com Laravel Sail**

   Use o comando abaixo para inicializar os contêineres:

   ```bash
   ./vendor/bin/sail up -d
   ```

5. **Gerar a Key da Aplicação**

   Gere a chave da aplicação com o comando:

   ```bash
   ./vendor/bin/sail artisan key:generate
   ```

6. **Rodar as Migrations**

   Aplique as migrations com o comando:

   ```bash
   ./vendor/bin/sail artisan migrate
   ```

7. **Instalar as Dependências do Node**

   Instale as dependências do Node com o comando:

   ```bash
   npm install
   ```

8. **Rodar o Projeto**

   Execute o seguinte comando para iniciar o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

### Pronto!

Seu ambiente de desenvolvimento está configurado e o projeto está pronto para uso.
