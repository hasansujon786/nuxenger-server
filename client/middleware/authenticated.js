// export default async ({ store, redirect }) => {
//   if (store.getters['auth/loading']) {
//     setTimeout(() => {
//       if (store.getters['auth/authUser'] === null) {
//         redirect('/login')
//         store.dispatch('auth/setLoading', false)
//       }
//     }, 1000)
//   } else {
//     if (store.getters['auth/authUser'] === null) {
//       redirect('/login')
//       // store.dispatch('auth/setLoading', false)
//     }
//   }
// }

export default async ({ store, redirect, app: { $apolloHelpers } }) => {
  const token = $apolloHelpers.getToken()
  const loading = store.getters['auth/loading']
  const authUser = store.getters['auth/authUser']

  if (!token) {
    // if no toket
    console.info('redirect for for no toket')
    redirect('/login')
  } else if (token && authUser === null && loading) {
    // should redirect or not dicide after stop loading
    store.dispatch('auth/authPagOnfirstLoad', true)
  } else if (token && authUser === null && !loading) {
    // if invalid token
    console.info('redirec for invalid token')
    redirect('/login')
  }
}
