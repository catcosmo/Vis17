<template lang="html">
  <div class="">
    <h1 class="question">Schätze das Seitenverhältnis:</h1>

    <figure>
      <svg width="357" height="150" viewBox="0 0 357 150">
        <rect width="150" height="150" x="0" fill="#D76759" />
        <rect width="150" height="150" x="207" fill="#D76759" />
      </svg>
    </figure>

    <section class="test">
      <form class="answer" @submit.prevent="onSubmit">
        <p>
          <input type="text" v-model="leftSquare">
          zu
          <input type="text" v-model="rightSquare">
        </p>
        <p>
          <button type="submit">Senden</button>
        </p>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  // the name is only relevant for debugging
  name: 'picker',

  // 'data' is the state of a component
  data () {
    return {
      type: 'circle', // either circle or square, decides what we compare,
      leftSquare: 1, // ratio of left square
      rightSquare: 2 // to ratio of right square
    }
  },

  // under methods we can define functions of a component
  methods: {
    // this one is called onSubmit, because in the template we said "@submit="onSubmit"".
    // it could also be called "schnitzel", so there's no magic or anything
    onSubmit () {
      console.log('trying to submit the form')
      console.log('this.leftSquare', parseInt(this.leftSquare, 10))
      console.log('this.rightSquare', parseInt(this.rightSquare, 10))
      // not that we don't have to prevent the submit event, because we said "@submit.prevent"
    }
  }
}
</script>

<style lang="css">
figure {
  margin-left: 0;
  margin-right: 0
}

.answer input {
  width: 2em;
  text-align: center;
  font-size: 1.2em;
  margin: .6em
}

.answer input,
.answer button {
  font-size: 14px;
}
</style>
