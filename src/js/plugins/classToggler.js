const classToggler = (selector, activeClass) => {
  Array.from(document.querySelectorAll(selector)).forEach(item => {
    item.onclick = e => {
      const target = e.target.dataset.dropdownTarget
      const targetList =  document.querySelectorAll('[data-dropdown-id="' + target + '"]')

      Array.from(targetList).forEach(item => {
        item.classList.toggle(activeClass)
      })
    }
  })
}

module.exports = classToggler
