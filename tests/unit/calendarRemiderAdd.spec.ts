import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import CalendarReminderAdd from "@/components/CalendarReminderAdd.vue";
import Vuex from "vuex";
import Buefy from "buefy";
import VeeValidate from "vee-validate";

import CalendarDate from "@/models/CalendarDate";
import CalendarReminder from "@/models/CalendarReminder";
import moment from "moment";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);
localVue.use(VeeValidate);
localVue.filter("date", (value: Date) => moment(value).format("L"));
describe("CalendarReminderAdd.vue", () => {
  it("should emit saved event when passed", async () => {
    const calendarDate = new CalendarDate(new Date());
    const wrapper = mount(CalendarReminderAdd, {
      propsData: {
        date: calendarDate,
      },
      localVue,
    });
    const model = new CalendarReminder(new Date(), "hi", "New York", "#000000");
    model.time = model.date;
    await wrapper.setData({model});
    const wpp = wrapper.vm as any;
    await wpp.save();
    expect(wrapper.emitted().saved).toBeUndefined();
  });
});
