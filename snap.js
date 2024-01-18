const fs = require('fs')
const path = require('path')
const imageVerstion ='v2'
console.log('i am snap')

//brand names
// fs.readdir(`${process.cwd()}/public/brand-images`, (err, files) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     const textFileNames = files.filter(file => path.extname(file) === '.txt').map(filename => { return { tag: path.basename(filename, path.extname(filename)) } })

//     console.log(textFileNames);
//     fs.writeFileSync(`${process.cwd()}/public/brandNames.json`, JSON.stringify(textFileNames))
// });



fs.readdir(`${process.cwd()}/public/brand-images-${imageVerstion}`, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const textFileNames = files.filter(file => path.extname(file) === '.txt' && !file.includes('1.txt')).map(filename => { return { tag: path.basename(filename, path.extname(filename)) } })

    console.log(textFileNames);

    for (let f of textFileNames) {
        debugger
        const { tag } = f

        const fileapath = `${process.cwd()}/public/brand-images-${imageVerstion}/${tag}1.txt`
        if (fs.existsSync(fileapath)) {
            debugger
            const rawData = fs.readFileSync(fileapath, 'utf-8').replaceAll('\n', ' ')
            f['description'] = rawData.split('---')[1]
            f['title'] = rawData.split('---')[0]
            debugger
        } else {
            f['description'] = 'Empty'
            f['title'] = 'Empty'
        }
        const fileapathUrl = `${process.cwd()}/public/brand-images-${imageVerstion}/${tag}.txt`

        if (fs.existsSync(fileapathUrl)) {
            debugger
            const rawData = fs.readFileSync(fileapathUrl, 'utf-8').split('\n')
            f['href'] = rawData[0].replaceAll('\r','')
            f['keywords'] = rawData[1] && rawData[1].replaceAll('\r','')
            f['tagwords']=rawData[2] && rawData[2].replaceAll('\r','')


        } else {
            f['href'] = ''
            f['keywords'] = ''
            f['tagwords']=''
        }

    }

    fs.writeFileSync(`${process.cwd()}/public/brandNames.json`, JSON.stringify(textFileNames))
});
