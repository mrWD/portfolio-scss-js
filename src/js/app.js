const flatpickr = require('flatpickr')

const scroller = require('./plugins/scroller')
const classToggler = require('./plugins/classToggler')
const slider = require('./plugins/slider')

flatpickr('.js-datepicker', {
  altInput: true,
  dateFormat: 'Y-m-d',
  disableMobile: false,
})

scroller('.js-anchor')
classToggler('.js-show-dropdown', 'is-open')
slider('.js-slider')
