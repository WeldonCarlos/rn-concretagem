# Roupagens da RN: padrão, Natal e Réveillon

O site continua em React + Vite, sem PHP e sem backend. Os textos comerciais, contatos e botões continuam os mesmos. A roupagem acrescenta uma saudação e decorações; `padrao` remove todas as decorações festivas.

## Escolher no .env

Na pasta do projeto, configure uma única linha:

```dotenv
RN_THEME=padrao
```

Valores: `padrao`, `natal` ou `reveillon`. `reveion` também é aceito e convertido para `reveillon`. Não há troca automática por calendário. O tema de Ano Novo felicita 2027.

O `.env.example` contém um modelo sem segredos. O `.env` é privado: nunca envie esse arquivo para GitHub ou para `public_html`.

### Desenvolvimento

Execute `npm run dev`. Altere `RN_THEME` no `.env` e recarregue o navegador, ou aguarde até 30 segundos. O servidor de desenvolvimento relê o arquivo a cada consulta, sem precisar reiniciar.

Para comparar localmente sem alterar a configuração: abra `http://127.0.0.1:5173/?tema=natal` ou `http://127.0.0.1:5173/?tema=reveillon`. Esses links de prévia funcionam apenas no desenvolvimento; em produção todos os visitantes seguem o JSON da hospedagem.

### Primeira publicação na Hostinger

1. Execute `npm ci` e `npm run build`.
2. Envie **o conteúdo** de `dist` para a pasta `public_html` do domínio, incluindo `.htaccess`, `site-theme.json` e a pasta `media`.
3. Verifique as rotas e o vídeo no domínio. Não publique a pasta de código nem o `.env`.

### Trocar depois, sem rebuild e sem reenviar o site

1. Altere o `.env`, por exemplo `RN_THEME=natal`.
2. Execute `npm run theme:sync`. Esse comando atualiza apenas `public/site-theme.json` e, se existir, `dist/site-theme.json`.
3. No Gerenciador de Arquivos do hPanel ou via SFTP, substitua **somente** `public_html/site-theme.json` pelo arquivo gerado.

Essa pequena atualização de configuração é necessária: uma hospedagem estática não executa React no servidor e não lê `.env`. Alterar apenas o `.env` local ou subir um `.env` para a Hostinger não muda o site publicado. Não é preciso recompilar, reenviar os vídeos ou publicar novamente os arquivos de React.

Alternativamente, edite diretamente `public_html/site-theme.json` no hPanel:

```json
{"theme":"natal"}
```

Para voltar ao padrão: `{"theme":"padrao"}`. Para 2027: `{"theme":"reveillon"}`.

O navegador consulta esse arquivo ao abrir o site, ao voltar à aba e a cada 30 segundos enquanto a aba está visível. A requisição não usa cache; o `.htaccess` também orienta o servidor a não armazenar esse arquivo em cache. Se houver CDN/cache adicional na Hostinger, exclua `site-theme.json` do cache. Se uma consulta falhar, o site mantém o último tema válido; uma configuração inválida retorna ao padrão.

## Animações e vídeos

- **Natal:** verde e vermelho, iluminação suave no cabeçalho e nas fotos, neve discreta, Papai Noel pendurado com balanço e banner com vídeo original desejando Feliz Natal.
- **Réveillon:** tons claros, verde sereno, dourado, partículas suaves, composição de 2027 e vídeo original de boas festas.
- Os dois vídeos são locais, silenciosos, têm 10 segundos e possuem imagem de capa. Nenhum serviço externo é carregado.
- O botão “Pausar” no banner pausa as decorações e o vídeo sazonal. O vídeo principal mantém seu próprio controle.
- Preferência de movimento reduzido exibe a saudação estática, sem neve ou balanço. O vídeo sazonal pausa fora da tela ou com a aba oculta.

Os assets prontos ficam em `public/media/`. `scripts/create-seasonal-media.py` é apenas uma ferramenta de criação dos vídeos, não é executado pela hospedagem; requer Python, Pillow e imageio-ffmpeg para regenerar os assets.

## Verificação

```sh
npm test
npm run build
```

Os testes verificam os temas/aliases, troca da configuração sem restart e a exclusão de chaves privadas do JSON público, além dos lembretes existentes do Instagram.
