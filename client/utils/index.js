export const scrollToBottomOfChatBox = () => {
  const element = document.getElementById('scrollToBottomOfChatBox')
  // element.scrollIntoView(false)
  element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
}
