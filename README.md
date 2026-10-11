# RN Concretagem

Site institucional React + TypeScript + Vite, reformulado a partir da branch `develop` do repositório original.

## TypeScript

Componentes em `.tsx`; lógica, scripts, testes e configurações em `.ts`. O `tsconfig.json` usa modo estrito, sem `allowJs`, e inclui aplicação, scripts e testes. Props, referências HTML, timers, ícones e temas têm tipos explícitos.

```sh
npm run typecheck
npm run lint
npm test
```

O build executa a verificação de tipos antes de gerar os arquivos de produção. Os módulos antigos que não eram utilizados pela aplicação atual foram removidos. As fotos e mídias do acervo foram preservadas.

## Temas sazonais

Três roupagens: `padrao`, `natal` e `reveillon` (Feliz 2027). A seleção usa `RN_THEME` no `.env`. Na hospedagem estática, execute `npm run theme:sync` e envie apenas `site-theme.json` para trocar sem recompilar o React. Consulte [o guia de temas e Hostinger](docs/TEMAS.md).

## Executar

```sh
npm ci
npm run dev -- --host 127.0.0.1
npm run build
npm run preview -- --host 127.0.0.1
```

A página principal apresenta empresa, serviços, fabricação/venda de produtos, registros de obras e contato. Os caminhos anteriores `/empresa`, `/servicos`, `/obras` e `/contato` abrem a seção correspondente; o servidor da hospedagem deve servir index.html como fallback para rotas.

## Conteúdo e identidade

- Logo original: `src/assets/Logo.png`, encontrada na branch develop. Vermelho, branco e cinza da marca, com fundo escuro para legibilidade.
- Fotografias do acervo original, copiadas e otimizadas em `src/assets/optimized`; os originais foram preservados.
- As imagens não comprovam endereço, clientes ou local de execução. Esses dados não foram adicionados.
- Pavers e lajotas: fabricação própria e venda conforme informado pelo usuário. Desenhos em CSS são ilustrativos; modelos, medidas, cores e preços dependem de confirmação da empresa.
- WhatsApp preservado: +55 48 9966-8246 / https://wa.me/554899668246. Confirmação recebida do usuário em 10/10/2026: “SIM”. Nenhum dígito foi acrescentado.
- Instagram: https://www.instagram.com/rn_concretagem/

## Privacidade e acessibilidade

Nenhum analytics, pixel, iframe social ou rastreador opcional é carregado. Aceitar/rejeitar fica em localStorage (`rn-consent-v1`) e pode ser revisto no rodapé. O formulário prepara uma mensagem para o WhatsApp; não há backend nem armazenamento dos dados do formulário. A mensagem só é enviada pelo visitante no WhatsApp.

Menu mobile, foco visível, link para pular ao conteúdo, textos alternativos, modal nativo com Escape e suporte a prefers-reduced-motion.

## Referências pesquisadas

- https://mpterraplenagem.com.br/ — organização institucional por serviços, registros de obras e orçamento; aberta e inspecionada no navegador.
- https://baltt.com.br/ — separação entre infraestrutura e fabricação de produtos.
- https://www.terramedeiros.com.br/produtos — organização de catálogo de pavers por produto; dimensões e alegações dessa empresa não foram copiadas.
- https://terraplein.com/ — apresentação das frentes de infraestrutura e chamadas comerciais.
- https://www.fortepaver.com.br/ — fabricação e instalação de pavimentos; resultado de pesquisa, acesso direto indisponível.

## Revisão

Build de produção concluído. Navegador revisado em desktop (1440 × 900) e mobile (390 × 844); persistência de ambas as escolhas de cookies, menu, links, carregamento de imagens, ausência de overflow e ampliação de foto verificados. O envio da mensagem no WhatsApp não foi executado. Preview é local e depende do servidor iniciado com npm run dev.

Os componentes antigos permanecem no repositório para referência, mas não são importados pela aplicação reformulada. Publicação requer instrução posterior do usuário.

## Atualização tecnológica — 10/10/2026

React e React DOM 19.3.0, Vite 8.3.4 e @vitejs/plugin-react 6.1.2, versões estáveis confirmadas no npm oficial. Versões fixadas para reprodução consistente da instalação. Node exigido: ^20.19.0 ou >=22.12.0; ambiente validado com Node 24.19.0.

Bibliotecas antigas sem uso pela aplicação reformulada foram retiradas do package.json para evitar conflitos de peer dependencies com React 19. Os componentes antigos sem uso foram removidos na migração para TypeScript. Use npm e package-lock.json para instalar a aplicação; o yarn.lock legado foi removido.

Vídeo original localizado no elemento video de https://www.rnterraplanagem.com.br/:
https://www.rnterraplanagem.com.br/assets/del_porto-Cenwf7rY.mp4

Cópia original mantida em work/rn-obra-del-porto-original.mp4 (fora do build). Versão de fundo em public/media/rn-hero.mp4: MP4 H.264, 720 × 1280, 24 fps, sem áudio, faststart. Conteúdo e duração de aproximadamente 60 segundos preservados; recorte visual responsivo com object-fit: cover, pois a fonte é vertical.

HeroBackground mantém imagem de fallback e respeita prefers-reduced-motion. Vídeo automático, mudo e em loop, com pausa/reprodução acessível. Pausa também fora da área visível ou com a aba em segundo plano. Não usa player externo, cookies ou rastreadores. Os textos e botões preexistentes do hero foram comparados com a cópia anterior e são idênticos.

