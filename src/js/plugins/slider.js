const slider = selector => {
  const sliders = document.querySelectorAll(selector)

  Array.from(sliders).forEach(slider => {
    if (!slider) return

    const { clientWidth: sliderWidth } = slider
    const linksInItems = slider.getElementsByTagName('a')

    let autoslider, wrapper, carriage, slideList, wrapperWidth, itemWidth, itemHeight, itemsCount

    setSizes()

    const MIN_TRANSLATION = 0
    const maxTranslation = carriage.clientWidth - itemWidth * itemsCount

    let preventEvent = false
    let translationStart = false
    let prevElCounts = 0
    let lastActiveIndex = prevElCounts + itemsCount - 1
    let carriagePosition = 0

    let moveStart = 0
    let moveEnd = 0
    let distance = 0

    carriage.style.transform = `translateX(-${carriagePosition}px)`

    setActiveClass()
    autoslide()

    // Events
    slider.addEventListener('touchstart', startTranslation)
    slider.addEventListener('mousedown', startTranslation)

    slider.addEventListener('touchmove', translate)
    slider.addEventListener('mousemove', translate)

    slider.addEventListener('touchend', stopTranslation)
    document.addEventListener('mouseup', stopTranslation)

    window.addEventListener('resize', () => {
      if (window.clientWidth > wrapperWidth) return

      wrapper.style.width = null
      setSizes()
    })

    Array.from(linksInItems).forEach(link => {
      link.onclick = e => {
        if (preventEvent) return false
      }
    })

    // Logic
    function startTranslation(e) {
      clearInterval(autoslider)

      moveStart = e.type === 'mousedown' ? e.clientX : e.changedTouches[0].clientX
      translationStart = true
      preventEvent = false
      carriage.style.transition = null
    }

    function translate(e) {
      e.preventDefault()

      if (!translationStart) return

      moveEnd = e.type === 'mousemove' ? e.clientX : e.changedTouches[0].clientX
      distance = carriagePosition + moveStart - moveEnd

      if (distance < MIN_TRANSLATION) distance = MIN_TRANSLATION
      if (distance > maxTranslation) distance = maxTranslation

      prevElCounts = Math.round(Math.abs(distance) / itemWidth)
      lastActiveIndex = prevElCounts + itemsCount - 1
      preventEvent = true

      carriage.style.transform = `translateX(-${distance}px)`

      setActiveClass()
    }

    function stopTranslation(e) {
      moveStart = 0
      moveEnd = 0

      translationStart && autoslide()
      translationStart = false

      distance = prevElCounts * itemWidth
      carriagePosition = distance

      carriage.style.transition = 'transform 0.3s'
      carriage.style.transform = `translateX(-${distance}px)`
    }

    function autoslide() {
      autoslider = setInterval(() => {
        carriagePosition += itemWidth

        if (carriagePosition > maxTranslation) {
          carriagePosition = 0
        }

        prevElCounts = Math.round(Math.abs(carriagePosition) / itemWidth)
        lastActiveIndex = prevElCounts + itemsCount - 1

        carriage.style.transition = 'transform 0.3s'
        carriage.style.transform = `translateX(-${carriagePosition}px)`

        setActiveClass()
      }, 3000)
    }

    function setActiveClass() {
      Array.from(slideList).forEach((slide, i) => {
        if (i < prevElCounts || i > lastActiveIndex) {
          return slide.classList.remove('is-active')
        }

        slide.classList.add('is-active')
      })
    }

    function setSizes() {
      wrapper = slider.children[0]
      carriage = wrapper.children[0]
      slideList = carriage.children

      wrapperWidth = slider.children[0].clientWidth
      itemWidth = slideList[0].clientWidth
      itemHeight = slideList[0].clientHeight
      itemsCount = Math.floor(wrapperWidth / itemWidth) || 1

      wrapper.style.width = `${itemWidth * itemsCount}px`
      wrapper.style.height = `${itemHeight}px`
    }
  })
}

module.exports = slider
