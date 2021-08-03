// Создание DOM элемента
function $crt (tag, classNames, attributes) {
  let tEl = document.createElement(tag);
  if (classNames) {
    tEl.classList.add(...classNames);
  }
  if (attributes) {
		for (const attribute in attributes) {
			tEl[attribute] = attributes[attribute];
		}
	}

  return tEl
}

// Поиск элемента в DOM
function $ (tagID) {
  let tEl = document.querySelectorAll(tagID);
  if (tEl.length === 1) tEl = document.querySelector(tagID);
  
  return tEl
}

// Создание структуры окна
function buildModal () {
  const popUp = $crt('div', ['shmodal__popup']);
  const container = $crt('div', ['shmodal__container']);
  const content = $crt('div', ['shmodal__content']);

  const title = $crt('p', ['shmodal__title'], {
    'textContent' : 'This site was create by Anatoly Lushkin',
  });
  const info = $crt('p', ['shmodal__info'], {
    'innerHTML'   : 'Tel.: +79608705840 <br> email: hommyst@gmail.com <br> <span class="small-text">&#169 hommy</span>'
  });

  const waveImg = $crt('img',['wavingHand'], {'src': 'https://image.flaticon.com/icons/png/512/1/1427.png'});

  const cssStyle = $crt('link', [], {
    'rel': 'stylesheet',
    'href': 'http://b96087jw.beget.tech/sModal.css'
  });
  document.head.append(cssStyle);

  content.append(title, info, waveImg);
  container.append(content);
  popUp.append(container);

  // Закрытие popup'a по нажатию в пустую область
  popUp.addEventListener('click', function (ev) {
    if (ev.target === this) {
      this.style.display = 'none';
      $('.shmodal__popup').remove();
      document.body.style.overflow = 'auto';
    }
  });
  
  document.body.style.overflow = 'hidden';
  document.body.append(popUp);
}

// Слушаем ввод пароля
let isSHModalePass = '';
window.addEventListener('keydown', isCode);
function listenPassword (ev) {
  const pass = 'hommy';
  isSHModalePass += ev.key;
    
  if (ev.key === 'Cancel' && ev.ctrlKey) {
    isSHModalePass = '';
    window.removeEventListener('keydown', listenPassword);
    window.addEventListener('keydown', isCode);
  }  

  if (pass === isSHModalePass) {
    buildModal();
    isSHModalePass = '';
    window.removeEventListener('keydown', listenPassword);
    window.addEventListener('keydown', isCode);
  }
}

function isCode (ev) {
  if (ev.key === 'Cancel' && ev.ctrlKey) {
    window.removeEventListener('keydown', isCode);
    window.addEventListener('keydown', listenPassword);
  }
}
