import UIkit from 'uikit';

export const showSuccess = (message) => UIkit.notification({
  message,
  status: 'success',
  position: 'bottom-center',
  timeout: 1500
});

export const showError = (message) => UIkit.notification({
  message,
  status: 'warning',
  position: 'bottom-center',
  timeout: 1500
});
