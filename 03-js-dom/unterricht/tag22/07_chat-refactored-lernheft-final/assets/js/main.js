'use strict';

{
  const init = () => {
    $('#member_search input').addEventListener('keyup', (e) => {
      updateHighlightingOfChatMembers(e.target.value);
    });
  };

  const updateHighlightingOfChatMembers = (partOfMemberName) => {
    removeHighlightsFromAllChatMembers();
    highlightChatMembersBy(partOfMemberName);
  };

  const removeHighlightsFromAllChatMembers = () => {
    chatMembers().forEach(removeHighlight);
  };

  const highlightChatMembersBy = (partOfMemberName) => {
    if (partOfMemberName === '') return;
    chatMembers()
      .filter((member) => doesMemberMatch(partOfMemberName, member))
      .forEach(highlight);
  };

  const doesMemberMatch = (partOfMemberName, member) =>
    member.innerHTML.toLowerCase().includes(partOfMemberName.toLowerCase());

  const chatMembers = () => $$('#chat_members li');
  const highlight = (el) => el.classList.add('highlighted');
  const removeHighlight = (el) => el.classList.remove('highlighted');

  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  init();
}
