const readline = require('node:readline/promises')

function ticketPrice(category) {
    switch(category) {
        case 1:
            return 300
        case 2:
            return 500
        case 3:
            return 900
        default:
            return 0
    }
}

function maxTickets(budget, price) {
    let ticketCount = 0
    while (budget - price >= 0) {
        budget -= price
        ticketCount += 1
    }
    return ticketCount
}

function printTicketResult(category, budget) {
    if (ticketPrice(category) === 0) {
        console.log('неизвестная категория')
    }   else {
        console.log(`Категория ${category}, билет ${ticketPrice(category)} руб., \
бюджет ${budget} руб.: можно купить ${maxTickets(budget, ticketPrice(category))} шт.`)
    }
}

function deliveryPrice(distance, total) {
    if (total >= 3000) {
        return 0
    }   else if (distance <= 3) {
        return 0
    }   else if (distance > 10) {
        return 200 + (distance - 10) * 25
    }   else if (distance >= 4) {
        return 200
    }
}

function printDelivery(distance, total) {
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: \
доставка ${deliveryPrice(distance, total)} руб.`)
}

function printSteps(height) {
    let stepCount = 0
    for (let step = 1; step <= height; step++) {
        if (step === 4) {
            continue
        }   else if (step === 10) {
            console.log(`Ступень ${step}`)
            console.log(`Дальше лестница не построена`)
            stepCount += 1
            break
        }   else {
            console.log(`Ступень ${step}`)
        }
        stepCount += 1
    }
    console.log(`Всего построено: ${stepCount}`)
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log('Выберете задачу:')
  console.log('1 – билетная касса')
  console.log('2 – доставка заказа')
  console.log('3 – лестница')

  const action = Number(await rl.question('Ваш выбор: '))

  switch (action) {
    case 1: {
      const category = Number(await rl.question('Категория билета: '))
      const budget = Number(await rl.question('Бюджет: '))
      printTicketResult(category, budget)
      break
    }
    case 2: {
      const distance = Number(await rl.question('Расстояние: '))
      const total = Number(await rl.question('Сумма заказа: '))
      printDelivery(distance, total)
      break
    }
    case 3: {
      const height = Number(await rl.question('Высота лестницы: '))
      printSteps(height)
      break
    }
    default:
      console.log('такой задачи нет')
  }

  rl.close()
}

main()