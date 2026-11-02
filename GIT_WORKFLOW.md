# Git & Deployment Workflow: md-viewer

## Сводка проекта

- **Название:** REX MD-Viewer
- **Тип:** Static SPA / GitHub Pages PWA
- **Публичный адрес:** https://iliabebebe.github.io/md-viewer/
- **Локальный каталог:** `C:\Users\user\Desktop\REX_PROJECTS\md-viewer`
- **GitHub Remote (`origin`):** `https://github.com/IliaBebebe/md-viewer.git`
- **VPS Remote (`vps`):** `rex-home-deploy:/srv/git/md-viewer.git`
- **Ветка:** `main`
- **Каталог в REX Hub:** https://hub.rexcorp.space/

## Команды развёртывания

1. Локальная проверка изменений:
   ```bash
   git status
   git diff
   ```

2. Коммит и отправка в GitHub (деплой на GitHub Pages происходит автоматически):
   ```bash
   git add .
   git commit -m "feat: description of changes"
   git push origin main
   ```

3. Зеркалирование на домашний VPS:
   ```bash
   git push vps main
   ```

4. Проверка доступности:
   ```bash
   curl -fsS https://iliabebebe.github.io/md-viewer/
   ```
