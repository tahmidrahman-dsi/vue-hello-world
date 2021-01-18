<template>
  <div class="Header">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-home"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
    <h3>Employee management dashboard</h3>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.Header {
  background-color: lightseagreen;
  padding: 0 8px;
  text-align: left;
  display: inline-flex;
  color: whitesmoke;
  align-items: center;
  width: calc(100% - 16px);
}

.Header h3 {
  white-space: nowrap;
  padding-top: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.Header > svg {
  stroke: whitesmoke;
  margin-right: 16px;
}
</style>
