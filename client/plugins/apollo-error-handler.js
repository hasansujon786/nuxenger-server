export default (error, context) => {
  console.log(error)
  console.log(context)

  // context.error({ statusCode: 304, message: 'Apollo Server error' })
}
