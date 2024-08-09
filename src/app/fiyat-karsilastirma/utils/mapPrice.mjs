function mapPrice(price) {


    try {
        let trimPrice = price ? price.toString().replace('TL', '')
            .replace('₺', '')
            .replace('$', '')
            .replace('\n', '')
            .trim() : 0//.replace(/[a-z]/gi, '') 
        if (price?.includes('$')) {
            return parsePrice(trimPrice) * 33.50
        } else {
            return parsePrice(trimPrice)
        }

    } catch (error) {
        debugger

        throw error
    }

}

export default mapPrice


function parsePrice(trimPrice) {
    switch (true) {

        case /^\d\d\d[,]\d\d$/.test(trimPrice)://299,99

            return parseFloat(trimPrice.replace(',', '.'))
        case /^\d\d\d[,]\d$/.test(trimPrice)://299,9

            return parseFloat(trimPrice.replace(',', '.'))
        case /^\d\d\d[.]\d$/.test(trimPrice)://299.9
            return parseFloat(trimPrice)
        case /^\d\d\d[.]\d\d$/.test(trimPrice)://299.99

            return parseFloat(trimPrice)
        case /^\d\d\d\d[.]\d\d$/.test(trimPrice)://1499.99

            return parseFloat(trimPrice)
        case /^\d\d\d\d[.]\d$/.test(trimPrice)://1499.9
            return parseFloat(trimPrice)
        case /^\d\d\d\d[,]\d$/.test(trimPrice)://1499,9
            return parseFloat(trimPrice.replace(',', '.'))
        case /^\d\d\d\d[,]\d\d$/.test(trimPrice)://1499,99

            return parseFloat(trimPrice.replace(',', '.'))
        case /^\d[.]\d\d\d[,]\d\d$/.test(trimPrice)://1.449,90
            return parseFloat(trimPrice.replace('.', '').replace(',', '.'))

        case /^\d[.]\d\d\d$/.test(trimPrice)://1.449

            return parseFloat(trimPrice.replace('.', ''))
        case /^\d\d\d\d$/.test(trimPrice)://4299

            return parseFloat(trimPrice)
        case /^\d[,]\d\d\d[.]\d\d$/.test(trimPrice)://3,950.00

            return parseFloat(trimPrice.replace(',', ''))
        case /^\d\d[,]\d\d\d[.]\d\d$/.test(trimPrice)://34,950.00
            return parseFloat(trimPrice.replace(',', ''))
        case /^\d\d\d$/.test(trimPrice)://999

            return parseFloat(trimPrice)
        case /^\d\d[,]\d\d$/.test(trimPrice)://81,00

            return parseFloat(trimPrice.replace(',', '.'))
        case /^\d\d[.]\d\d$/.test(trimPrice)://81.00

            return parseFloat(trimPrice)
        case /^\d\d[.]\d$/.test(trimPrice)://99.9

            return parseFloat(trimPrice)


        case /^\d\d[,]\d$/.test(trimPrice)://99,9

            return parseFloat(trimPrice.replace(',', '.'))

        case /^\d\d$/.test(trimPrice)://99

            return parseFloat(trimPrice)
        case /^\d\d[.]\d\d\d[,]\d\d$/.test(trimPrice)://14.918,00

            return parseFloat(trimPrice.replace('.', '').replace(',', '.'))
        case /^\d\d\d\d\d$/.test(trimPrice)://11499

            return parseFloat(trimPrice)
        case /^\d\d[.]\d\d\d$/.test(trimPrice)://14.918

            return parseFloat(trimPrice.replace('.', ''))
        case /^\d\d[,]\d\d\d$/.test(trimPrice)://14,918

            return parseFloat(trimPrice.replace(',', ''))
        default:

            return parseFloat(0)
    }

}