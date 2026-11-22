/* Six-P Pipeline Check-Up
   This page only shows the questions. Answers are sent to Dr. U.T. Muhammad's
   private scoring service, which returns the result. No scoring lives here.
   (c) 2026 Umar T. Muhammad, LLC. All rights reserved. */
(function () {
  var API = 'https://sixp-checkup.umar-usports.workers.dev/';
  var root = document.getElementById('checkup');
  if (!root) return;

  var STEPS = [
    { title: 'Tell us about your athlete', intro: 'No names. Just the basics.', info: true },
    { title: 'The Sports market', intro: 'Teams, spending, offers and rankings.', qs: [
      ['A1', 'What is the highest level of team your child plays on right now?', ['Rec league, school intramurals or free play', 'Local club or school team', 'Travel, select, AAU or academy team', 'Top regional or national club, varsity starter, or national circuit', 'Committed or signed to a college or pro academy', 'Paid or professional contract']],
      ['A2', 'About how much does your family spend on the main sport each year? Include fees, travel, training and gear.', ['Under $500', '$500 to $1,999', '$2,000 to $4,999', '$5,000 or more']],
      ['A3', "Has anyone outside the family paid for or offered something because of your child's play?", ['No', 'Free gear or lower fees', 'A team or club covers most costs', 'College interest, offers or scholarship talk', 'A formal offer or signed commitment', 'Salary, prize money or a paid contract']],
      ['A4', 'Which best describes rankings and showcases?', ['None', 'Local tryouts or camps', 'Showcases or invite-only events', 'Ranked by a recruiting service', 'On national top lists', 'Drafted or signed as a pro']],
      ['A5', 'Has your child earned money from their name, image or likeness (NIL)?', ['No, and not thinking about it', 'Thinking about it', 'Free product or small local deals', 'Paid deals under $5,000 a year', 'Paid deals of $5,000 or more, or an agent or collective', 'NIL is a main source of income']]
    ]},
    { title: 'Who is around your athlete', intro: 'Who watches, who follows and who has a say.', qs: [
      ['B1', "Who regularly watches or follows your child's play?", ['Family and friends', 'Coaches and other team families', 'Club directors, trainers or local media', 'College coaches or scouts', 'Pro scouts or national media', 'Sponsors and brands']],
      ['B2', "Which best describes your child's social media?", ['None', 'Private account run by the family', 'Public account with sport highlights', 'Recruiting profile and highlight film shared often', 'Large following with brand posts', 'Run by an agent or marketing professional']],
      ['B3', 'Outside the family, who has a say in sport decisions?', ['Nobody', 'The coach', 'A club director or private trainer', 'A recruiting service or advisor', 'An agent, collective or NIL representative', 'Sponsors or a management team']],
      ['B4', 'What public recognition has your child received?', ['None', 'Team awards', 'Local media or all-league honors', 'All-state or regional honors', 'All-American or national honors', 'National brand or pro recognition']]
    ]},
    { title: 'How your family plays', intro: "Your child's Sport experience and your family's choices.", qs: [
      ['C2', 'How many months a year does your child play the main sport?', ['12', '10 to 11', '8 to 9', '6 to 7', '5 or fewer']],
      ['C3', 'How many days a week is your child free from organized sport?', ['None', 'One', 'Two or more']],
      ['C4', 'How does your child talk about their sport most weeks?', ['Dreads it or wants to quit', 'Goes because they have to', 'Mixed', 'Mostly likes it', 'Loves it and asks to play']],
      ['C5', 'Who makes the big sport decisions?', ['Mostly adults outside the family', 'Mostly parents', "Parents, with the child's input", 'Shared equally', 'The child leads, with parent guidance']],
      ['C6', 'How often does sport crowd out school, sleep or friends?', ['Often', 'Sometimes', 'Rarely', 'Never, we protect them']],
      ['C7', 'Which is closest to why your family invests in sport?', ['We expect a scholarship or pro payoff', 'We hope it pays off later', 'To keep up with other families', 'Health, friends and fun, with a goal', 'Joy and life lessons, whatever comes']]
    ]}
  ];

  var state = { step: 0, info: {}, answers: {} };

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function render() {
    var s = STEPS[state.step];
    root.innerHTML = '';
    root.appendChild(el('p', { class: 'eyebrow' }, 'Step ' + (state.step + 1) + ' of 4'));
    var bar = el('div', { class: 'ck-bar', 'aria-hidden': 'true' }, '<span style="width:' + ((state.step + 1) * 25) + '%"></span>');
    root.appendChild(bar);
    root.appendChild(el('h3', { class: 'disp', style: 'font-size:34px' }, esc(s.title)));
    root.appendChild(el('p', { class: 'ck-intro' }, esc(s.intro)));
    var form = el('form', { class: 'ck-form', novalidate: '' });

    if (s.info) {
      var ages = '<option value="">Select age</option>'; for (var a = 5; a <= 18; a++) ages += '<option' + (state.info.age == a ? ' selected' : '') + '>' + a + '</option>';
      var grades = ['Kindergarten'].concat([1,2,3,4,5,6,7,8,9,10,11,12].map(function (g) { return 'Grade ' + g; }));
      var gopts = '<option value="">Select grade</option>' + grades.map(function (g) { return '<option' + (state.info.grade === g ? ' selected' : '') + '>' + g + '</option>'; }).join('');
      form.innerHTML =
        '<div class="ck-field"><label for="ck-age">Child\'s age</label><select id="ck-age" class="field" required>' + ages + '</select></div>' +
        '<div class="ck-field"><label for="ck-grade">Grade</label><select id="ck-grade" class="field" required>' + gopts + '</select></div>' +
        '<div class="ck-field"><label for="ck-sport">Main sport</label><input id="ck-sport" class="field" required maxlength="60" placeholder="Basketball, football, soccer..." value="' + esc(state.info.sport || '') + '"></div>' +
        '<div class="ck-field"><label for="ck-other">Other sports played in the last 12 months</label><input id="ck-other" class="field" maxlength="200" placeholder="Optional. Separate with commas" value="' + esc((state.info.otherSports || []).join(', ')) + '"></div>';
    } else {
      s.qs.forEach(function (q, qi) {
        var fs = el('fieldset', { class: 'ck-q' });
        fs.appendChild(el('legend', null, '<span>' + (qi + 1) + '.</span> ' + esc(q[1])));
        q[2].forEach(function (opt, i) {
          var id = 'ck-' + q[0] + '-' + i;
          var lab = el('label', { for: id, class: 'ck-opt' });
          lab.innerHTML = '<input type="radio" id="' + id + '" name="' + q[0] + '" value="' + i + '"' + (state.answers[q[0]] === i ? ' checked' : '') + '> <span>' + esc(opt) + '</span>';
          fs.appendChild(lab);
        });
        form.appendChild(fs);
      });
    }

    var nav = el('div', { class: 'ck-nav' });
    if (state.step > 0) { var back = el('button', { type: 'button', class: 'btn-line' }, 'Back'); back.onclick = function () { save(form, false); state.step--; render(); top(); }; nav.appendChild(back); }
    nav.appendChild(el('button', { type: 'submit', class: 'btn' }, state.step === 3 ? 'See my results' : 'Continue'));
    form.appendChild(nav);
    form.appendChild(el('p', { class: 'ck-err', role: 'alert' }));
    form.onsubmit = function (e) {
      e.preventDefault();
      var missing = save(form, true);
      if (missing) { form.querySelector('.ck-err').textContent = missing; return; }
      if (state.step < 3) { state.step++; render(); top(); } else submit(form);
    };
    root.appendChild(form);
  }

  function save(form, check) {
    var s = STEPS[state.step];
    if (s.info) {
      var age = form.querySelector('#ck-age').value, grade = form.querySelector('#ck-grade').value, sport = form.querySelector('#ck-sport').value.trim();
      var other = form.querySelector('#ck-other').value.split(',').map(function (x) { return x.trim(); }).filter(Boolean);
      state.info = { age: age ? Number(age) : '', grade: grade, sport: sport, otherSports: other };
      if (check && (!age || !grade || !sport)) return 'Please choose an age and grade, and enter the main sport.';
      return '';
    }
    var miss = 0;
    s.qs.forEach(function (q) {
      var c = form.querySelector('input[name="' + q[0] + '"]:checked');
      if (c) state.answers[q[0]] = Number(c.value); else miss++;
    });
    return check && miss ? 'Please answer every question on this page (' + miss + ' left).' : '';
  }

  function submit(form) {
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Scoring...';
    var body = { age: state.info.age, grade: state.info.grade, sport: state.info.sport, otherSports: state.info.otherSports, answers: state.answers };
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (x) {
        if (!x.ok) throw new Error(x.d && x.d.error || 'error');
        try { sessionStorage.setItem('sixpCheckupId', x.d.id); } catch (e) {}
        results(x.d); top();
      })
      .catch(function (err) {
        btn.disabled = false; btn.textContent = 'See my results';
        form.querySelector('.ck-err').textContent = (err && err.message && err.message !== 'error' && err.message.indexOf('fetch') < 0) ? err.message : 'We could not reach the scoring service. Please try again in a moment.';
      });
  }

  function results(d) {
    root.innerHTML = '';
    root.appendChild(el('p', { class: 'eyebrow' }, 'Your results'));
    root.appendChild(el('div', { class: 'ck-cards' },
      '<div class="ck-card ck-stage"><span class="ck-k">Six-P stage</span><span class="disp ck-v">' + esc(d.stageName) + '</span><span>' + esc(d.stageText) + '</span></div>' +
      '<div class="ck-card ck-align"><span class="ck-k">Alignment</span><span class="disp ck-v">' + esc(d.title) + '</span><span>' + esc(d.summary) + '</span></div>'));
    root.appendChild(el('p', { class: 'ck-window' }, esc(d.windowLine)));
    if (d.riskFlag) root.appendChild(el('div', { class: 'ck-flag' }, '<strong>Highest-risk window.</strong> ' + esc(d.riskFlag)));
    var steps = '<h4>What to Do Next</h4><ol>' + d.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>';
    if (d.result === 'R5') steps += '<a class="btn" href="contact.html">Book a family conversation</a>';
    root.appendChild(el('div', { class: 'ck-next' }, steps));
    if (d.nilInvite) {
      root.appendChild(el('div', { class: 'ck-nil' }, '<span class="ck-k">Next step · Free</span><h4>NIL Readiness Score</h4><p>' + esc(d.nilInvite) + '</p><a class="btn-gold" href="nil-score.html?from=checkup">Take the NIL Readiness Score</a>'));
    }
    var mail = el('div', { class: 'ck-mail' });
    mail.innerHTML = '<h4>Get More Help for Your Stage</h4><p>Join The Pracademic Playbook for Sports Family Planning tips. Optional, and you can unsubscribe any time.</p>' +
      '<form class="kit-signup" action="https://app.kit.com/forms/10205107/subscriptions" method="post">' +
      '<input type="hidden" name="fields[role]" value="Parent or guardian">' +
      '<input class="field" type="text" name="fields[first_name]" placeholder="First name" aria-label="First name">' +
      '<input class="field" type="email" name="email_address" required placeholder="Email address" aria-label="Email address">' +
      '<label class="ck-consent"><input type="checkbox" required> I am the parent or guardian, and I agree to receive emails.</label>' +
      '<button class="btn" type="submit">Send me tips</button></form>';
    root.appendChild(mail);
    var again = el('button', { type: 'button', class: 'btn-line', style: 'align-self:flex-start' }, 'Start over'); again.onclick = function () { state = { step: 0, info: {}, answers: {} }; render(); top(); };
    root.appendChild(again);
    if (window.KitSignupBind) window.KitSignupBind(mail.querySelector('form'));
  }

  function top() { var y = root.getBoundingClientRect().top + window.pageYOffset - 24; window.scrollTo({ top: y, behavior: 'smooth' }); }
  render();
})();
