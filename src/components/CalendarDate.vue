<template>
  <section>
    <div class="section">
      <b-button :type="date.isToday ? 'is-primary' : 'is-ghost'">
        <p
          class="is-clickable"
          :class="{
            'has-text-grey-lighter': date.isOutOfMonth,
          }"
        >
          <span> {{ date.day }}</span>
        </p>
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

  created() {}
}
</script>

<style scoped>
.is-clickable {
  cursor: pointer;
}
</style>