import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupDescription from "../../02-MeetupDescription/components/MeetupDescription";
import MeetupCover from "../../03-MeetupCover/components/MeetupCover";
import MeetupInfo from "../../04-MeetupInfo/components/MeetupInfo";
import MeetupAgendaItem from "../../05-MeetupAgenda/components/MeetupAgendaItem";
import MeetupAgenda from "../../05-MeetupAgenda/components/MeetupAgenda";
import MeetupView from "../../06-MeetupView/components/MeetupView";
import {fetchMeetupById} from "../meetupService";


export default defineComponent({
  name: 'PageMeetup',

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgendaItem,
    MeetupAgenda,
    MeetupView,
  },

  data() {
    return {
      meetup: null,
      errorMessage: null,
    }
  },

  fetchMeetupById,

  methods: {
    getMeetupById() {
      fetchMeetupById(this.meetupId).then((meetup) => {
        this.meetup = meetup;
    }).catch((error) => {
        this.meetup = null;
        this.errorMessage = error.message;
    })
  },
},

  watch: {
    meetupId() {
      this.getMeetupById(this.meetupId);
    },
  },

  created() {
    this.getMeetupById(this.meetupId);
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup" />

      <UiContainer v-else>
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer>
        <UiAlert :text="errorMessage"></UiAlert>
      </UiContainer>
    </div>`,
});
