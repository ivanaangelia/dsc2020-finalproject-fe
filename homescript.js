var request = new XMLHttpRequest()
request.open('GET', 'https://indonesia-covid-19.mathdro.id/api/', true)
request.onload = function(){
    loader()
    var data = JSON.parse(this.response)

    const jumlahKasus = document.getElementById('jumlahKasus')
    jumlahKasus.textContent = data.jumlahKasus

    const perawatan = document.getElementById('perawatan')
    perawatan.textContent = data.perawatan

    const sembuh = document.getElementById('sembuh')
    sembuh.textContent = data.sembuh

    const meninggal = document.getElementById('meninggal')
    meninggal.textContent = data.meninggal
}

request.send()

function loader(){
    const loader = document.getElementById('loader')
    const content = document.getElementById('content')
    
    loader.setAttribute('style', 'display: none')
    content.setAttribute('style', 'display: block')
}