import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser'

import route  from './routes/index.js';
import { connect } from './config/db/index.js';

//connect db
connect();


const app = express()
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname,'src/public')))

app.use(express.urlencoded())
app.use(express.json())

app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'))

app.use(cookieParser())

app.engine('.hbs', engine({extname: '.hbs',
                            helpers:{
                                sum:(a,b) =>a+b,
                                json: function(obj) {
                                    return JSON.stringify(obj);
                                }
                            },
                            }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'src/resources/views'));

//routes
route(app)

const PORT = process.env.PORT || 3000
app.listen(PORT)