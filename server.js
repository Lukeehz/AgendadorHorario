const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const flash = require("express-flash");
const app = express();

const login = require("./Src/routers/AuthRouter.js")
const Agenda = require("./Src/routers/agendaRouter.js")

const conn = require("./Src/db/conn.js");

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new fileStore({
            logFn: function () {},
            path: require("path").join(require("os").tmpdir(), "sessions"),
        }),
    })
);

app.use(flash());

app.use("/",login)
app.use("/",Agenda)

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

conn
//.sync({force: false})
.sync()
.then(()=>{
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
})