import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение

createApp({
  name: "App",
  data(){
    return {
      result: '',
      meetup: 'MEETUP-TITLE',
    }
  },
   watch: {
     async result(newValue, oldValue) {
       let obj = await fetchMeetupById(this.result);
       this.meetup = obj.title;
       }
   },


}).mount("#app");
