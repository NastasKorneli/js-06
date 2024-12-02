const Toast = (opts = {}) => {
  if (typeof opts === 'string') {
    opts = {
      text: opts,
    };
  }
  const {
    text = '',
    type = 'info',
    show: showIt = false,
    hide: hideIt = false,
  } = opts;
  // === DOM & VARS =======
  const DOM = {};
  DOM.toast = document.querySelector('#toast');
  if (!DOM.toast) return;

  DOM.message = DOM.toast.querySelector('.toast-message');
  const bsToast = bootstrap.Toast.getOrCreateInstance(DOM.toast);

  // === INIT =============
  const init = () => {
    switch (type) {
      case 'success':
        DOM.toast.dataset.type = 'success';
        break;
      case 'error':
        DOM.toast.dataset.type = 'error';
        break;
      default:
        DOM.toast.dataset.type = 'info';
    }

    DOM.message.innerHTML = text;

    if (showIt) {
      show();
    }
    if (hideIt) {
      hide();
    }
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const show = () => {
    if (bsToast) {
      bsToast.show();
    }
  };

  const hide = () => {
    if (bsToast) {
      bsToast.hide();
    }
  };

  init();

  return {
    show,
    hide,
  };
};

export default Toast;
