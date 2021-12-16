
const controllers = {
    index:(req, res) => {res.render("products/home")},
    login:(req, res) => {res.render('users/login')},
    register:(req, res) => {res.render('users/register')},
    carrito:(req, res) => {res.render('products/carrito')},
}

module.exports= controllers
