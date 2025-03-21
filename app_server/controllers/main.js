//////////////////////////////
// Main.js (Travlr)
// Anthony Baratti
// SNHU CS-465 FSD I
// Professor T. Butler
//
///////////////////////////////

/* GET Homepage */
const index = (req, res) => {
    res.render('index', {title: "Travlr Getaway"});
};

module.exports = {
    index
}