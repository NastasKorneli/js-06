'use strict';

{
  const init = () => {
    // Funktionsaufrufe, die zum Start der Anwendung ausgeführt werden
    highlightChatMembersBy('ert');
  };

  // Funktionen
  const highlightChatMembersBy = (partOfMemberName) => {
    chatMembers()
      .filter((member) => doesMemberMatch(partOfMemberName, member))
      .forEach(highlight);
  };

  const doesMemberMatch = (partOfMemberName, member) =>
    member.innerHTML.toLowerCase().includes(partOfMemberName.toLowerCase());

  const chatMembers = () => $$('#chat_members li');
  const highlight = (el) => el.classList.add('highlighted');

  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  init();
}
