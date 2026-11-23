const projects = {
  quiet: {
    title: 'Тихий свет',
    kind: 'Квартира · 96 м²',
    description: 'Открытая дневная зона с тёплым дубом и известняком. Из гостиной видна кухня, а системы хранения собраны в одной стене, чтобы освободить проходы и сохранить естественный свет.',
  },
  sreda: {
    title: 'Среда',
    kind: 'Винный бар · 124 м²',
    description: 'Интерьер строится вокруг длинной барной стойки. У окна — низкие столы для небольших компаний, в глубине — места для камерных встреч. Светильники подсвечивают столы и оставляют зал в мягкой полутьме.',
  },
  shore: {
    title: 'Линия берега',
    kind: 'Загородный дом · 210 м²',
    description: 'Главные комнаты ориентированы на воду. Камень, матовое дерево и льняной текстиль связывают дом с пейзажем, а глубокие откосы смягчают яркий свет в середине дня.',
  },
};

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
for (const button of filters) {
  button.addEventListener('click', () => {
    for (const filter of filters) {
      filter.setAttribute('aria-pressed', String(filter === button));
    }
    for (const card of cards) {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    }
  });
}

const projectDialog = document.getElementById('project-dialog');
const projectImage = projectDialog.querySelector('.dialog-image');
for (const button of document.querySelectorAll('[data-project]')) {
  button.addEventListener('click', () => {
    const key = button.dataset.project;
    const project = projects[key];
    projectImage.className = 'project-image dialog-image ' + key;
    document.getElementById('project-name').textContent = project.title;
    document.getElementById('project-kind').textContent = project.kind;
    document.getElementById('project-description').textContent = project.description;
    projectDialog.showModal();
  });
}

const briefDialog = document.getElementById('brief-dialog');
const briefForm = document.getElementById('brief-form');
document.getElementById('open-brief').addEventListener('click', () => briefDialog.showModal());

for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
}

briefForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(briefForm);
  const brief = [
    'Бриф для дизайн-проекта',
    '',
    'Тип помещения: ' + data.get('space'),
    'Площадь: ' + data.get('area') + ' м²',
    'Желаемые сроки: ' + (data.get('timing').trim() || 'уточнить'),
    '',
    'Задача',
    data.get('notes').trim(),
  ].join('\n');

  const url = URL.createObjectURL(new Blob(['\uFEFF', brief], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'forma-brief.txt';
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById('brief-status').textContent = 'Бриф готов. Файл можно отправить дизайнеру.';
});
