const scroller = selector => {
  const links = document.querySelectorAll(selector)

  Array.from(links).forEach(item => {
    const targetId = item.getAttribute('href').substring(1)
    const targetEl = document.getElementById(targetId)

    item.onclick = e => {
      e.preventDefault()

      targetEl.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

module.exports = scroller
