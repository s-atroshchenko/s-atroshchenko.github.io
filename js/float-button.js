// Строка ввода внизу экрана (только на телефоне, внешний вид задаёт CSS).
// Строка скрыта, пока на экране виден любой элемент с атрибутом data-hide-float:
// первый экран и блок с кнопками связи. Без библиотек.
(function () {
  var btn = document.querySelector('.composer');
  if (!btn) return;

  var zones = document.querySelectorAll('[data-hide-float]');
  if (!zones.length || !('IntersectionObserver' in window)) {
    btn.classList.add('is-visible');
    return;
  }

  var onScreen = new Set();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        onScreen.add(entry.target);
      } else {
        onScreen.delete(entry.target);
      }
    });
    btn.classList.toggle('is-visible', onScreen.size === 0);
  });

  zones.forEach(function (zone) {
    observer.observe(zone);
  });
})();
