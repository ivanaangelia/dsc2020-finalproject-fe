const root = document.getElementById('root')
const container = document.createElement('div')
container.setAttribute('class', 'container')
root.appendChild(container)

var counter = 0
var request = new XMLHttpRequest()
var semuaData = []
request.open('GET', 'https://indonesia-covid-19.mathdro.id/api/provinsi', true)
request.onload = function () {
    loader()

    var data = JSON.parse(this.response)

    data.data.forEach((kasus) => {
        if (kasus.provinsi != 'Indonesia') {
            const card = document.createElement('div')
            card.setAttribute('class', 'card card-province')
            const title = document.createElement('h3')
            title.textContent = '#' + (counter + 1) + '\t' + kasus.provinsi
            const kasusPosi = document.createElement('p')
            kasusPosi.textContent = kasus.kasusPosi + '\t' + 'Positive'
            const kasusSemb = document.createElement('p')
            kasusSemb.textContent = kasus.kasusSemb + '\t' + 'Recovered'
            const kasusMeni = document.createElement('p')
            kasusMeni.textContent = kasus.kasusMeni + '\t' + 'Death'

            semuaData.push({ title: kasus.provinsi, positive: kasus.kasusPosi, recovered: kasus.kasusSemb, death: kasus.kasusMeni })

            container.appendChild(card)
            card.appendChild(title)
            card.appendChild(kasusPosi)
            card.appendChild(kasusSemb)
            card.appendChild(kasusMeni)

            counter += 1
        }
    })
}
request.send()

const newContainer = document.createElement('div')
newContainer.setAttribute('class', 'newContainer')
root.appendChild(newContainer)

const searchInput = document.getElementById('search-input')
searchInput.addEventListener('keyup', () => {
    const inputValue = searchInput.value.toUpperCase()

    if (inputValue == '') {
        document.getElementsByClassName('container')[0].setAttribute('style', 'display: flex')
        document.getElementsByClassName('newContainer')[0].setAttribute('style', 'display: none')
    } else {
        newContainer.innerHTML = ''
        counter = 0
        document.getElementsByClassName('container')[0].setAttribute('style', 'display: none')
        document.getElementsByClassName('newContainer')[0].setAttribute('style', 'display: flex')

        semuaData.forEach((data) => {
            if (data.title.toUpperCase().includes(inputValue)) {
                const card = document.createElement('div')
                card.setAttribute('class', 'card card-province')
                const title = document.createElement('h3')
                title.textContent = '#' + (counter + 1) + '\t' + data.title
                const kasusPosi = document.createElement('p')
                kasusPosi.textContent = data.positive + '\t' + 'Positive'
                const kasusSemb = document.createElement('p')
                kasusSemb.textContent = data.recovered + '\t' + 'Recovered'
                const kasusMeni = document.createElement('p')
                kasusMeni.textContent = data.death + '\t' + 'Death'

                newContainer.appendChild(card)
                card.appendChild(title)
                card.appendChild(kasusPosi)
                card.appendChild(kasusSemb)
                card.appendChild(kasusMeni)

                counter += 1
            }
        })
        if (counter == 0) {
            const warning = document.createElement('p')
            warning.textContent = 'No Data Available'
            newContainer.appendChild(warning)
        }
    }
})

function loader() {
    const loader = document.getElementById('loader')
    const content = document.getElementById('content')

    loader.setAttribute('style', 'display: none')
    content.setAttribute('style', 'display: flex')
}