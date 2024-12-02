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

  const $ = (q) => document.querySelector(q);
  const $$ = (q) => Array.from(document.querySelectorAll(q));
  const $on = (el, ev, fn) => {
    Array.isArray(el) ? el.forEach((o) => $on(o, ev, fn)) : el.addEventListener(ev, fn);
    return el;
  };

  $on($('#member_search input'), 'keyup', () => highlightChatMembersBy($('#member_search input').value));
}
