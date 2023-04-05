/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/template.js":
/*!****************************!*\
  !*** ./client/template.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\n\nexports[\"default\"] = () => {\n    /*Default */\n    return `\n        <!DOCTYPE html>\n        <html>\n            <head>\n                <meta charset=\"utf-8\"/>\n                <meta name=\"viewport\" content=\"initial-scale=1, width=device-width\" />\n                <title>Mern Voterex</title>\n                <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:100,300,400\">\n                <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"/>\n            </head>\n            <body>\n                <div id=\"app\"></div>\n                <script type=\"text/javascript\" src=\"/dist/bundle.js\"></script>\n            </body>\n        </html>\n    `;\n};\n\n//# sourceURL=webpack://mern-voterecs/./client/template.js?");

/***/ }),

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nconst config = {\n    env: \"development\" || 0,\n    port: process.env.PORT || 3000,\n    mongoUri: process.env.MONGODB_URI,\n    jwtSecret: process.env.JWT_SECRET || 'myS-e$cre#t20%k_ey$'\n};\n\nexports[\"default\"] = config;\n\n//# sourceURL=webpack://mern-voterecs/./config/config.js?");

/***/ }),

/***/ "./databases/dbConnection.js":
/*!***********************************!*\
  !*** ./databases/dbConnection.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports[\"default\"] = async () => {\n    try {\n        // mongoose.set(\"strictQuery\",true);\n        const conn = await _mongoose2.default.connect(process.env.MONGODB_URI, {\n            useUnifiedTopology: true,\n            // useNewUrlParser: true,\n            // useFindAndModify: false,\n            useNewUrlParser: true\n        });\n        console.log(`Connection on ${conn.connection.host} has been made.`);\n    } catch (error) {\n        console.log(`The database has not been connected. with error ${error}`);\n    }\n};\n\n//# sourceURL=webpack://mern-voterecs/./databases/dbConnection.js?");

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports.hasAuthorization = exports.requireSignIn = exports.signOut = exports.signIn = undefined;\n\nvar _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar _expressJwt = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n\nvar _user = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _config = __webpack_require__(/*! ../../config/config */ \"./config/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst signIn = exports.signIn = async (req, res) => {\n    //user must sign in to access app functionalities\n    try {\n        let user = await _user2.default.findOne({ 'email': req.body.email });\n        if (!user) return res.status('401').json({ 'error': 'User not found!' });\n        if (!user.authenticate(req.body.password)) {\n            return res.status('401').json({\n                'error': 'Email and Password don\\'t match'\n            });\n        }\n        // create and set token to the cookie\n        const token = _jsonwebtoken.jwt.sign({ _id: user._id }, _config2.default.jwtSecret);\n        res.cookie('t', token, { expire: new Date() + 9999 });\n\n        return res.status(201).json({\n            token,\n            user: {\n                _id: user._id,\n                name: user.name,\n                email: user.email\n            }\n        });\n    } catch (error) {\n        return res.status(401).json({\n            error: `Could\\'t sign in! due to ${error}`\n        });\n    }\n};\n\nconst signOut = exports.signOut = (req, res) => {\n    // log the user out of the system\n    res.clearCookie(\"t\");\n    return res.status(200).json({ message: 'Signed Out!' });\n};\n\nconst requireSignIn = exports.requireSignIn = (0, _expressJwt.expressjwt)({\n    secret: _config2.default.jwtSecret,\n    userProperty: 'auth',\n    algorithms: ['sha1', 'RS256', 'HS256']\n});\n\nconst hasAuthorization = exports.hasAuthorization = (req, res, next) => {\n    // restrict the users who only has authorization permission\n    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;\n    if (!authorized) {\n        return res.status(403).json({ error: 'User Not Authorized!' });\n    }\n    next();\n};\n\n//# sourceURL=webpack://mern-voterecs/./server/controllers/auth.controller.js?");

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports.findById = exports.readUser = exports.removeUser = exports.updateUser = exports.listUsers = exports.createUser = undefined;\n\nvar _lodash = __webpack_require__(/*! lodash */ \"lodash\");\n\nvar _user = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nvar _bcrypt2 = _interopRequireDefault(_bcrypt);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst createUser = exports.createUser = async (req, res) => {\n    // create new user \n    const { email, hashed_password } = new _user2.default(req.body);\n\n    const emailExist = new Promise((resolve, reject) => {\n        _user2.default.findOne({ email }, function (err, email) {\n            if (err) reject(new Error(err));\n            if (email) reject({ \"error\": 'Email already exist!' });\n            resolve();\n        });\n    });\n\n    const passwordLong = new Promise((resolve, reject) => {\n        if (hashed_password.length < 6) reject({ 'Error': \"password must be more than 5 characters\" });\n        resolve();\n    });\n\n    Promise.all([emailExist, passwordLong]).then(() => {\n        if (hashed_password) {\n            _bcrypt2.default.hash(hashed_password, 10).then(hashedPassword => {\n                const user = new _user2.default(req.body);\n                user.hashed_password = hashedPassword;\n                // save and return user\n                user.save().then(results => res.status(201).json({ 'message': 'Sign up successful' })).catch(error => res.status(500).json({ error: 'unable to save user' }));\n            });\n        } else {\n            return res.status(402).json({ error: 'No Password Entered!.' });\n        }\n    }).catch(err => {\n        return res.status(500).send({\n            err: \"Unable to hash password\"\n        });\n    });\n};\n\nconst listUsers = exports.listUsers = async (req, res) => {\n    // list all users\n    try {\n        const users = await _user2.default.find().select('name email updated createdAt');\n        return res.status(200).json(users);\n    } catch (error) {\n        return res.status(400).json(error);\n    }\n};\n\nconst updateUser = exports.updateUser = async (req, res) => {\n    // update user of a particular ID\n    try {\n        const user = req.profile;\n        user = (0, _lodash.extend)(user, req.body);\n        user.updated = Date.now();\n        await user.save();\n        user.hashed_password = undefined;\n        user.salt = undefined;\n        return res.status(201).json(user);\n    } catch (error) {\n        return res.status(400).json(error);\n    }\n};\n\nconst removeUser = exports.removeUser = async (req, res) => {\n    // remove a user of a particular id\n    try {\n        let user = req.profile;\n        let deletedUser = await user.remove();\n        deletedUser.hashed_password = undefined;\n        deletedUser.salt = undefined;\n        return res.status(200).json(deletedUser);\n    } catch (error) {\n        return res.status(400).json(error);\n    }\n};\n\nconst readUser = exports.readUser = (req, res) => {\n    // read data of the particular id\n    try {\n        req.profile.hashed_password = undefined;\n        req.profile.salt = undefined;\n        return res.status(200).json(req.profile);\n    } catch (error) {\n        return res.status(400).json(error);\n    }\n};\n\nconst findById = exports.findById = async (req, res, next, id) => {\n    // find a user by id\n    try {\n        let user = await _user2.default.findById(id);\n        if (!user) return res.status(400).json({ 'message': 'User not found!' });\n        req.profile = user;\n        next();\n    } catch (error) {\n        return res.status(400).json(error);\n    }\n};\n\n//# sourceURL=webpack://mern-voterecs/./server/controllers/user.controller.js?");

