<template>
  <div style="height:100%;">
    <redirect-error :text="text" :errorNumber="errorNumber" :message="message"></redirect-error>
  </div>
</template>
  <script>
import RedirectError from "./RedirectError";
export default {
  components: {
    RedirectError
  },
  data() {
    return {
      errorNumber:'404',
      text: "404 page.",
      message:"sorry,the data is not found."
    };
  }
};
</script>


