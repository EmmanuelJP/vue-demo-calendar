<template>
  <div class="section">
    <Calendar title="Vue calendar"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Home',
  components: {
    Calendar
  }
}
</script>
