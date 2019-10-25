export const scrollToBottomOfChatBox = ({ el, smooth }) => {
  const element = document.getElementById(el)
  // element.scrollIntoView(false)
  smooth
    ? element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    : element.scrollIntoView(false)
}
