'use strict';

{
  const highlightChatMembersBy = (partOfMemberName) => {
    const liNodesFound = chatMembers().filter((liNode) => liNode.innerHTML.includes(partOfMemberName));

    liNodesFound.forEach(highlight);
  };

  const chatMembers = () => $$('#chat_members li');
  const highlight = (el) => el.classList.add('highlighted');

  const $$ = (q) => Array.from(document.querySelectorAll(q));

  highlightChatMembersBy('ert');
}
