import moment from 'moment'

export const textModification = {
  computed: {
    useFirstName() {
      return (fullname = 'mokles khan') => {
        return fullname.split(' ')[0]
      }
    },
    useFirstNameWithUpperCase() {
      return (fullname = 'mokles khan') => {
        let fname = fullname.split(' ')[0]
        return fname.charAt(0).toUpperCase() + fname.substr(1, fname.length)
      }
    },
    useTime() {
      return timeStr => {
        const dateobj = new Date(parseInt(timeStr))
        const time = moment(dateobj, 'YYYYMMDD').fromNow()
        // console.log({ dateobj })
        // console.log({ time })
        return time
      }
    }
  }
}
