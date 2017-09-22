const request = require('superagent')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const phantom = require('phantom')

const agent = request.agent()
const WX_DOC = 'http://mp.weixin.qq.com/debug/wxadoc/dev/api/'
const ANT_DOC = 'http://docs.alipay.com/mini/'

const argv = require('yargs')
  .command('ant', 'Get Ant Doc', (yargs) => {
    yargs.option('outPath', {
      describe: 'outPath for Ant Doc',
      default: path.resolve(__dirname, '../src/antdata.json'),
    })
  }, (argv) => {
    getAntDoc(argv.outPath)
  })
  .command('wx', 'Get WX Doc', (yargs) => {
    yargs.option('outPath', {
      describe: 'outPath for WX Doc',
      default: path.resolve(__dirname, '../src/wxdata.json'),
    })
  }, (args) => {
    getWXDoc(args.outPath)
  })
  .argv

let phInstance

function getAntDocBySuffix(suffix) {
  return new Promise((resolve, reject) => {
    agent.get(ANT_DOC + suffix)
    .end((err, res) => {
      if (err) throw err

      const $ = cheerio.load(res.text);
      const section = $('div.markdown')
      let sigleDoc = {}
      section
        .find('h2')
        .filter((i, node) => $(node).text().substring(1, 4) === 'my.')
        .each((i, node) => {
        const params = {};
        $($(node).nextUntil('h2', '.bi-table')[0])
          .children('table')
          .add($(node).nextUntil('h2', 'table')[0])
          .find('tr')
          .slice(1)
          .each((i, node) => {
            node = $(node)
            const tds = node.children()
            params[$(tds[0]).text()] = {
              type: $(tds[1]).text(),
              desc: $(tds[3]).text(),
            }
          })
        sigleDoc = Object.assign(sigleDoc, {
          [$(node).text().substring(1)]: {
            desc: $(node).next().text(),
            params: params,
            }
          })
      })
      resolve(sigleDoc);
    })
  })
}


function getWXDocBySuffix(suffix) {
  return new Promise((resolve, reject) => {
    agent.get(WX_DOC + suffix)
    .end((err, res) => {
      const $ = cheerio.load(res.text);
      const section = $('section.normal.markdown-section')
      let sigleDoc = {}
      section.find('h3')
      .filter((i, node) => $(node).text().substring(0, 3) === 'wx.')
      .each((i, node) => {
        const params = {}
        $($(node)
          .nextUntil('h3', 'table')[0])
          .find('tr')
          .slice(1)
          .each((i, node) => {
            node = $(node)
            tds = node.children()
            params[$(tds[0]).text()] =  {
              type: $(tds[1]).text(),
              desc: $(tds[3]).text() || $(tds[2]).text(),
            }
          })
        sigleDoc = Object.assign(sigleDoc, {
          [$(node).text().substring(0, $(node).text().indexOf('('))]: {
            desc: $($(node).nextAll('p')[0]).text(),
            params: params,
          },
        })
      })
      resolve(sigleDoc);
    })
  })
}

function getWXDoc(outPath) {
  agent
    .get('https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      let  list = $('li.chapter')
        .children('a')
        .map((i, node) => {
          const url = $(node).attr('href')
          return url.slice(0, url.indexOf('#') === -1 ? url.length :url.indexOf('#'))
        })
        .get()
      const set = new Set(list)
      list = Array.from(set)
      Promise.all(list.map(item => getWXDocBySuffix(item)))
        .then(docs => {
          const data = {}
          docs.forEach(doc => {
            Object.keys(doc).forEach(k => {
              data[k] = doc[k]
            })
          })
          fs.writeFile(outPath, JSON.stringify(data, null, '  '), 'utf8', () => {
            getAntDoc()
          })
        })
    })
}

function getAntDoc(outPath) {
  phantom
    .create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
      return page.open('https://docs.alipay.com/mini/developer/getting-started').then(() => page);
    })
    .then(page => {
      return page.property('content')
    })
    .then(content => {
      const $ = cheerio.load(content)
      const list = $('a[href="api/"]')
        .parent()
        .nextUntil('.menu-item-1')
        .filter((i, node) => $(node).children('a').length > 0)
        .map((i, node) => $(node).children('a').attr('href'))
        .get()
      phInstance.exit()

      Promise.all(list.map((item) => getAntDocBySuffix(item)))
        .then(docs => {
          const data = {}
          docs.map(doc => {
            Object.keys(doc)
              .map(k => {
                data[k] = doc[k]
              })
          })
          fs.writeFile(outPath, JSON.stringify(data, null, '  '), 'utf8')
        })
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });
}
