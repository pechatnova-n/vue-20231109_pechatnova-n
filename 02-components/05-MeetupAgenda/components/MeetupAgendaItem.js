import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService';


export default defineComponent({
  name: 'MeetupAgendaItem',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      agendaItemDefaultTitles,
      agendaItemIcons,
    }
  },


  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="'/assets/icons/icon-' + agendaItemIcons[agendaItem.type] + '.svg'" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaItem.title ? agendaItem.title : agendaItemDefaultTitles[agendaItem.type] }}</h3>
        <p v-if="agendaItem.speaker || agendaItem.language" class="agenda-item__talk">
          <span>{{ agendaItem?.speaker }}</span>
          <span v-if="agendaItem.speaker" class="agenda-item__dot"></span>
          <span v-if="agendaItem.language" class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});


