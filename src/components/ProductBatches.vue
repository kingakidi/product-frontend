<template>
  <div>
    <buttons></buttons>
    <batch-table></batch-table>
  </div>
</template>
<script>
import BatchTable from "./Tables/BatchTable";
import Buttons from "./Buttons";
export default {
  name: "ProductBatches",
  components: { BatchTable, Buttons },
};
</script>

<style scoped></style>
