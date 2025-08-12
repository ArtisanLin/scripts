const { Barrelsby } = require('barrelsby/bin/index.js')
const fs = require('fs')
const path = require('path')


const directories = fs.readdirSync(path.join(__dirname, '..', 'packages'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

directories.forEach((directory) => deleteFilesAndRunBarrelsby(
  {
    directory: [`packages/${directory}/src`],
    exclude: ['.*\\.d\\.ts$'],
    noSemicolon: true,
    singleQuotes: true,
    noHeader: true,
    name: 'index.ts',
  },
));

function sortImports(imports, importOrder) {
  importOrder.push('.*')
  const regexOrder = importOrder.map((pattern) => new RegExp(pattern))
  return imports.sort((a, b) => {
    const aIndex = regexOrder.findIndex((regex) => regex.test(a))
    const bIndex = regexOrder.findIndex((regex) => regex.test(b))
    return aIndex - bIndex
  })
}

function deleteFilesAndRunBarrelsby(options, importOrder, additionalContent) {
  let filePath

  options.directory
    .map((dir) => path.resolve(process.cwd(), dir, options.name))
    .forEach((fPath) => {
      if (!filePath) filePath = fPath
      try {
        fs.unlinkSync(fPath)
      } catch (e) { }
    })

  Barrelsby(options)

  if (importOrder) {
    const imports = fs.readFileSync(filePath, 'utf8')
    const sortedImports = sortImports(imports.split('\n'), importOrder)
    fs.writeFileSync(filePath, sortedImports.join('\n'), 'utf8')
  }

  if (additionalContent) {
    fs.appendFileSync(filePath, additionalContent, 'utf8')
  }
}
