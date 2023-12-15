<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month"
                @click="changeMonth(false)"></button>
        <div class="calendar-view__date">{{ monthYearName }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month"
                @click="changeMonth(true)"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="day in getDays" :key="day['date']" class="calendar-view__cell"
           :class="{ 'calendar-view__cell_inactive': !day['active'] }" tabindex="0">
        <div class="calendar-view__cell-day">{{ day['date'].getDate() }}</div>
        <div class="calendar-view__cell-content">
          <a v-for="meetup in filterMeetups(day['date'])" :key="meetup.id" :href="`/meetups/${meetup.id}`"
             class="calendar-event">{{ meetup.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  data() {
    return {
      date: new Date(),
      startDate: null,
      endDate: null,
    }
  },
  DAYS_IN_WEEK: 7,
  WEEK_DAYS: {
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
    'sunday': 7
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    changeMonth(nextMonth) {
      if (nextMonth === true) {
        this.date = new Date(this.date.setMonth(this.date.getMonth() + 1, 1));
      } else {
        this.date = new Date(this.date.setMonth(this.date.getMonth() - 1, 1));
      }
    },
    getInactiveDays(arMonthDays, dayKey, period) {
      let dayOfWeek = arMonthDays[dayKey]['date'].getDay() === 0 ? this.$options.WEEK_DAYS['sunday'] : arMonthDays[dayKey]['date'].getDay();
      let date = new Date(arMonthDays[dayKey]['date']);
      if (period === 'prev') {
        if (dayOfWeek !== 1) {
          for (let day = 1; day < dayOfWeek; day++) {
            arMonthDays.unshift({
              'date': new Date(date.setDate(date.getDate() - 1)),
              'active': false
            });
          }
        }
        this.startDate = arMonthDays[0]['date'];
      } else if (period === 'next') {
        if (dayOfWeek !== 0) {
          for (let day = dayOfWeek; day < this.$options.DAYS_IN_WEEK; day++) {
            arMonthDays.push({
              'date': new Date(date.setDate(date.getDate() + 1)),
              'active': false
            });
          }
        }
        this.endDate = arMonthDays[arMonthDays.length - 1]['date'];
      }
    },
    filterMeetups(currentDay) {
      let timeStart = currentDay;
      let timeEnd = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1);
      let filterMeetups = this.meetups.filter((meetup) => {
        return (meetup.date >= timeStart.getTime() && meetup.date < timeEnd.getTime());
      })
      return filterMeetups;
    }
  },
  computed: {
    monthYearName() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
    getDays() {
      let year = this.date.getFullYear();
      let month = this.date.getMonth();
      let countDays = new Date(year, (month + 1), 0).getDate();
      let arMonthDays = [];
      let day = 1;
      // Заполняем массив текущим месяцем
      while (day <= countDays) {
        arMonthDays.push({
          'date': new Date(year, month, day),
          'active': true
        });
        day++;
      }
      // Заполняем массив предыдущим месяцем
      this.getInactiveDays(arMonthDays, 0, 'prev');
      // Заполняем массив слудующим месяцем
      this.getInactiveDays(arMonthDays, (arMonthDays.length - 1), 'next');

      return arMonthDays;
    }
  }
}

</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
