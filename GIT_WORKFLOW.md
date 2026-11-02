# Git & Deployment Workflow: md-viewer

## Сводка проекта

- **Название:** REX MD-Viewer
- **Тип:** Static SPA / PWA
- **Публичный адрес:** https://md-viewer.rexcorp.space/
- **Зеркало:** https://iliabebebe.github.io/md-viewer/
- **Локальный каталог:** `C:\Users\user\Desktop\REX_PROJECTS\md-viewer`
- **VPS Remote (`vps`):** `rex-home-deploy:/srv/git/md-viewer.git` (деплой в `/var/www/md-viewer/public`)
- **GitHub Remote (`origin`):** `https://github.com/IliaBebebe/md-viewer.git`
- **Ветка:** `main`
- **Каталог в REX Hub:** https://hub.rexcorp.space/

## Команды развёртывания

1. Локальная проверка изменений:
   ```bash
   git status
   git diff
   ```

2. Коммит и деплой на домашний VPS (post-receive хук мгновенно обновляет `/var/www/md-viewer/public`):
   ```bash
   git add .
   git commit -m "feat: description of changes"
   git push vps main
   ```

3. Зеркалирование на GitHub:
   ```bash
   git push origin main
   ```

4. Проверка доступности:
   ```bash
   curl -fsS https://md-viewer.rexcorp.space/
   ```
