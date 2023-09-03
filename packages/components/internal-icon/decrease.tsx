import { defineComponent } from "vue";

export default defineComponent({
  name: 'Decrease',
  render() {
    return (
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"></path>
      </svg>
    )
  }
})