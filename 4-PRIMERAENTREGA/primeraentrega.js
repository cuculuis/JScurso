const arr = [2, 5, 4, 45, 32, 46, 78, 87, 98, 56, 23, 12];
    const chooseRandom = (arr, num = 1) => {
        const res = [];
        for(let i = 0; i < num; ){
          const random = Math.floor(Math.random() * arr.length);
            if(res.indexOf(arr[random]) !== -1){
                continue;
            };
            res.push(arr[random]);
            i++;
        };
        return res;
    };
    console.log(chooseRandom(arr, 4));

// class Liquor {
//     constructor(name, price) {
//         this.name = name.toUpperCase()
//         this.price = parseFloat(price)
//         this.sold = false
//     }

//     addIVA() {
//         this.price = this.price * 1.21
//     }
// }

// const productos = []

// productos.push(new Liquor('ron', 120))
// productos.push(new Liquor('whiskey', 100))
// productos.push(new Liquor('fernet', 80))

// for(const product of productos) product.addIVA()

// console.log(productos)