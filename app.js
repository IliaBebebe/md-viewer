/**
 * REX MD-Viewer — Core Application Logic
 * High performance, zero-dependency vanilla JS with Marked, KaTeX, Mermaid, Highlight.js
 */

(function () {
  'use strict';

  // --- Sample Documents Library ---
  const SAMPLES = {
    showcase: `# REX MD-Viewer

Премиальный просмотрщик и редактор Markdown с поддержкой GFM, KaTeX-формул, интерактивных диаграмм Mermaid, подсветки синтаксиса и чистого типографического оформления.

> [!NOTE]
> Документы сохраняются автоматически в браузере (LocalStorage). Вы можете просто перетащить сюда любой \`.md\` или \`.txt\` файл, либо вставить скопированный текст.

> [!TIP]
> Нажмите **Alt + 1** для чистого режима чтения без отвлекающих элементов, **Alt + 2** для разделенного экрана и **Alt + O** для быстрого просмотра оглавления.

---

## 1. Блоки внимания (GitHub Admonitions)

Выделите важные мысли с помощью стандартных блоков:

> [!IMPORTANT]
> Все интерактивные чек-листы в режиме предварительного просмотра кликабельны и синхронно обновляют исходный Markdown текст.

> [!WARNING]
> При очистке кэша браузера локальные документы могут быть сброшены. Используйте кнопку **Экспорт → Скачать .md** для резервного сохранения.

> [!CAUTION]
> Никогда не коммитьте production-токены и закрытые ключи шифрования в публичные репозитории.

---

## 2. Математические формулы (KaTeX)

Поддерживаются как встроенные инлайн-формулы, например тождество Эйлера $e^{i\\pi} + 1 = 0$ и нормальное распределение $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, так и выносные многострочные блоки:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

Матрицы и системы уравнений:

$$
\\mathbf{A} = \\begin{pmatrix}
a_{11} & a_{12} & \\cdots & a_{1n} \\\\
a_{21} & a_{22} & \\cdots & a_{2n} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
a_{m1} & a_{m2} & \\cdots & a_{mn}
\\end{pmatrix}, \\quad
f(x) = \\begin{cases}
\\frac{\\sin x}{x}, & x \\neq 0 \\\\
1, & x = 0
\\end{cases}
$$

---

## 3. Интерактивные диаграммы Mermaid

Диаграммы рендерятся прямо из кода и адаптируются под выбранную цветовую тему:

\`\`\`mermaid
flowchart TD
    A[Пользователь] -->|Drag & Drop .md| B(MD-Viewer Core)
    B --> C{Тип контента}
    C -->|Текст & Списки| D[GFM Parser]
    C -->|Формулы| E[KaTeX Engine]
    C -->|Диаграммы| F[Mermaid Renderer]
    D --> G[Красивый HTML]
    E --> G
    F --> G
    G --> H[Режим чтения / Экспорт PDF]
\`\`\`

Диаграмма последовательности:

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor User as Читатель
    participant App as REX MD Viewer
    participant Storage as LocalStorage
    User->>App: Загружает файл (перетаскивание)
    App->>Storage: Автосохранение черновика
    App-->>User: Мгновенный рендер с оглавлением
\`\`\`

---

## 4. Подсветка синтаксиса и копирование кода

Каждый блок кода снабжён меткой языка и кнопкой быстрого копирования:

\`\`\`python
import math
from dataclasses import dataclass

@dataclass
class DocumentStats:
    title: str
    words: int
    char_count: int

    @property
    def estimated_read_time(self) -> float:
        """Расчет времени чтения на основе 200 слов/мин."""
        return math.ceil(self.words / 200)

doc = DocumentStats("REX Guide", 1420, 9200)
print(f"Время чтения: ~{doc.estimated_read_time} мин.")
\`\`\`

Пример скрипта на JavaScript:

\`\`\`javascript
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Скопировано в буфер обмена', 'success');
  } catch (err) {
    console.error('Ошибка копирования:', err);
  }
}
\`\`\`

---

## 5. Таблицы и списки задач

Сравнение характеристик тем оформления:

| Тема | Базовый тон | Акцент | Рекомендуемое назначение |
| :--- | :--- | :--- | :--- |
| **Obsidian Slate** | \`#080b12\` | Sky Cyan | Длительная вечерняя работа |
| **Midnight OLED** | \`#000000\` | Royal Blue | OLED экраны, максимальный контраст |
| **Warm Parchment** | \`#f9f7f1\` | Amber Rust | Чтение лонгридов, книжный комфорт |
| **Nordic Clean** | \`#f8fafc\` | Ocean Blue | Дневное чтение, печать и экспорт |

### Интерактивный трекер готовности

- [x] Автономный запуск без сборщиков на GitHub Pages
- [x] Детектор Drag-and-Drop по всему окну
- [x] Математика KaTeX и диаграммы Mermaid
- [x] Оглавление со скролл-шпионом (IntersectionObserver)
- [x] Экспорт в PDF со специализированным стилем печати
- [ ] Добавить поддержку экспорта в EPUB
`,

    architecture: `# Спецификация: Архитектура REX Event Mesh & Edge Worker

**Статус:** Принято к реализации  
**Версия:** 2.4.0  
**Автор:** REX Engineering Guild  

---

## Резюме проекта

Настоящий документ регламентирует распределение нагрузки между домашним VPS сервером (\`probook-ubuntu-vps\`), пограничными сервисами Cloudflare Edge и потребителями сервисов экосистемы REX Corp.

> [!NOTE]
> Внешний вход организуется через постоянный именованный туннель Cloudflare Tunnel без открытия прямых портов домашнего маршрутизатора в публичную сеть.

\`\`\`mermaid
graph LR
    subgraph Edge ["Cloudflare Global Edge"]
        DNS[Cloudflare DNS] --> WAF[WAF & SSL]
        WAF --> CF_Tunnel[Cloudflare Argo Tunnel]
    end

    subgraph Home_VPS ["Home VPS (192.168.1.106)"]
        CF_Tunnel --> Nginx[Nginx Loopback :443]
        Nginx --> App_1[REX Hub]
        Nginx --> App_2[Status Monitor]
        Nginx --> App_3[PWA Backends]
    end

    subgraph External ["Внешние хранилища"]
        GH[GitHub Pages: md-viewer]
    end

    DNS -.-> GH
\`\`\`

## Ключевые требования к надёжности

1. **Zero-Trust доступ:** Закрытые панели администрирования защищены двухфакторным входом REX ID / Authelia.
2. **Изоляция статики:** Простые утилиты и документация делегируются на распределенные CDN и GitHub Pages.
3. **Резервное копирование:** Ночные снапшоты SQLite баз данных выполняются в изолированные каталоги HDD.
`,

    math: `# Математические основы машинного обучения

Конспект ключевых формул математического анализа, линейной алгебры и теории оптимизации.

---

## 1. Функция потерь и градиентный спуск

В задаче оптимизации минимизируется эмпирический риск:

$$
\\mathcal{L}(\\theta) = \\frac{1}{N} \\sum_{i=1}^N \\ell(f(x_i; \\theta), y_i) + \\frac{\\lambda}{2} \\|\\theta\\|_2^2
$$

Правило обновления весов с учетом момента Нестерова (NAG):

$$
\\begin{aligned}
v_{t+1} &= \\gamma v_t + \\eta \\nabla_\\theta \\mathcal{L}(\\theta_t - \\gamma v_t) \\\\
\\theta_{t+1} &= \\theta_t - v_{t+1}
\\end{aligned}
$$

---

## 2. Собственные значения и SVD-разложение

Для любой прямоугольной матрицы $A \\in \\mathbb{R}^{m \\times n}$ существует сингулярное разложение вида:

$$
A = U \\Sigma V^T = \\sum_{i=1}^{r} \\sigma_i u_i v_i^T
$$

где:
- $U \\in \\mathbb{R}^{m \\times m}$ — ортогональная матрица левых сингулярных векторов;
- $\\Sigma \\in \\mathbb{R}^{m \\times n}$ — диагональная матрица сингулярных чисел $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0$;
- $V \\in \\mathbb{R}^{n \\times n}$ — ортогональная матрица правых сингулярных векторов.
`,

    changelog: `# Журнал изменений и дорожная карта (Roadmap)

## Версия 1.0.0 — Первый публичный релиз

### Добавлено
- [x] Полноэкранный Drag & Drop для файлов \`.md\`, \`.markdown\` и \`.txt\`
- [x] Три режима работы: **Чтение**, **Сплит** и **Исходный код**
- [x] Автоматическое построение иерархического оглавления документа
- [x] Четыре выверенные цветовые темы: Obsidian Slate, Midnight OLED, Warm Parchment, Nordic Clean
- [x] Полноценная поддержка GitHub Admonitions: Note, Tip, Important, Warning, Caution
- [x] Поддержка математических выражений через KaTeX
- [x] Рендеринг блок-схем и диаграмм Mermaid
- [x] Экспорт документов: скачивание .md, автономный HTML, печать в PDF
- [x] Поддержка PWA с Service Worker для работы офлайн

### В планах на следующие версии
- [ ] Поддержка многостраничного экспорта в DOCX
- [ ] Поиск и замена по тексту с регулярными выражениями
- [ ] Подключение сторонних шрифтов из Google Fonts
`
  };

  // --- App State ---
  const state = {
    documents: [],
    activeDocId: null,
    mode: 'reader', // 'reader' | 'split' | 'source'
    theme: 'obsidian',
    font: 'sans',
    readerWidth: '820px',
    isOutlineOpen: true,
    isDraggingSplitter: false
  };

  // --- DOM Elements Cache ---
  const els = {
    tabsContainer: document.getElementById('tabsContainer'),
    btnNewDoc: document.getElementById('btnNewDoc'),
    fileInput: document.getElementById('fileInput'),
    btnOpenFile: document.getElementById('btnOpenFile'),
    btnModeReader: document.getElementById('btnModeReader'),
    btnModeSplit: document.getElementById('btnModeSplit'),
    btnModeSource: document.getElementById('btnModeSource'),
    btnSamplesDropdown: document.getElementById('btnSamplesDropdown'),
    samplesMenu: document.getElementById('samplesMenu'),
    btnExportDropdown: document.getElementById('btnExportDropdown'),
    exportMenu: document.getElementById('exportMenu'),
    btnExportMD: document.getElementById('btnExportMD'),
    btnExportHTML: document.getElementById('btnExportHTML'),
    btnPrintPDF: document.getElementById('btnPrintPDF'),
    btnCopyMD: document.getElementById('btnCopyMD'),
    btnCopyHTML: document.getElementById('btnCopyHTML'),
    btnSettingsDropdown: document.getElementById('btnSettingsDropdown'),
    settingsMenu: document.getElementById('settingsMenu'),
    btnToggleOutline: document.getElementById('btnToggleOutline'),
    btnCloseOutline: document.getElementById('btnCloseOutline'),
    outlineDrawer: document.getElementById('outlineDrawer'),
    tocList: document.getElementById('tocList'),
    statWords: document.getElementById('statWords'),
    statChars: document.getElementById('statChars'),
    statReadTime: document.getElementById('statReadTime'),
    editorPanel: document.getElementById('editorPanel'),
    splitter: document.getElementById('splitter'),
    lineNumbers: document.getElementById('lineNumbers'),
    markdownInput: document.getElementById('markdownInput'),
    previewPanel: document.getElementById('previewPanel'),
    previewContent: document.getElementById('previewContent'),
    dropOverlay: document.getElementById('dropOverlay'),
    shortcutsModal: document.getElementById('shortcutsModal'),
    btnShortcuts: document.getElementById('btnShortcuts'),
    btnCloseShortcuts: document.getElementById('btnCloseShortcuts'),
    toastContainer: document.getElementById('toastContainer'),
    btnFormatBold: document.getElementById('btnFormatBold'),
    btnFormatItalic: document.getElementById('btnFormatItalic'),
    btnFormatCode: document.getElementById('btnFormatCode'),
    btnFormatTable: document.getElementById('btnFormatTable'),
    btnClearEditor: document.getElementById('btnClearEditor')
  };

  // --- Storage & Initialization ---
  function init() {
    loadSettings();
    initMarked();
    initMermaid();
    loadDocuments();
    bindEvents();
    renderTabs();
    applyMode(state.mode);
    renderActiveDocument();
    registerServiceWorker();
  }

  function loadSettings() {
    state.theme = localStorage.getItem('rex_md_theme') || 'obsidian';
    state.font = localStorage.getItem('rex_md_font') || 'sans';
    state.mode = localStorage.getItem('rex_md_mode') || 'reader';
    state.readerWidth = localStorage.getItem('rex_md_width') || '820px';
    state.isOutlineOpen = localStorage.getItem('rex_md_outline') !== 'false';

    applyTheme(state.theme);
    applyFont(state.font);
    applyReaderWidth(state.readerWidth);
    setOutlineVisible(state.isOutlineOpen);
  }

  function loadDocuments() {
    try {
      const raw = localStorage.getItem('rex_md_docs');
      if (raw) {
        state.documents = JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to parse saved documents:', e);
    }

    if (!state.documents || state.documents.length === 0) {
      // First run: preload showcase
      state.documents = [{
        id: 'doc_' + Date.now(),
        title: 'Обзор возможностей',
        content: SAMPLES.showcase,
        updatedAt: Date.now()
      }];
    }

    const savedActiveId = localStorage.getItem('rex_md_active_id');
    const docExists = state.documents.some(d => d.id === savedActiveId);
    state.activeDocId = docExists ? savedActiveId : state.documents[0].id;
  }

  function saveDocuments() {
    localStorage.setItem('rex_md_docs', JSON.stringify(state.documents));
    localStorage.setItem('rex_md_active_id', state.activeDocId);
  }

  function getActiveDoc() {
    return state.documents.find(d => d.id === state.activeDocId) || state.documents[0];
  }

  // --- Marked Configuration ---
  function initMarked() {
    if (typeof marked === 'undefined') return;

    const renderer = new marked.Renderer();

    // Custom code block renderer with language header & copy button
    renderer.code = function ({ text, lang }) {
      const language = (lang || 'text').toLowerCase();
      let highlighted = '';

      if (typeof hljs !== 'undefined' && hljs.getLanguage(language)) {
        try {
          highlighted = hljs.highlight(text, { language }).value;
        } catch (e) {
          highlighted = escapeHtml(text);
        }
      } else {
        highlighted = escapeHtml(text);
      }

      if (language === 'mermaid') {
        return `<div class="mermaid-wrapper"><div class="mermaid">${escapeHtml(text)}</div></div>`;
      }

      return `
        <div class="code-block-wrapper">
          <div class="code-header">
            <span class="code-lang">${escapeHtml(language)}</span>
            <button class="btn-copy-code" type="button" aria-label="Скопировать код">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Копировать</span>
            </button>
          </div>
          <pre><code class="language-${escapeHtml(language)}">${highlighted}</code></pre>
        </div>
      `;
    };

    // Custom heading renderer with anchors and IDs
    renderer.heading = function ({ text, depth }) {
      const slug = text
        .toLowerCase()
        .replace(/<[^>]+>/g, '')
        .replace(/[^\wа-яё\- ]+/gi, '')
        .trim()
        .replace(/\s+/g, '-');

      return `
        <h${depth} id="${slug}">
          <a class="heading-anchor" href="#${slug}" aria-hidden="true" title="Ссылка на этот раздел">#</a>
          ${text}
        </h${depth}>
      `;
    };

    // Custom list item renderer for task lists
    renderer.listitem = function ({ text, task, checked }) {
      if (task) {
        return `
          <li class="task-list-item">
            <input type="checkbox" class="task-checkbox" ${checked ? 'checked' : ''} aria-label="Задача">
            <span>${text}</span>
          </li>
        `;
      }
      return `<li>${text}</li>`;
    };

    marked.setOptions({
      renderer: renderer,
      gfm: true,
      breaks: true,
      pedantic: false
    });
  }

  function initMermaid() {
    if (typeof mermaid === 'undefined') return;
    const isDark = state.theme === 'obsidian' || state.theme === 'midnight';
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'neutral',
      securityLevel: 'loose',
      fontFamily: 'var(--font-sans)',
      logLevel: 5
    });
  }

  // --- Rendering Markdown ---
  let renderDebounceTimer = null;

  function triggerRender() {
    if (renderDebounceTimer) clearTimeout(renderDebounceTimer);
    renderDebounceTimer = setTimeout(() => {
      renderActiveDocument();
    }, 40);
  }

  function renderActiveDocument() {
    const doc = getActiveDoc();
    if (!doc) return;

    // Sync textarea if needed
    if (els.markdownInput.value !== doc.content) {
      els.markdownInput.value = doc.content;
    }

    updateLineNumbers();

    let rawMarkdown = doc.content || '';

    // Transform Markdown with marked
    let parsedHtml = '';
    try {
      parsedHtml = marked.parse(rawMarkdown);
    } catch (err) {
      parsedHtml = `<div class="callout callout-caution"><div class="callout-header">Ошибка синтаксиса</div><div class="callout-content">${escapeHtml(err.message)}</div></div>`;
    }

    // Transform GitHub Admonitions
    parsedHtml = transformCallouts(parsedHtml);

    // Inject into preview
    els.previewContent.innerHTML = parsedHtml;

    // Render KaTeX Math
    renderKaTeXMath();

    // Render Mermaid diagrams
    renderMermaidDiagrams();

    // Bind copy buttons in code blocks
    bindCodeCopyButtons();

    // Bind task list checkbox changes
    bindTaskCheckboxes();

    // Rebuild TOC outline
    buildTOC();

    // Update document statistics
    updateDocumentStats(rawMarkdown);
  }

  // Transform GitHub callouts: > [!NOTE], > [!TIP], etc.
  function transformCallouts(html) {
    const calloutIcons = {
      note: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
      tip: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>`,
      important: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
      warning: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      caution: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    };

    const calloutRegex = /<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*<br>)?\s*([\s\S]*?)<\/p>\s*<\/blockquote>/gi;

    return html.replace(calloutRegex, function (match, type, content) {
      const lowerType = type.toLowerCase();
      const icon = calloutIcons[lowerType] || calloutIcons.note;
      return `
        <div class="callout callout-${lowerType}">
          <div class="callout-header">
            <span class="callout-icon">${icon}</span>
            <span>${type}</span>
          </div>
          <div class="callout-content"><p>${content.trim()}</p></div>
        </div>
      `;
    });
  }

  // KaTeX rendering helper
  function renderKaTeXMath() {
    if (typeof renderMathInElement === 'function') {
      try {
        renderMathInElement(els.previewContent, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('KaTeX render error:', err);
      }
    }
  }

  // Mermaid diagrams rendering
  function renderMermaidDiagrams() {
    if (typeof mermaid === 'undefined') return;
    const mermaidElements = els.previewContent.querySelectorAll('.mermaid');
    if (mermaidElements.length > 0) {
      try {
        mermaid.run({
          nodes: Array.from(mermaidElements)
        });
      } catch (err) {
        console.warn('Mermaid render error:', err);
      }
    }
  }

  // Copy code blocks
  function bindCodeCopyButtons() {
    const buttons = els.previewContent.querySelectorAll('.btn-copy-code');
    buttons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const wrapper = btn.closest('.code-block-wrapper');
        const codeEl = wrapper ? wrapper.querySelector('pre code') : null;
        if (!codeEl) return;
        const textToCopy = codeEl.innerText || codeEl.textContent;

        try {
          await navigator.clipboard.writeText(textToCopy);
          btn.classList.add('copied');
          const span = btn.querySelector('span');
          if (span) span.textContent = 'Скопировано!';
          showToast('Код скопирован в буфер', 'success');
          setTimeout(() => {
            btn.classList.remove('copied');
            if (span) span.textContent = 'Копировать';
          }, 2000);
        } catch (e) {
          showToast('Не удалось скопировать код', 'error');
        }
      });
    });
  }

  // Interactive task checkboxes: clicking a checkbox updates the markdown text!
  function bindTaskCheckboxes() {
    const checkboxes = els.previewContent.querySelectorAll('.task-checkbox');
    checkboxes.forEach((cb, index) => {
      cb.addEventListener('change', () => {
        const doc = getActiveDoc();
        if (!doc) return;

        // Find all task items in source markdown and toggle the i-th one
        let taskIndex = 0;
        const updated = doc.content.replace(/^(\s*[-*+]\s+\[)([ xX])(\]\s+)/gm, (match, prefix, state, suffix) => {
          if (taskIndex === index) {
            taskIndex++;
            return `${prefix}${cb.checked ? 'x' : ' '}${suffix}`;
          }
          taskIndex++;
          return match;
        });

        doc.content = updated;
        doc.updatedAt = Date.now();
        saveDocuments();
        els.markdownInput.value = updated;
        updateLineNumbers();
        updateDocumentStats(updated);
      });
    });
  }

  // --- Table of Contents (TOC) ---
  function buildTOC() {
    const headings = els.previewContent.querySelectorAll('h1, h2, h3, h4');
    els.tocList.innerHTML = '';

    if (headings.length === 0) {
      els.tocList.innerHTML = '<li class="toc-item" style="padding: 8px 10px; color: var(--text-muted); font-size: 12px;">Заголовков не обнаружено</li>';
      return;
    }

    headings.forEach((h, idx) => {
      const level = parseInt(h.tagName.substring(1), 10);
      const title = h.innerText.replace(/^#\s*/, '').trim();
      const id = h.id || `heading-${idx}`;
      h.id = id;

      const li = document.createElement('li');
      li.className = `toc-item level-${level}`;

      const a = document.createElement('a');
      a.className = 'toc-link';
      a.href = `#${id}`;
      a.textContent = title;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update active class
        document.querySelectorAll('.toc-item').forEach(el => el.classList.remove('active'));
        li.classList.add('active');
      });

      li.appendChild(a);
      els.tocList.appendChild(li);
    });

    setupScrollSpy(headings);
  }

  // ScrollSpy with IntersectionObserver
  function setupScrollSpy(headings) {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const activeLink = els.tocList.querySelector(`a[href="#${id}"]`);
            if (activeLink) {
              document.querySelectorAll('.toc-item').forEach(el => el.classList.remove('active'));
              activeLink.closest('.toc-item').classList.add('active');
            }
          }
        });
      },
      {
        root: els.previewPanel,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1
      }
    );

    headings.forEach(h => observer.observe(h));
  }

  // --- Document Statistics ---
  function updateDocumentStats(text) {
    const raw = text || '';
    const charCount = raw.length;
    // Word count calculation
    const wordsMatch = raw.trim().match(/[\wа-яё\-]+/gi);
    const wordCount = wordsMatch ? wordsMatch.length : 0;
    const readTimeMin = Math.max(1, Math.ceil(wordCount / 200));

    els.statWords.textContent = `${wordCount.toLocaleString('ru-RU')} слов`;
    els.statChars.textContent = `${charCount.toLocaleString('ru-RU')} символов`;
    els.statReadTime.textContent = `~${readTimeMin} мин чтения`;
  }

  // --- Line Numbers ---
  function updateLineNumbers() {
    const lines = els.markdownInput.value.split('\n').length;
    let numbersText = '';
    for (let i = 1; i <= lines; i++) {
      numbersText += i + '\n';
    }
    els.lineNumbers.textContent = numbersText;
  }

  // --- Synchronized Scrolling ---
  let isEditorScrolling = false;
  let isPreviewScrolling = false;

  function syncScrollFromEditor() {
    if (state.mode !== 'split' || isPreviewScrolling) return;
    isEditorScrolling = true;
    const editorScrollMax = els.markdownInput.scrollHeight - els.markdownInput.clientHeight;
    if (editorScrollMax > 0) {
      const ratio = els.markdownInput.scrollTop / editorScrollMax;
      const previewScrollMax = els.previewPanel.scrollHeight - els.previewPanel.clientHeight;
      els.previewPanel.scrollTop = ratio * previewScrollMax;
    }
    setTimeout(() => { isEditorScrolling = false; }, 30);
  }

  function syncScrollFromPreview() {
    if (state.mode !== 'split' || isEditorScrolling) return;
    isPreviewScrolling = true;
    const previewScrollMax = els.previewPanel.scrollHeight - els.previewPanel.clientHeight;
    if (previewScrollMax > 0) {
      const ratio = els.previewPanel.scrollTop / previewScrollMax;
      const editorScrollMax = els.markdownInput.scrollHeight - els.markdownInput.clientHeight;
      els.markdownInput.scrollTop = ratio * editorScrollMax;
    }
    setTimeout(() => { isPreviewScrolling = false; }, 30);
  }

  // --- Tabs Management ---
  function renderTabs() {
    els.tabsContainer.innerHTML = '';
    state.documents.forEach((doc) => {
      const tab = document.createElement('div');
      tab.className = `doc-tab ${doc.id === state.activeDocId ? 'active' : ''}`;
      tab.dataset.id = doc.id;

      const titleSpan = document.createElement('span');
      titleSpan.className = 'doc-tab-title';
      titleSpan.textContent = doc.title || 'Безымянный';
      titleSpan.contentEditable = 'false';
      titleSpan.title = 'Двойной клик для переименования';

      // Rename tab on double click
      titleSpan.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        titleSpan.contentEditable = 'true';
        titleSpan.focus();
      });

      titleSpan.addEventListener('blur', () => {
        titleSpan.contentEditable = 'false';
        const newTitle = titleSpan.textContent.trim() || 'Безымянный';
        doc.title = newTitle;
        saveDocuments();
        renderTabs();
      });

      titleSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          titleSpan.blur();
        }
      });

      // Switch tab on click
      tab.addEventListener('click', (e) => {
        if (e.target.closest('.doc-tab-close')) return;
        state.activeDocId = doc.id;
        saveDocuments();
        renderTabs();
        renderActiveDocument();
      });

      // Close tab button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'doc-tab-close';
      closeBtn.title = 'Закрыть документ';
      closeBtn.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDocument(doc.id);
      });

      tab.appendChild(titleSpan);
      if (state.documents.length > 1) {
        tab.appendChild(closeBtn);
      }
      els.tabsContainer.appendChild(tab);
    });
  }

  function createNewDocument(title = 'Новый документ', content = '# Новый документ\n\nНачните вводить текст...') {
    const newDoc = {
      id: 'doc_' + Date.now(),
      title: title,
      content: content,
      updatedAt: Date.now()
    };
    state.documents.push(newDoc);
    state.activeDocId = newDoc.id;
    saveDocuments();
    renderTabs();
    renderActiveDocument();
    showToast(`Создан документ «${title}»`, 'success');
  }

  function closeDocument(docId) {
    if (state.documents.length <= 1) {
      showToast('Нельзя закрыть единственную вкладку', 'error');
      return;
    }
    const idx = state.documents.findIndex(d => d.id === docId);
    state.documents = state.documents.filter(d => d.id !== docId);

    if (state.activeDocId === docId) {
      const nextIdx = Math.max(0, idx - 1);
      state.activeDocId = state.documents[nextIdx].id;
    }
    saveDocuments();
    renderTabs();
    renderActiveDocument();
  }

  // --- Drag & Drop Handler ---
  let dragCounter = 0;

  function setupDragAndDrop() {
    window.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer && e.dataTransfer.types && Array.from(e.dataTransfer.types).includes('Files')) {
        els.dropOverlay.classList.add('active');
      }
    });

    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    window.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        els.dropOverlay.classList.remove('active');
      }
    });

    window.addEventListener('drop', (e) => {
      e.preventDefault();
      dragCounter = 0;
      els.dropOverlay.classList.remove('active');

      const files = e.dataTransfer ? e.dataTransfer.files : null;
      if (files && files.length > 0) {
        handleFiles(files);
      }
    });
  }

  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const cleanName = file.name.replace(/\.[^/.]+$/, '');
        createNewDocument(cleanName, text);
      };
      reader.onerror = () => {
        showToast(`Ошибка чтения файла ${file.name}`, 'error');
      };
      reader.readAsText(file, 'UTF-8');
    });
  }

  // --- Export Functions ---
  function exportAsMarkdown() {
    const doc = getActiveDoc();
    if (!doc) return;
    const blob = new Blob([doc.content], { type: 'text/markdown;charset=utf-8' });
    downloadBlob(blob, `${slugify(doc.title)}.md`);
    showToast('Markdown файл успешно сохранен', 'success');
  }

  function exportAsHtml() {
    const doc = getActiveDoc();
    if (!doc) return;
    const renderedBody = els.previewContent.innerHTML;

    const standaloneHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(doc.title)}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.7;
      color: #1e293b;
      max-width: 820px;
      margin: 40px auto;
      padding: 0 20px;
      background: #ffffff;
    }
    h1, h2, h3 { color: #0f172a; margin-top: 1.6em; }
    h1 { font-size: 2.2em; border-bottom: 1px solid #e2e8f0; padding-bottom: .3em; }
    h2 { font-size: 1.6em; border-bottom: 1px solid #e2e8f0; padding-bottom: .3em; }
    pre { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; }
    blockquote { border-left: 3px solid #0284c7; margin: 1.4em 0; padding: 10px 16px; background: #f0f9ff; }
    table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
    th, td { border: 1px solid #e2e8f0; padding: 8px 12px; }
    th { background: #f8fafc; }
    .heading-anchor, .btn-copy-code { display: none; }
  </style>
</head>
<body>
  ${renderedBody}
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    downloadBlob(blob, `${slugify(doc.title)}.html`);
    showToast('HTML файл успешно экспортирован', 'success');
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function copyMarkdown() {
    const doc = getActiveDoc();
    if (!doc) return;
    try {
      await navigator.clipboard.writeText(doc.content);
      showToast('Markdown скопирован в буфер', 'success');
    } catch (e) {
      showToast('Ошибка при копировании', 'error');
    }
  }

  async function copyHtml() {
    const html = els.previewContent.innerHTML;
    try {
      await navigator.clipboard.writeText(html);
      showToast('Готовый HTML скопирован в буфер', 'success');
    } catch (e) {
      showToast('Ошибка при копировании', 'error');
    }
  }

  // --- UI Modes & Themes ---
  function applyMode(mode) {
    state.mode = mode;
    localStorage.setItem('rex_md_mode', mode);
    document.body.dataset.mode = mode;

    els.btnModeReader.classList.toggle('active', mode === 'reader');
    els.btnModeSplit.classList.toggle('active', mode === 'split');
    els.btnModeSource.classList.toggle('active', mode === 'source');
  }

  function applyTheme(theme) {
    state.theme = theme;
    localStorage.setItem('rex_md_theme', theme);
    document.documentElement.dataset.theme = theme;

    // Update Highlight.js stylesheet
    const hljsThemeLink = document.getElementById('hljs-theme');
    if (hljsThemeLink) {
      const isDark = theme === 'obsidian' || theme === 'midnight';
      hljsThemeLink.href = isDark
        ? 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css'
        : 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css';
    }

    // Reinitialize Mermaid with the matching theme
    initMermaid();
    renderMermaidDiagrams();

    // Update settings menu active state
    document.querySelectorAll('[data-theme-val]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeVal === theme);
    });
  }

  function applyFont(font) {
    state.font = font;
    localStorage.setItem('rex_md_font', font);
    document.documentElement.dataset.font = font;

    document.querySelectorAll('[data-font-val]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.fontVal === font);
    });
  }

  function applyReaderWidth(width) {
    state.readerWidth = width;
    localStorage.setItem('rex_md_width', width);
    document.documentElement.style.setProperty('--reader-max-width', width);

    document.querySelectorAll('[data-width-val]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.widthVal === width);
    });
  }

  function setOutlineVisible(visible) {
    state.isOutlineOpen = visible;
    localStorage.setItem('rex_md_outline', visible);
    els.outlineDrawer.classList.toggle('collapsed', !visible);
  }

  // --- Splitter Drag Logic ---
  function initSplitter() {
    let startX = 0;
    let startEditorWidth = 0;

    function onMouseDown(e) {
      state.isDraggingSplitter = true;
      startX = e.clientX;
      startEditorWidth = els.editorPanel.getBoundingClientRect().width;
      els.splitter.classList.add('dragging');
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
      if (!state.isDraggingSplitter) return;
      const deltaX = e.clientX - startX;
      const totalWidth = els.editorPanel.parentElement.getBoundingClientRect().width;
      const newWidth = Math.max(220, Math.min(totalWidth - 220, startEditorWidth + deltaX));
      const percentage = (newWidth / totalWidth) * 100;
      els.editorPanel.style.flex = `0 0 ${percentage}%`;
    }

    function onMouseUp() {
      state.isDraggingSplitter = false;
      els.splitter.classList.remove('dragging');
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    els.splitter.addEventListener('mousedown', onMouseDown);
  }

  // --- Formatting Helpers for Editor ---
  function insertEditorFormatting(prefix, suffix = '', defaultText = '') {
    const ta = els.markdownInput;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end) || defaultText;
    const replacement = prefix + selected + suffix;

    ta.setRangeText(replacement, start, end, 'select');
    ta.dispatchEvent(new Event('input'));
    ta.focus();
  }

  // --- Event Bindings ---
  function bindEvents() {
    // Live input typing in editor
    els.markdownInput.addEventListener('input', () => {
      const doc = getActiveDoc();
      if (!doc) return;
      doc.content = els.markdownInput.value;
      doc.updatedAt = Date.now();
      saveDocuments();
      updateLineNumbers();
      triggerRender();
    });

    // Tab key support in textarea (inserts 2 spaces)
    els.markdownInput.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const ta = els.markdownInput;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        ta.setRangeText('  ', start, end, 'end');
        ta.dispatchEvent(new Event('input'));
      }
    });

    // Synchronized scrolling
    els.markdownInput.addEventListener('scroll', syncScrollFromEditor);
    els.previewPanel.addEventListener('scroll', syncScrollFromPreview);

    // Splitter
    initSplitter();

    // Mode Buttons
    els.btnModeReader.addEventListener('click', () => applyMode('reader'));
    els.btnModeSplit.addEventListener('click', () => applyMode('split'));
    els.btnModeSource.addEventListener('click', () => applyMode('source'));

    // New Tab
    els.btnNewDoc.addEventListener('click', () => createNewDocument());

    // File Open
    els.btnOpenFile.addEventListener('click', () => els.fileInput.click());
    els.fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
        els.fileInput.value = '';
      }
    });

    // Drag and Drop
    setupDragAndDrop();

    // Samples Dropdown
    els.btnSamplesDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllDropdowns();
      els.samplesMenu.classList.toggle('active');
    });

    document.querySelectorAll('[data-sample]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.sample;
        const titles = {
          showcase: 'Обзор возможностей',
          architecture: 'Спецификация архитектуры',
          math: 'Математика и ML',
          changelog: 'Журнал изменений'
        };
        if (SAMPLES[key]) {
          createNewDocument(titles[key] || 'Образец', SAMPLES[key]);
          closeAllDropdowns();
        }
      });
    });

    // Export Dropdown
    els.btnExportDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllDropdowns();
      els.exportMenu.classList.toggle('active');
    });

    els.btnExportMD.addEventListener('click', () => {
      exportAsMarkdown();
      closeAllDropdowns();
    });

    els.btnExportHTML.addEventListener('click', () => {
      exportAsHtml();
      closeAllDropdowns();
    });

    els.btnPrintPDF.addEventListener('click', () => {
      closeAllDropdowns();
      window.print();
    });

    els.btnCopyMD.addEventListener('click', () => {
      copyMarkdown();
      closeAllDropdowns();
    });

    els.btnCopyHTML.addEventListener('click', () => {
      copyHtml();
      closeAllDropdowns();
    });

    // Settings Dropdown
    els.btnSettingsDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllDropdowns();
      els.settingsMenu.classList.toggle('active');
    });

    document.querySelectorAll('[data-theme-val]').forEach(btn => {
      btn.addEventListener('click', () => applyTheme(btn.dataset.themeVal));
    });

    document.querySelectorAll('[data-font-val]').forEach(btn => {
      btn.addEventListener('click', () => applyFont(btn.dataset.fontVal));
    });

    document.querySelectorAll('[data-width-val]').forEach(btn => {
      btn.addEventListener('click', () => applyReaderWidth(btn.dataset.widthVal));
    });

    // Close dropdowns on outside click
    window.addEventListener('click', closeAllDropdowns);

    // Outline Toggle
    els.btnToggleOutline.addEventListener('click', () => {
      setOutlineVisible(!state.isOutlineOpen);
    });
    els.btnCloseOutline.addEventListener('click', () => {
      setOutlineVisible(false);
    });

    // Shortcuts Modal
    els.btnShortcuts.addEventListener('click', () => {
      els.shortcutsModal.classList.add('active');
    });
    els.btnCloseShortcuts.addEventListener('click', () => {
      els.shortcutsModal.classList.remove('active');
    });
    els.shortcutsModal.addEventListener('click', (e) => {
      if (e.target === els.shortcutsModal) {
        els.shortcutsModal.classList.remove('active');
      }
    });

    // Editor Toolbar Formats
    els.btnFormatBold.addEventListener('click', () => insertEditorFormatting('**', '**', 'жирный текст'));
    els.btnFormatItalic.addEventListener('click', () => insertEditorFormatting('*', '*', 'курсив'));
    els.btnFormatCode.addEventListener('click', () => insertEditorFormatting('`', '`', 'код'));
    els.btnFormatTable.addEventListener('click', () => {
      const tableSample = `\n| Заголовок 1 | Заголовок 2 |\n| :--- | :--- |\n| Ячейка 1 | Ячейка 2 |\n`;
      insertEditorFormatting('', '', tableSample);
    });
    els.btnClearEditor.addEventListener('click', () => {
      if (confirm('Очистить содержимое текущего документа?')) {
        const doc = getActiveDoc();
        if (doc) {
          doc.content = '';
          els.markdownInput.value = '';
          saveDocuments();
          renderActiveDocument();
        }
      }
    });

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Alt+1: Reader
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        applyMode('reader');
      }
      // Alt+2: Split
      if (e.altKey && e.key === '2') {
        e.preventDefault();
        applyMode('split');
      }
      // Alt+3: Source
      if (e.altKey && e.key === '3') {
        e.preventDefault();
        applyMode('source');
      }
      // Alt+O: Toggle Outline
      if (e.altKey && (e.key === 'o' || e.key === 'O' || e.key === 'щ' || e.key === 'Щ')) {
        e.preventDefault();
        setOutlineVisible(!state.isOutlineOpen);
      }
      // Ctrl+O: Open file
      if ((e.ctrlKey || e.metaKey) && (e.key === 'o' || e.key === 'O' || e.key === 'щ' || e.key === 'Щ')) {
        e.preventDefault();
        els.fileInput.click();
      }
      // Ctrl+S: Save/Export Markdown
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'ы' || e.key === 'Ы')) {
        e.preventDefault();
        exportAsMarkdown();
      }
      // Ctrl+P: Print
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P' || e.key === 'з' || e.key === 'З')) {
        e.preventDefault();
        window.print();
      }
      // Escape closes modals & dropdowns
      if (e.key === 'Escape') {
        closeAllDropdowns();
        els.shortcutsModal.classList.remove('active');
      }
      // ?: Open shortcuts
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        els.shortcutsModal.classList.add('active');
      }
    });
  }

  function closeAllDropdowns() {
    els.samplesMenu.classList.remove('active');
    els.exportMenu.classList.remove('active');
    els.settingsMenu.classList.remove('active');
  }

  // --- Toast Notifications ---
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success'
      ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `${icon}<span>${escapeHtml(message)}</span>`;
    els.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 200);
    }, 2500);
  }

  // --- Utility Helpers ---
  function escapeHtml(string) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(string).replace(/[&<>"']/g, function (m) { return map[m]; });
  }

  function slugify(text) {
    return (text || 'document')
      .toLowerCase()
      .replace(/[^\wа-яё\- ]+/gi, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  // Service Worker for Offline / PWA
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch((err) => {
        console.log('SW registration skipped or failed:', err);
      });
    }
  }

  // Run on page load
  window.addEventListener('DOMContentLoaded', init);
})();
