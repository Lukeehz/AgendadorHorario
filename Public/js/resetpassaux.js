window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const errorMsg = params.get('error');
  const successMsg = params.get('success');

  if (errorMsg) {
    alert(decodeURIComponent(errorMsg));
  } else if (successMsg) {
    alert(decodeURIComponent(successMsg));
  }
});