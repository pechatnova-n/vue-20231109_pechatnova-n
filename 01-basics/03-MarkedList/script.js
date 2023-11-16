// From https://jsonplaceholder.typicode.com/comments
import {createApp} from "./vendor/vue.esm-browser";

const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

createApp({
  data() {
    return {
      emails,
      search: '',
    }
  },

   computed: {
    getNewEmailsArray() {
      let result = [];
      emails.map((email) => {
          let item = {
            name: email,
            flag: '',
          }
          result.push(item);
       })
      return result;
    },
   },

  watch: {
    search(newValue, oldValue) {
      this.getNewEmailsArray.map((item) => {
        if(this.search === '') {
          item.flag = '';
        } else if(item.name.toLowerCase().includes(this.search.toLowerCase())) {
          item.flag = 'marked';
        } else {
          item.flag = '';
        }
      });
    }
  }

}).mount("#app");
