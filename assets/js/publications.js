// Selected / All tabs for the publication list (no jQuery needed).
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.publications ul.tab-nav li .button');
  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', function () {
      var target = this.getAttribute('data-ref');
      Array.prototype.forEach.call(buttons, function (b) { b.classList.remove('active'); });
      Array.prototype.forEach.call(document.querySelectorAll('.publications .tab-content .tab-pane'), function (pane) {
        pane.classList.remove('active');
      });
      this.classList.add('active');
      var pane = document.querySelector(target);
      if (pane) pane.classList.add('active');
    });
  });
});
