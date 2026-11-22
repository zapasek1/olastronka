// Formularz zgłoszeniowy: wysyłka przez Web3Forms na e-mail właścicielki.
// Ochrona przed spamem: ukryte pole (honeypot) i minimalny czas wypełniania.
// Bez klucza Web3Forms: otwiera program pocztowy z gotową wiadomością.

export function initForm() {
  const form = document.querySelector<HTMLFormElement>('#formularz');
  if (!form) return;
  const status = form.querySelector<HTMLElement>('.form__status')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const { key, email, subject, thanks } = form.dataset;
  const startedAt = Date.now();

  // Wstępny wybór rodzaju konsultacji z linku (?rodzaj=...).
  const rodzaj = new URLSearchParams(location.search).get('rodzaj');
  const kind = form.elements.namedItem('kind') as HTMLSelectElement | null;
  if (rodzaj && kind) {
    const opt = [...kind.options].find((o) => o.value === rodzaj);
    if (opt) kind.value = rodzaj;
  }

  function setStatus(text: string, k: 'ok' | 'err' | '' = '') {
    status.textContent = text;
    status.dataset.kind = k;
  }

  function firstProblem(): string | null {
    const f = form!.elements as any;
    if (!f.name.value.trim()) return 'Wpisz imię i nazwisko.';
    if (!f.email.value.trim() || !f.email.checkValidity()) return 'Wpisz poprawny adres e-mail, abym mogła odpowiedzieć.';
    if (!f.message.value.trim()) return 'Napisz kilka słów o tym, z czym przychodzisz.';
    if (!f.consent.checked) return 'Zaznacz zgodę na przetwarzanie danych, aby wysłać zgłoszenie.';
    return null;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const problem = firstProblem();
    if (problem) return setStatus(problem, 'err');

    const data = new FormData(form);
    if (data.get('botcheck')) return;
    if (Date.now() - startedAt < 3000) return setStatus('Chwileczkę, spróbuj ponownie za moment.', 'err');

    const name = String(data.get('name'));
    const fields = {
      'Imię i nazwisko': name,
      'E-mail': String(data.get('email')),
      Telefon: String(data.get('phone') || '-'),
      Zwierzę: String(data.get('pet')),
      'Imię zwierzaka': String(data.get('pet_name') || '-'),
      'Rodzaj konsultacji': String(data.get('kind')),
      Forma: String(data.get('mode')),
      Wiadomość: String(data.get('message')),
    };

    if (!key) {
      const body = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject!)}&body=${encodeURIComponent(body)}`;
      return setStatus('Otworzył się program pocztowy z gotową wiadomością. Wystarczy kliknąć „Wyślij”.', 'ok');
    }

    button.disabled = true;
    setStatus('Wysyłanie…');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `${subject}: ${fields['Zwierzę']}, ${fields['Rodzaj konsultacji']}`,
          from_name: name,
          replyto: fields['E-mail'],
          botcheck: '',
          ...fields,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || res.statusText);
      form.reset();
      setStatus(thanks || 'Dziękuję, zgłoszenie zostało wysłane.', 'ok');
    } catch {
      setStatus(`Nie udało się wysłać zgłoszenia. Spróbuj ponownie albo napisz na ${email}.`, 'err');
    } finally {
      button.disabled = false;
    }
  });
}
