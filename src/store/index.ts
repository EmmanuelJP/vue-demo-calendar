import { StoreState } from "@/core/interfaces";
import {
  DELETE_REMINDERS_ASYNC,
  DELETE_REMINDER_ASYNC,
  EDIT_REMINDER_ASYNC,
  NEW_REMINDER_ASYNC,
} from "@/core/actions";
import {
  DELETE_REMINDER,
  DELETE_REMINDERS,
  EDIT_REMINDER,
  NEW_REMINDER,
  SET_REMINDERS,
} from "@/core/mutations";
import CalendarReminder from "@/models/CalendarReminder";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reminders: (localStorage.getItem("reminders")
      ? JSON.parse(localStorage.getItem("reminders") as string)
      : []) as CalendarReminder[],
  },
  mutations: {
    [SET_REMINDERS](state: StoreState) {
      const reminders = JSON.stringify(state.reminders);
      localStorage.setItem("reminders", reminders);
    },
    [NEW_REMINDER](state: StoreState, reminder: CalendarReminder) {
      state.reminders.push(reminder);
    },
    [EDIT_REMINDER](state: StoreState, reminder: CalendarReminder) {
      const index = state.reminders.findIndex((x) => x.id === reminder.id);
      state.reminders[index] = reminder;
    },
    [DELETE_REMINDER](state: StoreState, reminder: CalendarReminder) {
      const index = state.reminders.findIndex((x) => x.id === reminder.id);
      state.reminders.splice(index, 1);
    },
    [DELETE_REMINDERS](state: StoreState, reminders: CalendarReminder[]) {
      reminders.forEach((x) => {
        const index = state.reminders.findIndex((y) => y.id === x.id);
        state.reminders.splice(index, 1);
      });
    },
  },
  actions: {
    [NEW_REMINDER_ASYNC]({ commit }, reminder: CalendarReminder) {
      commit(NEW_REMINDER, reminder);
      commit(SET_REMINDERS);
    },
    [EDIT_REMINDER_ASYNC]({ commit }, reminder: CalendarReminder) {
      commit(EDIT_REMINDER, reminder);
      commit(SET_REMINDERS);
    },
    [DELETE_REMINDER_ASYNC]({ commit }, reminder: CalendarReminder) {
      commit(DELETE_REMINDER, reminder);
      commit(SET_REMINDERS);
    },
    [DELETE_REMINDERS_ASYNC]({ commit }, reminder: CalendarReminder) {
      commit(DELETE_REMINDERS, reminder);
      commit(SET_REMINDERS);
    },
  },
  modules: {},
});
