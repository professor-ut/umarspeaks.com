/* Newsletter signup: sends forms with class "kit-signup" to Kit (form 10205107)
   and shows a thank-you message in place. If the request can't be sent from
   the page, the form falls back to a normal submit to Kit. */
(function () {
  document.querySelectorAll('form.kit-signup').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      var label = button ? button.textContent : '';
      if (button) { button.disabled = true; button.textContent = 'Sending...'; }
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return { status: r.ok ? 'success' : 'failed' }; }); })
        .then(function (data) {
          if (data && data.status && data.status !== 'failed') {
            var msg = document.createElement('p');
            msg.setAttribute('role', 'status');
            msg.style.cssText = 'margin:0;padding:18px 20px;border-radius:6px;background:#E4F3F0;color:#10251D;font-size:17px;line-height:1.5;flex:1 1 100%';
            msg.innerHTML = '<strong>You’re almost in.</strong> Check your inbox and confirm your email to start receiving The Pracademic Playbook.';
            form.innerHTML = '';
            form.appendChild(msg);
          } else {
            if (button) { button.disabled = false; button.textContent = label; }
            alertBox(form, 'Something went wrong. Please check your email address and try again.');
          }
        })
        .catch(function () { form.submit(); });
    });
  });
  function alertBox(form, text) {
    var old = form.querySelector('.kit-error'); if (old) old.remove();
    var p = document.createElement('p');
    p.className = 'kit-error'; p.setAttribute('role', 'alert');
    p.style.cssText = 'margin:0;font-size:14px;color:#9B2C1F;flex:1 1 100%';
    p.textContent = text; form.appendChild(p);
  }
})();
