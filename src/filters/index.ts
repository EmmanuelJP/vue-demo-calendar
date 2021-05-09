import Helpers from "@/core/helpers";
import moment from "moment";
import Vue from "vue";

Vue.filter("date", (value: Date) => moment(value).format("L"));
Vue.filter("month", (value: number) => Helpers.months[value]);
