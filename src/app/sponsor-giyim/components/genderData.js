// Sort data by index
const data = [
    { gender: 'Kadın', urlGender: 'kadın', index: 0, url: '/sponsor-giyim/kadın/', imageSrc: '/gender/kadin.jpg', show: true },
    { gender: 'Erkek', urlGender: 'erkek', index: 1, url: '/sponsor-giyim/erkek/', imageSrc: '/gender/erkek.jpg', show: true },
    { gender: 'Kız Çocuk', urlGender: 'kız-çocuk', index: 2, url: '/sponsor-giyim/kız-çocuk/', imageSrc: '/gender/kiz-cocuk.jpg', show: false },
    { gender: 'Erkek Çocuk', urlGender: 'erkek-çocuk', index: 3, url: '/sponsor-giyim/erkek-çocuk/', imageSrc: '/gender/erkek-cocuk.jpg', show: false },
    { gender: 'Kız Bebek', urlGender: 'kız-bebek', index: 4, url: '/sponsor-giyim/kız-bebek/', imageSrc: '/gender/kiz-bebek.jpg', show: false },
    { gender: 'Erkek Bebek', urlGender: 'erkek-bebek', index: 5, url: '/sponsor-giyim/erkek-bebek/', imageSrc: '/gender/erkek-bebek.jpg', show: false },
    { gender: 'Genç', urlGender: 'genç', index: 6, url: '/sponsor-giyim/genç/', imageSrc: '/gender/genc.jpg', show: false },
    { gender: 'Bebek', urlGender: 'bebek', index: 7, url: '/sponsor-giyim/bebek/', imageSrc: '/gender/bebek.jpg', show: false },
    { gender: 'Çocuk', urlGender: 'çocuk', index: 8, url: '/sponsor-giyim/çocuk/', imageSrc: '/gender/cocuk.jpg', show: false },
    { gender: 'Unisex', urlGender: 'unisex', index: 9, url: '/sponsor-giyim/unisex/', imageSrc: '/gender/unisex.jpg', show: false },
    { gender: 'Unrelated', urlGender: 'unrelated', index: 10, url: '/sponsor-giyim/unrelated/', imageSrc: '/gender/unrelated.jpg', show: false },
].sort((a, b) => a.index - b.index);

export default data