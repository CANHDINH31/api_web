import { index, 
        RenderCategory, 
        ApiCategoryJson,
        ApiDetailsJson ,
        ApiMusicJson,
        createApiDetails,
        createApiCategory,
        SaveApiDetailsCreate,
        SaveApiCategoryCreate,
        TableApiDetail,
        TableApiCategory,
        UpdateApiDetail,
        UpdateApiCategory,
        SaveUpdateApiDetail,
        SaveUpdateApiCategory,
        DeleteApiDetail,
        DeleteApiCategory,
        MyProducts,
        Login,
        CheckLogin,
        MusicStore,
        VideoStore,
        VideoDetail,
        VideoCategory,
        VideoSearch,
        ApiVideoJson,
        MathDetail
    } from '../app/controllers/Controller.js'
import bodyParser from 'body-parser'

const urlencodedParser = bodyParser.urlencoded({ extended: false })

function route(app){
    app.get('/',index)

    app.get('/mathdetail',Login,MathDetail)
    app.get('/musicstore',MusicStore)
    app.get('/videostore',Login,VideoStore)
    app.post('/videostore/search',Login,VideoSearch)
    app.get('/videostore/:category',Login,VideoCategory)
    app.get('/videostore/:param/:id',Login,VideoDetail)



    app.get('/tableapidetail',Login,TableApiDetail)
    app.get('/tableapicategory',Login,TableApiCategory)

    app.get('/apidetailsjson',ApiDetailsJson)
    app.get('/apicategoryjson',ApiCategoryJson)
    app.get('/apimusicjson',ApiMusicJson)
    app.get('/apivideojson',Login,ApiVideoJson)


    app.get('/createApiDetails',Login,createApiDetails)
    app.get('/createApiCategory',Login,createApiCategory)


    app.get('/my/products',MyProducts)

    app.get('/update/apidetail/:id',Login,UpdateApiDetail)
    app.get('/update/apicategory/:id',Login,UpdateApiCategory)
    
    app.put('/update/apidetail/:id',Login,SaveUpdateApiDetail)
    app.put('/update/apicategory/:id',Login,SaveUpdateApiCategory)

    app.get('/delete/apidetail/:id',Login,DeleteApiDetail)
    app.get('/delete/apicategory/:id',Login,DeleteApiCategory)

    app.get('/:category',RenderCategory)


    app.post('/login',CheckLogin)
    app.post('/store/ApiDetails',Login,SaveApiDetailsCreate)
    app.post('/store/ApiCategory',Login,SaveApiCategoryCreate)

}


export default route;