/***/ }),

/***/ "./server/devBundle.js":
/*!*****************************!*\
  !*** ./server/devBundle.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar _webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar _webpack2 = _interopRequireDefault(_webpack);\n\nvar _webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n\nvar _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);\n\nvar _webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n\nvar _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);\n\nvar _webpackConfig = __webpack_require__(/*! ../webpack.config.client */ \"./webpack.config.client.js\");\n\nvar _webpackConfig2 = _interopRequireDefault(_webpackConfig);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst compile = app => {\n    if (true) {\n        const compiler = (0, _webpack2.default)(_webpackConfig2.default);\n        const middleware = (0, _webpackDevMiddleware2.default)(compiler, {\n            publicPath: _webpackConfig2.default.output.publicPath\n        });\n        app.use(middleware);\n        app.use((0, _webpackHotMiddleware2.default)(compiler));\n    }\n};\n\nmodule.exports = { compile };\n\n//# sourceURL=webpack://mern-voterecs/./server/devBundle.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\n\nvar _dotenv2 = _interopRequireDefault(_dotenv);\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nvar _cookieParser2 = _interopRequireDefault(_cookieParser);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _compression = __webpack_require__(/*! compression */ \"compression\");\n\nvar _compression2 = _interopRequireDefault(_compression);\n\nvar _cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar _cors2 = _interopRequireDefault(_cors);\n\nvar _helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar _helmet2 = _interopRequireDefault(_helmet);\n\nvar _devBundle = __webpack_require__(/*! ./devBundle */ \"./server/devBundle.js\");\n\nvar _devBundle2 = _interopRequireDefault(_devBundle);\n\nvar _dbConnection = __webpack_require__(/*! ./../databases/dbConnection */ \"./databases/dbConnection.js\");\n\nvar _dbConnection2 = _interopRequireDefault(_dbConnection);\n\nvar _morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst app = (0, _express2.default)();\n\n_dotenv2.default.config({ path: 'config.env' });\n\n(0, _dbConnection2.default)();\n\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({ extended: true }));\napp.use((0, _cookieParser2.default)());\napp.use((0, _helmet2.default)());\napp.use((0, _compression2.default)());\napp.use((0, _cors2.default)());\n\napp.use('/dist', _express2.default.static(_path2.default.join(__dirname, 'dist')));\n\nif (true) {\n    _devBundle2.default.compile(app);\n}\n\nexports[\"default\"] = app;\n\n//# sourceURL=webpack://mern-voterecs/./server/express.js?");

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\nvar _crypto2 = _interopRequireDefault(_crypto);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst UserSchema = new _mongoose2.default.Schema({\n    name: {\n        type: String,\n        trim: true,\n        required: 'Name is required'\n    },\n    email: {\n        required: 'Email is required',\n        type: String,\n        unique: true,\n        match: [/.+\\@.+\\..+/, 'Fill in a valid email']\n    },\n    createdAt: {\n        type: Date,\n        default: Date.now\n    },\n    updated: Date,\n    role: {\n        type: String,\n        default: 'polling agent',\n        enum: ['admin', 'regional coordinator', 'constituency coordinator', 'polling agent']\n    },\n    hashed_password: {\n        type: String,\n        required: 'Password Required'\n    },\n    salt: String\n});\nexports[\"default\"] = _mongoose2.default.model('User', UserSchema);\n\n// UserSchema.virtual('password')\n// .set(function(password){\n// this._password = password;\n// this.salt = this.makeSalt();\n// this.hashed_password = this.encryptPassword(password);\n// })\n// .get(function(){\n// return this._password;\n// });\n// \n// UserSchema.methods = {\n// authenticate(plaintext){\n// return this.encryptPassword(plaintext) === this.hashed_password;\n// },\n// encryptPassword(password){\n// if(!password) return ''\n// try{\n// return crypto\n// .createHmac('sha1', this.salt)\n// .update(password)\n// .digest('hex')\n// }catch(error){\n// return error\n// }\n// },\n// makeSalt(){\n// return Math.round((new Date().valueOf() * Math.random()));\n// }\n// };\n// \n// UserSchema.path('hashed_password').validate(function(v){\n// if(this._password && this._password.length < 6){\n// this.invalidate('password','Password must be at least 6 characters')\n// }\n// if(this.isNew && !this._password){\n// this.invalidate('password','Password is required');\n// }\n// },null);\n\n//# sourceURL=webpack://mern-voterecs/./server/models/user.model.js?");

