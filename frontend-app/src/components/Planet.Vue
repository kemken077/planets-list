<script>
  export default {
    props: [
      'name'
    ],
    data() {
      return {
        name: 'no name property...',
      }
    },
    template: `<div>
      <h1>${this.name}</h1>
    </div>`,
  }
// eslint-disable-next-line vue/comment-directive
</script>

<!-- <style></style> -->
