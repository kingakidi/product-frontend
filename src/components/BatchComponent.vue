<!-- eslint-disable vue/no-unused-components -->
<template>
  <div style="margin-top: 30px">
    <batch-table></batch-table>
  </div>
</template>
<script>
import BatchTable from "./Tables/SingleBatch";
// import Buttons from "./Buttons";
export default {
  name: "BatchComponent",
  components: { BatchTable },
};
</script>

<style scoped></style>
