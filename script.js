const $select = document.querySelector('#select')
const $btn = document.querySelector('#btn')
const $input = document.querySelector('#input')
const $ansvers = document.querySelector('#ansvers')
const $upArrow = document.querySelector('#up')
const $downArrow = document.querySelector('#down')
const $target = document.querySelector('#target')
const $counter = document.querySelector('#counter')
const $text = document.querySelector('#start-text')
const $maximum = document.querySelector('#maximum')
const $title = document.querySelector('#title')
const $prompt = document.querySelector('#prompt')
const $sad = document.querySelector('#sad')

const getRandom = (max) => {
  return Math.ceil(Math.random() * max)
}

let counter = 10
let solution
let ansvers = []

const start = () => {
  $counter.textContent = `${counter}`
  if ($btn.textContent === 'Start') {
    $input.value = 0
    ansvers = []
    counter = 10
    $target.classList.add('hide')
    $ansvers.textContent = '...'
    $text.classList.add('hide')
    $title.classList.remove('hide')
    $maximum.classList.add('hide')
    $sad.classList.add('hide')
    if ($select.value === '1') {
      solution = getRandom(50)
      $counter.textContent = `${counter}`
    }
    if ($select.value === '2') {
      solution = getRandom(100)
      $counter.textContent = `${counter}`
    }
    if ($select.value === '3') {
      solution = getRandom(500)
      $counter.textContent = `${counter}`
    }
    if ($select.value === '4') {
      solution = getRandom(1000)
      $counter.textContent = `${counter}`
    }
    $select.setAttribute('disabled', 'disabled')
    $input.removeAttribute('disabled', 'disabled')
    $btn.textContent = 'Enter'
  } else {
    check()
  }
}

const endGame = () => {
  $btn.textContent = 'Start'
  $input.setAttribute('disabled', 'disabled')
  $select.removeAttribute('disabled', 'disabled')
  $downArrow.classList.add('hide')
  $upArrow.classList.add('hide')
  $text.classList.remove('hide')
  $title.classList.add('hide')
  $maximum.classList.add('hide')
  $prompt.classList.add('hide')

}

const check = () => {
  if ($input.value > solution) {
    counter--
    $downArrow.classList.remove('hide')
    $upArrow.classList.add('hide')
    $target.classList.add('hide')
    $prompt.textContent = 'Слишком много, попробуй поменьше'
    $prompt.classList.remove('hide')
  } else if ($input.value == solution) {
    $target.classList.remove('hide')
    endGame()
    // $title.textContent = `Поздравляю! Ты отгадал число за ${10 - counter + 1} попыток`
    $text.textContent = `Поздравляю! Ты отгадал число с ${10 - counter + 1}го раза`

  } else {
    counter--
    $downArrow.classList.add('hide')
    $upArrow.classList.remove('hide')
    $target.classList.add('hide')
    $prompt.textContent = 'Слишком мало, попробуй побольше'
    $prompt.classList.remove('hide')
  }
  ansvers.push($input.value)
  $ansvers.textContent = ansvers.join(' | ')
  $counter.textContent = `${counter}`
  if (counter === 0) {
    endGame()
    $text.textContent = `Правильный ответ был ${solution}, попробуй ещё раз`
    $sad.classList.remove('hide')
    counter = 10
  }
}

const enter = (event) => {
  if (event.key === 'Enter') {
    check()
  }
}

const selected = () => {
  $text.classList.remove('hide')
  $text.innerText = 'Попробуй за 10 попыток угадать число от 1 до '
  $title.classList.add('hide')
  $maximum.classList.remove('hide')
  $ansvers.textContent = '...'
  if ($select.value == 1) {
    $maximum.textContent = 50
  }
  if ($select.value == 2) {
    $maximum.textContent = 100
  }
  if ($select.value == 3) {
    $maximum.textContent = 500
  }
  if ($select.value == 4) {
    $maximum.textContent = 1000
  }
}

$btn.addEventListener('click', start)
$input.addEventListener('keypress', enter)
$select.addEventListener('change', selected)
