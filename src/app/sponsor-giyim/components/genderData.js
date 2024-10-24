// Sort data by index
const data = [
    { gender: 'Kadın', urlGender: 'kadın', index: 0, url: '/sponsor-giyim/kadın/', imageSrc: '/gender/kadin.jpg' },
    { gender: 'Erkek', urlGender: 'erkek', index: 2, url: '/sponsor-giyim/erkek/', imageSrc: '/gender/erkek.jpg' },
    { gender: 'Kız Çocuk', urlGender: 'kız-çocuk', index: 3, url: '/sponsor-giyim/kız-çocuk/', imageSrc: '/gender/kiz-cocuk.jpg' },
    { gender: 'Erkek Bebek', urlGender: 'erkek-bebek', index: 4, url: '/sponsor-giyim/erkek-bebek/', imageSrc: '/gender/erkek-bebek.jpg' },
    { gender: 'Kız Bebek', urlGender: 'kız-bebek', index: 5, url: '/sponsor-giyim/kız-bebek/', imageSrc: '/gender/kiz-bebek.jpg' },
    { gender: 'Genç', urlGender: 'genc', index: 6, url: '/sponsor-giyim/genc/', imageSrc: '/gender/genc.jpg' },
    { gender: 'Unisex', urlGender: 'unisex', index: 1, url: '/sponsor-giyim/unisex/', imageSrc: '/gender/unisex.jpg' },
    { gender: 'Unrelated', urlGender: 'unrelated', index: 8, url: '/sponsor-giyim/unrelated/', imageSrc: '/gender/unrelated.jpg' },
].sort((a, b) => a.index - b.index);

export default data