/***/ }),

/***/ "./server/routers/auth.routes.js":
/*!***************************************!*\
  !*** ./server/routers/auth.routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _auth = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst router = _express2.default.Router();\n\nrouter.route('/auth/sign-in').post(_auth.signIn);\n\nrouter.route('/auth/sign-out', _auth.requireSignIn).get(_auth.signOut);\n\nexports[\"default\"] = router;\n\n//# sourceURL=webpack://mern-voterecs/./server/routers/auth.routes.js?");

/***/ }),

/***/ "./server/routers/user.routes.js":
/*!***************************************!*\
  !*** ./server/routers/user.routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _user = __webpack_require__(/*! ../controllers/user.controller */ \"./server/controllers/user.controller.js\");\n\nvar _auth = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst userRouter = _express2.default.Router();\n\nuserRouter.route('/api/users').get(_user.listUsers).post(_user.createUser);\n\nuserRouter.get('/api/users/:userId').get(_user.readUser, _auth.requireSignIn).put(_user.updateUser, _auth.requireSignIn, _auth.hasAuthorization).delete(_user.removeUser, _auth.requireSignIn, _auth.hasAuthorization);\n\nuserRouter.param('userId', _user.findById);\n\nexports[\"default\"] = userRouter;\n\n//# sourceURL=webpack://mern-voterecs/./server/routers/user.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar _express = __webpack_require__(/*! ./express */ \"./server/express.js\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _config = __webpack_require__(/*! ../config/config */ \"./config/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nvar _template = __webpack_require__(/*! ../client/template */ \"./client/template.js\");\n\nvar _template2 = _interopRequireDefault(_template);\n\nvar _user = __webpack_require__(/*! ./routers/user.routes */ \"./server/routers/user.routes.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _auth = __webpack_require__(/*! ./routers/auth.routes */ \"./server/routers/auth.routes.js\");\n\nvar _auth2 = _interopRequireDefault(_auth);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Register the API endpoints\n_express2.default.use('/', _user2.default);\n_express2.default.use('/', _auth2.default);\n\n_express2.default.use((err, req, res, next) => {\n    if (err.name === 'UnauthorizedError') {\n        res.status(401).json({ 'error': err.name + \" : \" + err.message });\n    } else if (err) {\n        res.status(400).json({ 'error': err.name + \" : \" + err.message });\n        console.log(err);\n    }\n});\n\n// set to render the base template\n_express2.default.get('/', (req, res) => {\n    res.status(200).send((0, _template2.default)());\n});\n\n// listen the for port and start the server\n_express2.default.listen(_config2.default.port, () => {\n    console.log(`Server running on port ${_config2.default.port} `);\n});\n\n//# sourceURL=webpack://mern-voterecs/./server/server.js?");

/***/ }),

/***/ "./webpack.config.client.js":
/*!**********************************!*\
  !*** ./webpack.config.client.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst path = __webpack_require__(/*! path */ \"path\");\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\n// const HtmlWebpackPlugin = require('html-webpack-plugin')\n\nmodule.exports = {\n    entry: './client/src/index.js',\n    name: 'browser',\n    mode: 'development',\n    devtool: 'cheap-module-source-map',\n    output: {\n        path: path.join(__dirname, '/dist'),\n        filename: 'bundle.js',\n        publicPath: '/dist/'\n    },\n    module: {\n        rules: [{\n            test: /\\.js||.jsx?$/,\n            exclude: /node_modules/,\n            use: {\n                loader: 'babel-loader'\n            }\n        }]\n    },\n    plugins: [new webpack.NoEmitOnErrorsPlugin(), new webpack.HotModuleReplacementPlugin()]\n\n};\n\n//# sourceURL=webpack://mern-voterecs/./webpack.config.client.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("express-jwt");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("webpack");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;