  let main__button = document.querySelector(".main__button");
  let popup = document.querySelector(".popup");
  let popup__content = document.querySelector(".popup__content");
  let popup__form = document.querySelector(".popup__form");
  let popup__close = document.querySelector(".popup__close");
  let form__button = document.querySelector(".form__button");
  let form__phone = document.querySelector("#form__phone");
  let divCont = document.querySelector(".form__div");
  let divContChange = document.querySelector(".form__div-02");

  let timerId;

  /* открыть pop-up */
  main__button.addEventListener("click", function () {
    popup.style.display = "block";
    setTimeout(timeOutBlock, 500)
  });

  function timeOutBlock() {
    popup.classList.add("open");
    popup__content.classList.add("open");
    console.log("открыл pop-up");
  }

  function timeOutNone() {
    popup.style.display = "none";
  }

  /* закрыть pop-up */
  function popupClose() {
    popup.classList.remove("open");
    popup__content.classList.remove("open");
    divCont.classList.remove("div-hidden");
    divContChange.classList.remove("div-visible");
    divCont.classList.add('div-visible');
    divContChange.classList.add('div-hidden');
    form__phone.classList.remove('_hidden');
    form__button.classList.remove('_hidden');
    form__phone.classList.remove('_correct');
    form__phone.classList.remove('_focus');
    form__phone.classList.remove('_blur');
    popup__form.reset();
    setTimeout(timeOutNone, 500)
        clearTimeout(timerId);
        console.log("закрыл pop-up");
  };

  popup__close.addEventListener("click", function () {
    popupClose();
  });


  /* курсор в поле form__phone  */
  function setCursorPosition(pos, elem) {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();

      range.collapse(true);
      range.moveStart('character', pos);
      range.moveEnd('character', pos);
      range.select();
    }
  };

  /* маска для поля form__phone */
  function createMask(event) {
    let matrix = '+7 (___) ___-__-__',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }
    this.value = matrix.replace(/./g, function (a) {

      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else if (i >= val.length) {
        return '';
      }
      return a;
    });

    if (event.type === 'blur') {
      if (this.value.length == 2) {
        this.value = '';
      } else if (this.value.length < 18) {
        form__phone.classList.add('_blur');
        form__phone.classList.remove('_focus');
        form__phone.classList.remove('_correct');

      }
    } else {

      if (this.value.length < 18) {
        form__phone.classList.add('_focus');
        form__phone.classList.remove('_blur');
        form__phone.classList.remove('_correct');


      } else if (this.value.length == 18) {

        form__phone.classList.add('_correct');
        form__phone.classList.remove('_focus');
        form__phone.classList.remove('_blur');

      }
      setCursorPosition(this.value.length, this);

    };

  }
  form__phone.addEventListener('input', createMask);
  form__phone.addEventListener('focus', createMask);
  form__phone.addEventListener('blur', createMask);

  /* Отправка формы */

  form__button.addEventListener("click", function () {

    let form__phonev = form__phone.value;

    if (form__phonev == "") {
      alert("Не заполнено поле: телефон");
      return false;
    } else if (form__phone.value.length < 18) {
      alert("Телефон записан не полностью");
      return false;
    } else {
      let formData = new FormData()
      formData.append("form__phonev", form__phonev);

      console.log("ответил в pop-up: " + form__phone.value);


      let response = fetch('send_form.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        console.log(response.ok);
        console.log("Запрос отправлен");
        popup__form.reset();
      } else {
        console.log("Запрос не ушел или ушел с ошибками");
        console.log(response);
        popup__form.reset();
      }


      divCont.classList.remove("div-visible");
      divContChange.classList.remove("div-hidden");
      divCont.classList.add('div-hidden');
      divContChange.classList.add('div-visible');
      form__phone.classList.add('_hidden');
      form__button.classList.add('_hidden');

      timerId = setTimeout(popupClose, 5000);

    }


  });


