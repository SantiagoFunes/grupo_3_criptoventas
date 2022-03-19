
const controllers = {
    index:(req, res) => {res.render("products/home")},
    login:(req, res) => {res.render('users/users')},
    register:(req, res) => {res.render('users/register')},
    carrito:(req, res) => {res.render('products/carrito')},
}

module.exports= controllers
