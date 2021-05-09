<template>
  <section>
    <div class="section">
      <b-button
        @click="selectDate"
        :class="{ 'has-text-grey-lighter': date.isOutOfMonth }"
        :type="date.isToday ? 'is-primary' : 'is-ghost'"
      >

        {{ date.day }}
      </b-button>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CalendarDate from "@/models/CalendarDate";
@Component
export default class CalendarDateComponent extends Vue {
  @Prop() date!: CalendarDate;
  selectDate(){
    this.$emit('select',this.date);
  }
}
</script>

<style scoped>
.is-clickable {
  cursor: pointer;
}
</style>