let counter = 3;
const kriks = [
  {
    key: 3,
    time: new Date(2018, 2, 2, 22, 15),
    name: 'Bapak Presiden Wkwkwk Land',
    username: 'potwl',
    avatar: 'https://api.adorable.io/avatars/100/asdasd.png',
    krik: 'Wwkwkwkwkwkwk Wkwkwkwkw Wkwkwk\nWkwkwkwk Wkwkwkwk Wkwkwk',
    like: 9999,
    liked: true,
  },
  {
    key: 2,
    time: new Date(2018, 2, 2, 21, 12),
    name: 'Orang Biasa',
    username: 'hanyaorangbiasa',
    avatar: 'https://api.adorable.io/avatars/100/ob.png',
    krik: 'Halo halo hanya numpang lewat',
    like: 1,
    liked: true,
  },
  {
    key: 1,
    time: new Date(2018, 2, 2, 21, 10),
    name: 'Krik Master',
    username: 'krikmaster2000',
    avatar: 'https://api.adorable.io/avatars/100/km.png',
    krik: 'Test 123 Test 456 Wowowowo!!!',
    like: 123,
    liked: false,
  },
];

function addKrik(krik) {
  // tambah krik nya di array plg depan biar diatas
  kriks.unshift({
    key: ++counter,
    ...krik,
  });
}

export {
  addKrik, kriks 
};
