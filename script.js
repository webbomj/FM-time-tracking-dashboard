let links = document.querySelectorAll('.info-block__btn')
let currentHours = document.querySelectorAll('.timezone__current-hours')
let prevHours = document.querySelectorAll('.timezone__prev-hours')

let dataJson = []
let time = 'weekly'

function dataSet() {
  currentHours.forEach(el => {
    let currentDeal = el.dataset.deal
    let currentTime = dataJson.filter(el => el.title === currentDeal)[0]
    el.textContent = `${currentTime.timeframes[time].current}hrs`
  })
}

function prevDataSet() {
  console.log(prevHours)
  prevHours.forEach(el => {
    let deal = el.dataset.deals
    let prevTime = dataJson.filter(el => el.title === deal)[0]
    el.textContent = `Lasts ${time} ${prevTime.timeframes[time].previous}hrs`
  })
}

const choosenTime = (e) => {
  links.forEach(el => {
    el.classList.remove('info-block__btn--active')
  })
  let currentTime = e.target
  currentTime.classList.add('info-block__btn--active')
  time = e.target.dataset.time
  dataSet()
  prevDataSet()
}

async function init () {
  await fetch('./data.json').then(res => res.json()).then(data => dataJson.push(...data))
}

init()
links.forEach(el => el.addEventListener('click', choosenTime))