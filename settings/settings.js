// Функция для отрисовки таблицы
function renderTable(data, tableBodyId, storageKey) {
  const tableBody = document.getElementById(tableBodyId);
  tableBody.innerHTML = ''; // очищаем таблицу
  data.forEach((item, index) => {
    const tr = document.createElement('tr');

    // Колонка Name
    const tdName = document.createElement('td');
    tdName.textContent = item.name;
    tr.appendChild(tdName);

    // Колонка Title
    const tdTitle = document.createElement('td');
    tdTitle.textContent = item.title;
    tr.appendChild(tdTitle);

    // Колонка действий с кнопкой для удаления
    const tdActions = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';
    delBtn.addEventListener('click', () => {
      data.splice(index, 1);
      saveData(storageKey, data);
      renderTable(data, tableBodyId, storageKey);
    });
    tdActions.appendChild(delBtn);
    tr.appendChild(tdActions);

    tableBody.appendChild(tr);
  });
}

// Функция для сохранения данных в chrome.storage
function saveData(key, data) {
  let obj = {};
  obj[key] = data;
  chrome.storage.local.set(obj, () => {
    console.log('Данные сохранены для', key, data);
  });
}

// Функция для загрузки данных из chrome.storage и отрисовки таблицы
function loadData(key, tableBodyId) {
  let obj = {};
  obj[key] = [];
  chrome.storage.local.get(obj, (result) => {
    renderTable(result[key], tableBodyId, key);
  });
}

// Универсальная функция для инициализации таблицы
function initTable(config) {
  loadData(config.storageKey, config.tableBodyId);

  document.getElementById(config.addBtnId).addEventListener('click', () => {
    const newName = document.getElementById(config.newNameId).value.trim();
    const newTitle = document.getElementById(config.newTitleId).value.trim();
    if (newName && newTitle) {
      let obj = {};
      obj[config.storageKey] = [];
      chrome.storage.local.get(obj, (result) => {
        const data = result[config.storageKey];
        data.push({ name: newName, title: newTitle });
        saveData(config.storageKey, data);
        renderTable(data, config.tableBodyId, config.storageKey);
        // Очищаем поля ввода
        document.getElementById(config.newNameId).value = '';
        document.getElementById(config.newTitleId).value = '';
      });
    }
  });
}

function load() {
  initTable({
    storageKey: 'Hashtags',
    tableBodyId: 'generalTableBody',
    newNameId: 'generalNewName',
    newTitleId: 'generalNewTitle',
    addBtnId: 'generalAddBtn'
  });

  initTable({
    storageKey: 'AnswersRitm',
    tableBodyId: 'ritmTableBody',
    newNameId: 'ritmNewName',
    newTitleId: 'ritmNewTitle',
    addBtnId: 'ritmAddBtn'
  });

  initTable({
    storageKey: 'AnswersINC',
    tableBodyId: 'incTableBody',
    newNameId: 'incNewName',
    newTitleId: 'incNewTitle',
    addBtnId: 'incAddBtn'
  });
  fillMail("mail");
  checkboxHandler("treeEnable","cbk1");
  checkboxHandler("serviceEnable","cbk2");
}

// Инициализация всех таблиц после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  load();
});

function fillMail(key) {
  let obj = {};
  obj[key] = [];
  chrome.storage.local.get(obj, (result) => {
    if (!result.mail.subject || !result.mail.body) return;
    document.getElementById("subject").value = result.mail.subject;
    document.getElementById("body").value = result.mail.body;
  });
  document.getElementById("mail_save").onclick = () => {
    const data = {
      subject: document.getElementById("subject").value,
      body: document.getElementById("body").value
    }
    saveData(key, data);
  }
}

function checkboxHandler(key,id) {
  let obj = {};
  obj[key] = [];
  let elem = document.getElementById(id);
  chrome.storage.local.get(obj, (result) => {
    if (!result) return;
    elem.checked = result[key];
  });
  elem.addEventListener('click', async () => {
    const data =
      document.getElementById(id).checked;
    saveData(key, data);
  })
}

// Обработчик для импорта данных
document.getElementById('importBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('importFile');
  const file = fileInput.files[0];
  if (!file) {
    alert('Пожалуйста, выберите файл для импорта.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;

    // Обработка JSON файла
    if (file.name.endsWith('.json')) {
      try {
        let importedData = JSON.parse(content);
        if (!importedData.Hashtags || !importedData.AnswersRitm || !importedData.AnswersINC) {
          alert('Неверный формат JSON файла. Файл должен содержать ключи: Hashtags, AnswersRitm, AnswersINC.');
          return;
        }
        chrome.storage.local.set({
          Hashtags: importedData.Hashtags,
          AnswersRitm: importedData.AnswersRitm,
          AnswersINC: importedData.AnswersINC
        }, () => {
          // alert('Данные успешно импортированы из JSON файла.');
          load();
        });
      } catch (error) {
        alert('Ошибка при чтении JSON файла: ' + error.message);
      }

      // Обработка JS файла
    } else {
      alert('Неверный тип файла. Выберите файл с расширением .json.');
    }
  };
  reader.readAsText(file);
});

// Обработчик для экспорта данных
document.getElementById('exportBtn').addEventListener('click', () => {
  // Получаем данные из chrome.storage
  chrome.storage.local.get(['Hashtags', 'AnswersRitm', 'AnswersINC'], (result) => {
    const dataToExport = {
      Hashtags: result.Hashtags || [],
      AnswersRitm: result.AnswersRitm || [],
      AnswersINC: result.AnswersINC || []
    };
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    // Создаём временную ссылку для скачивания файла
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data_export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});