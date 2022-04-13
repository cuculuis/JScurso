class Frutas {
    constructor(nombre, precio) {
        this.name = nombre.toUpperCase()
        this.precio = parseFloat(precio)
        this.vendido = false
    }

    AniadirIVA() {
        this.precio = this.precio * 1.21
    }
}

const productos = []

productos.push(new Frutas(prompt("Ingrese producto"), parseInt(prompt("Ingrese precio"))))
productos.push(new Frutas(prompt("Ingrese producto"), parseInt(prompt("Ingrese precio"))))
productos.push(new Frutas(prompt("Ingrese producto"), parseInt(prompt("Ingrese precio"))))
productos.push(new Frutas(prompt("Ingrese producto"), parseInt(prompt("Ingrese precio"))))

for(const fruits of productos) fruits.AniadirIVA()

console.log(productos)