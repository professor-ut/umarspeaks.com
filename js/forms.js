/* Contact and speaking forms: sends forms with class "w3-form" to Web3Forms,
   which emails each submission to Dr. Muhammad's inbox.
   The access key is public by design (it only allows sending to his inbox). */
(function () {
  var ACCESS_KEY = '1e3de09f-bc71-41d4-8ac6-40fc9a5fd458';
  document.querySelectorAll('form.w3-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var button = form.querySelector('button[type="submit"]');
      var label = button ? button.textContent : '';
      if (button) { button.disabled = true; button.textContent = 'Sending...'; }
      var data = Object.fromEntries(new FormData(form));
      data.access_key = ACCESS_KEY;
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.success) {
            var msg = document.createElement('div');
            msg.setAttribute('role', 'status');
            msg.style.cssText = 'grid-column:1/-1;padding:24px;border-radius:8px;background:#E4F3F0;color:#10251D;font-size:17px;line-height:1.6';
            msg.innerHTML = '<strong>Thank you. Your message is on its way.</strong><br>' + (form.dataset.thanks || 'Dr. U.T. Muhammad will be in touch soon.');
            form.innerHTML = ''; form.appendChild(msg);
          } else { fail(); }
        })
        .catch(fail);
      function fail() {
        if (button) { button.disabled = false; button.textContent = label; }
        var old = form.querySelector('.form-error'); if (old) old.remove();
        var p = document.createElement('p');
        p.className = 'form-error'; p.setAttribute('role', 'alert');
        p.style.cssText = 'grid-column:1/-1;margin:0;font-size:15px;color:#9B2C1F';
        p.textContent = 'Something went wrong and your message was not sent. Please try again in a moment.';
        form.appendChild(p);
      }
    });
  });
})();
