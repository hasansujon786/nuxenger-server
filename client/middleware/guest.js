export default ({ redirect, app: { $apolloHelpers } }) => {
  const token = $apolloHelpers.getToken()
  // const authUser = store.getters['auth/authUser']
  if (token) {
    // if no toket
    console.info('You are already signid in.')
    redirect('/')
  }
}
