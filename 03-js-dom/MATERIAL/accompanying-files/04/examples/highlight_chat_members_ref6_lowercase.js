'use strict';

{
  const highlightChatMembersBy = (partOfMemberName) => {
    chatMembers()
      .filter((member) => doesMemberMatch(partOfMemberName, member))
      .forEach(highlight);
  };

  const doesMemberMatch = (partOfMemberName, member) =>
    member.innerHTML.toLowerCase().includes(partOfMemberName.toLowerCase());

  const chatMembers = () => $$('#chat_members li');
  const highlight = (el) => el.classList.add('highlighted');

  const $$ = (q) => Array.from(document.querySelectorAll(q));

  highlightChatMembersBy('ert');
}