Vídeo final: 7.319.185 bytes (aproximadamente 7,3 MB), redução de cerca de 95% em relação ao original de 159,6 MB. Build de produção e revisão desktop/mobile aprovados; reprodução, pausa, menu, galeria e escolha de cookies verificados no navegador. Nenhum deploy realizado.


## Ajustes de interface — 10/10/2026

- Ícones SVG locais em src/components/ui/Icon.tsx: WhatsApp, avanço, navegação para baixo, pausa/reprodução, Instagram, ampliação e fechamento.
- Header: Sobre nós e botão Fale com a RN com ícone WhatsApp.
- Chamada principal com fonte maior; Conheça nossas soluções como botão claro de navegação interna.
- Fonte variável Manrope servida localmente pelo pacote @fontsource-variable/manrope; hierarquia, entrelinha e espaçamento das seções revisados.
- Vídeo apenas em larguras até 1440 px, respeitando movimento reduzido. Acima de 1440 px o componente não monta o vídeo, mantendo a imagem original.
- Fotos PNG transparentes de referência de produtos em src/assets/products. Não são apresentadas como fotos de fabricação da RN. Fontes: paver https://fortbloc.com.br/produtos/paver-de-concreto (arquivo https://fortbloc.com.br/assets/paver-de-concreto-DnZpnzD4.png); lajota https://www.geoblocos.ind.br/pisos/piso-sextavado (arquivo https://www.geoblocos.ind.br/images/produtos/piso-sextavado/piso-sextavado.png). Ambos os arquivos possuem transparência real, verificada no canal alpha. Substituir por fotografias próprias quando fornecidas pela empresa.

Refinamento: removida a seção de etapas Seu próximo passo é uma conversa e as legendas numéricas das fotos. Pequenos títulos com peso e tamanho maiores e detalhe vermelho. Ícone de WhatsApp substituído pelo SVG da marca do conjunto Simple Icons (https://github.com/simple-icons/simple-icons).


## Ajustes de 11/10/2026

Foto real do card de drenagem em produção: https://www.rnterraplanagem.com.br/assets/obraVala-Dzp5Mvum.webp, salva em src/assets/optimized/drenagem.webp.

Removido Instagram ao lado do telefone. Faixa vermelha centralizada e sem numeração. Composição mobile centralizada e título do hero menor.

FloatingSocial: WhatsApp fixo à direita e Instagram com convite discreto, modal nativo, trator SVG animado, botão de visita, X e Escape. O convite abre automaticamente após breve navegação e respeita o fechamento na sessão; também pode ser aberto pelo botão. Dismissal persistido somente na sessão. Flutuantes ocultos com consentimento pendente, galeria aberta ou campo de formulário em edição. Animações respeitam movimento reduzido. Sem embeds, rastreadores ou requisições externas antes do clique para WhatsApp/Instagram.

A avaliação da prévia com foto está em outputs/VIABILIDADE-PREVIA.md; serviço de IA não foi ativado.

Assinatura Up Studio Digital no rodapé: Criado por, seguida da logo transparente, em escala reduzida. Desktop na faixa inferior e mobile em linha própria centralizada. Asset: src/assets/branding/up-studio-digital.png. Recorte feito com imagegen (modo built-in). Prompt final: remover somente o fundo cinza e espaços internos; preservar proporções, letras, cores e detalhes da logo original; sem brilho, sem redesign, sem novo fundo.


Correção final da assinatura: texto Desenvolvido por; olhos circulares do robô restaurados em branco opaco. Prompt imagegen built-in: preencher somente os dois olhos com branco claro, preservar geometria e restante da logo, manter fundo e demais vazios transparentes.


## Efeito de pavers e convite do Instagram

A seção Sobre nós possui base decorativa de pavers em CSS, com montagem sequencial ao entrar na tela e botão Rever montagem dos pavers. Textos permanecem sobre painéis claros. Animação executa uma vez por visita à página, pode ser repetida pelo botão e respeita movimento reduzido.

Modal do Instagram ampliado para 560 px em desktop, adaptado ao mobile. Abertura automática após 12 segundos com convite ativado por rolagem acima de 450 px, sem campo em edição, consentimento pendente ou outro modal aberto. Aparece uma vez e respeita fechamento na sessão (rn-instagram-invitation-v2). O botão flutuante permite abrir novamente manualmente.


Refinamento dos pavers: a face superior da fotografia src/assets/products/paver.png é projetada em SVG para cada peça, preservando a cor e a textura do concreto. A sequência usa índices individuais com duração e intervalo de 75 ms, sem animações simultâneas. ResizeObserver ajusta a grade ao tamanho da seção, incluindo mobile. Compilação e verificação visual aprovadas.



Transição inferior dos pavers com degradê para #f6f5f2, integrando a seção Serviços sem linha brusca. Encaixe acelerado de 95 ms para 75 ms por peça, mantendo a sequência individual.


Chamadas automáticas do Instagram atualizadas: primeira após 12 segundos de navegação elegível; segunda 30 segundos após fechar a primeira; terceira 60 segundos após fechar a segunda. Limite de três por sessão, com persistência em rn-instagram-reminders-v3. Abrir manualmente não consome uma chamada automática. Visitar o Instagram encerra os lembretes. Testes de temporização em tests/instagram-reminders.test.ts, executados com npm test.


Logo Up Studio Digital agora é link para https://upstudiodigital.com.br/, abre em nova aba e possui reação visual em hover, toque e foco de teclado. Corrigido o contexto dos timers nativos para compatibilidade com o navegador.
