'use strict';

{
  const highlightChatMembersBy = (partOfMemberName) => {
    const liNodesFound = chatMembers().filter((member) => doesMemberMatch(partOfMemberName, member));

    liNodesFound.forEach(highlight);
  };

  const doesMemberMatch = (partOfMemberName, member) => member.innerHTML.includes(partOfMemberName);

  const chatMembers = () => $$('#chat_members li');
  const highlight = (el) => el.classList.add('highlighted');

  const $$ = (q) => Array.from(document.querySelectorAll(q));

  highlightChatMembersBy('ert');
}
