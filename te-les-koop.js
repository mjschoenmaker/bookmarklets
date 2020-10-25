frameTarget = frames[2].document

// alle tabel rijen langslopen en 'soort' als classname toevoegen en tevens als
// select options registreren.
options = ['alles'];
frameTarget.querySelectorAll('table.overview tr').forEach(
  (row) => {
    tds = row.querySelectorAll('td')
    if (tds.length) {
      type = tds[0].innerHTML
      row.classList.add(type)
      // als nog niet bekend, opnemen als select option
      if (options.indexOf(type) === -1) options.push(type)
    }
  }
)

// form injecteren dat keuze mogelijk maakt op basis van soort
form = frameTarget.createElement('form')
if (options.length) {
  select = frameTarget.createElement('select');
  select.id = 'selectType'

  options.forEach((type) => {
    option = frameTarget.createElement('option')
    option.value = type
    option.text = type
    select.appendChild(option)
  })
}
// span toevoegen voor het tonen van de aantallen
span = frameTarget.createElement('span')
frameTarget.querySelector('table p').appendChild(span)


form.appendChild(select)
frameTarget.body.insertBefore(form, frameTarget.body.firstChild)

// event listener
frameTarget.querySelector('#selectType').addEventListener('change', function() {
  filterByType(this.value, options)
})

function filterByType(type, options) {
  selectors = options.map((type) => { return '.'+type }).toString()
  allRows = frameTarget.querySelectorAll(selectors)
  selectedRows = frameTarget.querySelectorAll('.'+type)
  counterSpan = frameTarget.querySelector('table p span')

  if (type === 'alles') {
    // alle opties tonen
    allRows.forEach((tr) => { tr.style.display = 'table-row' })
    counterSpan.innerHTML = ''
    zebra(allRows)
  } else {
    // alle opties verbergen
    allRows.forEach((tr) => { tr.style.display = 'none' })
    // geselecteerde optie tonen
    selectedRows.forEach((tr) => { tr.style.display = 'table-row' })
    // telling bijwerken
    counterSpan.innerHTML = '(waarvan '+ selectedRows.length +' getoond)'
    zebra(selectedRows)
  }
}

function zebra(rows) {
  colors = ['#000000','#181818']
  rows.forEach((row, index) => {
    if (index%2 == 0) {
      row.style.backgroundColor = colors[0]
    } else {
      row.style.backgroundColor = colors[1]
    }
  })
}
