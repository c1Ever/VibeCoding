const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

const eventTitle = document.querySelector('#event-title')
const date = document.querySelector('#date')
const place = document.querySelector('#place')
const description = document.querySelector('#description')
const form = document.querySelector('#service-form')
const showButton = document.querySelector('#show-program')
const message = document.querySelector('#program')
const choiceError = document.querySelector('#choice-error')
const dataError = document.querySelector('#data-error')
const result = document.querySelector('#result')
const reportJson = document.querySelector('#report-json')

message.hidden = true
form.hidden = true
choiceError.hidden = true
dataError.hidden = true
result.hidden = true
reportJson.hidden = true

try {

    const data = JSON.parse(sourceJson)
        
    form.hidden = false
    showButton.hidden = false

    eventTitle.textContent = data.event.title
    date.textContent = data.event.date
    place.textContent = data.event.place
    description.textContent = data.event.description
        
    function buildReport(services, guideChecked, audioChecked, catalogChecked) {
        const check = {
            guide: guideChecked,
            audio: audioChecked,
            catalog: catalogChecked
        } 
        const filteredServices = services.filter((service) => check[service.id])

        const items = filteredServices.map(( {title, price} ) => ({
            title: title.trim(),
            price: price,
        }))

        const count = items.length

        const total = items.reduce((total, service) => total + service.price, 0)

        return {count: count, total: total, items: items}
    }

    function submitOptions(event) {
        event.preventDefault()

        result.hidden = false
        reportJson.hidden = false
        choiceError.hidden = true
        
        const guideChecked = document.querySelector('#guide').checked
        const audioChecked = document.querySelector('#audio').checked
        const catalogChecked = document.querySelector('#catalog').checked

        if (!(guideChecked || audioChecked || catalogChecked)) {
            choiceError.textContent = 'Выберите хотя бы одну услугу.'
            choiceError.hidden = false
            result.hidden = true
            reportJson.hidden = true
        }

        const report = buildReport(data.services, guideChecked, audioChecked, catalogChecked)
        
        const lines = [
        `Выбрано услуг: ${report.count}`,
        `Итого: ${report.total} руб.`,
        ]
        
        report.items.forEach(({ title }) => {
            lines.push(title)
        })

        result.innerHTML = lines.join('<br>')
        
        reportJson.innerHTML = JSON.stringify(result.innerHTML)
        
        try {
            const reportJsonTry = JSON.parse(reportJson)
        }   catch {
            console.log('Ошибка в строке отчёта')
        }
    }

    form.addEventListener('submit', submitOptions)

    function showProgram() {
        message.innerHTML = data.event.meeting
        message.hidden = !message.hidden
    }
    
    showButton.addEventListener('click', showProgram)

} catch (error) {
    dataError.textContent = 'Ошибка данных.'
    dataError.hidden = false
    form.hidden = true
    showButton.hidden = true
}



