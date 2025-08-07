const exphbs = require("express-handlebars");

const hbs = exphbs.create({
  defaultLayout: "main",
  helpers: {
    eq: (a, b) => a === b,
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
