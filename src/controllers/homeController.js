const path = require('path')

const controllers = {
    index:(req, res) => {res.render(path.resolve("./views/products/home"))},
    login:(req, res) => {res.render(path.resolve('./views/users/login'))},
    register:(req, res) => {res.render(path.resolve('./views/users/register'))},
    carrito:(req, res) => {res.render(path.resolve('./views/products/carrito'))},
}

module.exports= controllers