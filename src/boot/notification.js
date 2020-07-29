export default ({ app, router, Vue }) => {
  Vue.mixin({
    methods: {
      notifySuccess (message) {
        this.notify({
          color: 'positive',
          position: 'top-right',
          message
        })
      },
      notifyWarning (message) {
        this.notify({
          color: 'warning',
          position: 'top-right',
          message
        })
      },
      notifyError (error) {
        console.log(error)
        if (typeof error === 'string') {
          this.notify({ color: 'red', message: error })
          return
        }
        if (error.response && error.response.status === 401) {
          this.notify({ color: 'red', message: 'Unauthorized' })
          return
        }
        if (error.response && error.response.status === 403) {
          this.notify({ color: 'red', message: 'Something went wrong. Please try again later.' })
          return
        }
        let message = ''
        if (error.response && typeof error.response.data === 'string') {
          message = error.response.data
        }
        this.notify({ color: 'red', message })
      },
      notify ({ color, message }) {
        this.$q.notify({
          color: color,
          position: 'top-right',
          message: message,
          actions: [
            {
              label: 'Close',
              color: 'white',
              handler: () => {
              }
            }
          ]
        })
      }
    }
  })
}
