// curl http://192.168.0.100:50505/april.xml > ./april.xml
// node index.js ./april.xml > ~/Desktop/april.csv
// import into anki...

const fs = require('fs')
const parseString = require('xml2js').parseString

const location = process.argv[2]
const xml = fs.readFileSync(location, 'utf8')

parseString(xml, (err, result) => {
  console.log(err)
  let csv = ''
  result.plecoflash.cards[0].card.forEach(element => {
    const headwords = element.entry[0].headword.reduce((acc, cur) => {
      if (acc === '') { return acc + cur._ + ' / ' }
      return acc + cur._
    }, '')

    const pron = element.entry[0].pron[0]._
    const defn = element.entry[0].defn[0].replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/,/g, '')
    const entry = headwords + ',' + pron + '<br><br>' + defn

    csv += entry + '\n'
  })
  console.log(csv)
})
