// Ustawienia techniczne. Edytuje tylko osoba utrzymująca kod (nie CMS).

export const techConfig = {
  // Klucz dostępu Web3Forms (https://web3forms.com), założony na e-mail właścicielki.
  // Jest publiczny z założenia, więc może leżeć w repozytorium.
  // Puste = formularz otwiera program pocztowy (mailto) zamiast wysyłać przez Web3Forms.
  web3formsKey: '',

  // Przełącznik propozycji kolorystycznych (A/B/C) widoczny na stronie.
  // Po wyborze wariantu: ustaw domyslnyWariant i zmień pokazWarianty na false.
  pokazWarianty: true,
  domyslnyWariant: 'a' as 'a' | 'b' | 'c',
};
