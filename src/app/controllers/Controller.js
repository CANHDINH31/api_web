import MenuModel from "../models/Menu.js"
import DetailModel from "../models/Detail.js"
import ProductModel from "../models/Product.js"
import AdminModel from "../models/Administrator.js"

import md5 from 'md5'
import jwt from 'jsonwebtoken'




export const index = (req, res) => {
    res.render('Home')
}

export const RenderCategory = (req, res, next) => {
    const category = req.params.category;
    Promise.all([DetailModel.countDocuments({ code: category }), DetailModel.find({ code: category }).lean()])
        .then(([count, images]) => {
            res.render('RenderCategory', {
                images,
                count,
            })
        })
        .catch(next)
}

export const ApiDetailsJson = (req, res, next) => {
    const apidetailsjson = req.params.apidetailsjson;
    DetailModel.find({})
        .then(
            (apidetailsjson) => {
                res.json(apidetailsjson)
            }
        )
        .catch(next)
}

export const ApiCategoryJson = (req, res, next) => {
    MenuModel.find({})
        .then(
            (apicategoryjson) => {
                res.json(apicategoryjson)
            }
        )
        .catch(next)
}

export const createApiDetails = (req, res, next) => {
    res.render('CreateApiDetails')
}

export const createApiCategory = (req, res, next) => {
    res.render('CreateApiCategory')
}


export const SaveApiDetailsCreate = (req, res, next) => {
    const ApiDetail = new DetailModel(req.body);
    ApiDetail.save()
        .then(
            res.redirect('back')
        )
        .catch(next)
}

export const SaveApiCategoryCreate = (req, res, next) => {
    const ApiCategory = new MenuModel(req.body);
    ApiCategory.save()
        .then(
            res.redirect('back')
        )
        .catch(next)
}


export const TableApiDetail = (req, res, next) => {
    DetailModel.find({}).lean()
        .then(apidetails => {
            res.render('TableApiDetail', {
                apidetails
            })
            // res.json(apidetails)
        }
        )
        .catch(next)

}

export const TableApiCategory = (req, res, next) => {
    MenuModel.find({}).lean()
        .then(apicategory => {
            res.render('TableApiCategory', {
                apicategory
            })
            // res.json(apicategory)
        }
        )
        .catch(next)

}

export const UpdateApiDetail = (req, res, next) => {
    DetailModel.find({ _id: req.params.id }).lean()
        .then(apidetail => res.render('UpdateApiDetails', {
            apidetail
        })
        )
        .catch(
            error => {
                console.log(error)
            }
        )
}

export const UpdateApiCategory = (req, res, next) => {
    MenuModel.find({ _id: req.params.id }).lean()
        .then(apicategory => res.render('UpdateApiCategory', {
            apicategory
        })
        )
        .catch(
            error => {
                console.log(error)
            }
        )
}

export const SaveUpdateApiDetail = (req, res, next) => {
    DetailModel.updateOne({ _id: req.params.id }, req.body)
        .then(
            res.redirect('/tableapidetail')
        )
        .catch(next)
}

export const SaveUpdateApiCategory = (req, res, next) => {
    MenuModel.updateOne({ _id: req.params.id }, req.body)
        .then(
            res.redirect('/tableapicategory')
        )
        .catch(next)
}

export const DeleteApiDetail = (req, res, next) => {
    DetailModel.deleteOne({ _id: req.params.id })
        .then(
            res.redirect('/tableapidetail')
        )
        .catch(next)
}

export const DeleteApiCategory = (req, res, next) => {
    MenuModel.deleteOne({ _id: req.params.id })
        .then(
            res.redirect('/tableapicategory')
        )
        .catch(next)
}



export const MyProducts = (req, res, next) => {
    Promise.all([ProductModel.countDocuments({}), ProductModel.find({}).lean()])
        .then(([count, products]) => {
            res.render('MyProducts', {
                count,
                products
            })


        }
        )
        .catch(next)
}

export const Login = (req, res, next) => {

        if(req.cookies.token){
            const token = jwt.verify(req.cookies.token,'dinhphamcanh');
            if(token){
                next();
            }else{
              res.render('Login')
                
            }
        }
        else{
            res.render('Login')
        }
        

}

export const CheckLogin = (req, res, next) => {
        const { username, password } = req.body;
        const hashedPassword = md5(password);


        AdminModel.findOne({
            username: username,
            password: hashedPassword
        })
            .then(
                data => {
                    if (data._id) {
                        const token = jwt.sign({ foo: data._id }, 'dinhphamcanh')
                        res.cookie('token', token,
                            {
                                expires: new Date(Date.now() + 900000)
                            })
                        res.redirect('back')
                    }
                }
            )
            .catch(
                error => {
                    res.redirect('back')
                }
            )

}

export default index