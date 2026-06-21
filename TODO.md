# TODO - Transformar em app mobile (PWA) com ícone e abertura por comandos

- [ ] Gerar ícones locais a partir do rosto do Jarvis (SVG do `#face` em `index.html`).

- [ ] Atualizar `manifest.json` (ajustes PWA) sem mexer nos ícones locais ainda.


- [ ] Melhorar `sw.js` com caching básico (offline-friendly) para assets do app.

- [ ] Atualizar `index.html`:
  - [ ] Criar mapeamento de comandos -> ações (web + deep link/intent quando Android).
  - [ ] Implementar tentativa de deep link/intent com fallback para URL web.
  - [ ] Manter/expandir comandos atuais (trocar fundo, horas, etc.).
- [ ] Validar em Android:
  - [ ] Instalar na tela inicial.
  - [ ] Testar 2-3 comandos de abertura.

