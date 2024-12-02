'use strict';

const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));

const chatMembers = () => $$('#chat_members li');
const highlight = (el) => el.classList.add('highlighted');
const removeHighlight = (el) => el.classList.remove('highlighted');

const removeHighlightsFromAllChatMembers = () =>
  chatMembers().forEach(removeHighlight);

const doesMemberMatch = (partOfMemberName, member) =>
  member.innerHTML.toLowerCase().includes(partOfMemberName.toLowerCase());

const highlightChatMembersBy = (partOfMemberName) => {
  if (partOfMemberName === '') return;
  chatMembers()
    .filter((member) => doesMemberMatch(partOfMemberName, member))
    .forEach(highlight);
};

const updateHighlightingOfChatMembers = (partOfMemberName) => {
  removeHighlightsFromAllChatMembers();
  highlightChatMembersBy(partOfMemberName);
};

const init = () =>
  $('#member_search input').addEventListener('keyup', (event) =>
    updateHighlightingOfChatMembers(event.target.value)
  );
init();
