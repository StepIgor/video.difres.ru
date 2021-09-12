import {writable} from "svelte/store";

export const history = writable(JSON.parse(localStorage.getItem('history') == null ? '[]' : localStorage.getItem('history')));
history.subscribe((val) => {localStorage.setItem('history', JSON.stringify(val))});

export const liked = writable(JSON.parse(localStorage.getItem('liked') == null ? '[]' : localStorage.getItem('liked')));
liked.subscribe((val) => {localStorage.setItem('liked', JSON.stringify(val))});

export const subs = writable(JSON.parse(localStorage.getItem('subs') == null ? '[]' : localStorage.getItem('subs')));
subs.subscribe((val) => {localStorage.setItem('subs', JSON.stringify(val))});

export const mychannel = writable(localStorage.getItem('mychannel') == null ? -1 : parseInt(localStorage.getItem('mychannel')))
mychannel.subscribe((val) => {localStorage.setItem('mychannel', parseInt(val))})

export let lastAppUpdate = writable(localStorage.getItem('lastAppUpdate') == null ? '[]' : JSON.parse(localStorage.getItem('lastAppUpdate')))
lastAppUpdate.subscribe((val) => localStorage.setItem('lastAppUpdate', JSON.stringify(val)))