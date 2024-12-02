'use strict';

{
  const highlightChatMembersBy = (partOfMemberName) => {
    const liNodes = $$('#chat_members li');
    const liNodesFound = liNodes.filter((liNode) => liNode.innerHTML.includes(partOfMemberName));

    liNodesFound.forEach((li) => li.classList.add('highlighted'));
  };

  const $$ = (q) => Array.from(document.querySelectorAll(q));

  highlightChatMembersBy('ert');
}
