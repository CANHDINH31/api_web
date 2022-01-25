import MenuModel from "../models/Menu.js"
import DetailModel from "../models/Detail.js"
import ProductModel from "../models/Product.js"
import AdminModel from "../models/Administrator.js"
import MusicModel from "../models/Music.js"
import VideoModel from "../models/Video.js"
import MathModel from "../models/Math.js"

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

export const ApiDetailsPageJson = (req, res, next) => {
    const [type,page] = req.params.type.split("-");
    var skip = (page-1)*16;
    DetailModel.find({})
        .skip(skip)
        .limit(16)
        .then(
            (apicategoryjson) => {
                res.json(apicategoryjson)
            }
        )
        .catch(next)
}

export const ApiDetailsTypeJson = (req, res, next) => {
    var type = req.params.type;
    var page = req.params.page;
    page = parseInt(page);
    var skip = (page-1)*20;

    DetailModel.find({code:type})
        .skip(skip)
        .limit(16)
        .then(
            (apicategoryjson) => {
                res.json(apicategoryjson)
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

export const ApiCategoryParamJson = (req, res, next) => {
    const params = req.params.params;
    MenuModel.find({code:params})
        .then(
            (apicategoryjson) => {
                res.json(apicategoryjson)
            }
        )
        .catch(next)
}
export const ApiMusicJson = (req, res, next) => {
    MusicModel.find({})
        .then(
            (musics) => {
                res.json(musics)
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

    if (req.cookies.token) {
        const token = jwt.verify(req.cookies.token, 'dinhphamcanh');
        if (token) {
            next();
        } else {
            res.render('Login')

        }
    }
    else {
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

export const MusicStore = (req, res, next) => {
    MusicModel.find({}).sort({code:1,name:1}).lean()
        .then(
            musics => {
                res.render('TableMusicStore', {
                    musics
                })

            }
        )
        .catch(next)
}

export const VideoStore = (req, res, next) => {
    Promise.all([VideoModel.find({ param: 'nhactrung' }).sort('name').skip(0).limit(8).lean(),
    VideoModel.find({ param: 'nhacviet' }).sort('name').skip(0).limit(8).lean(),
    VideoModel.find({ param: 'nhacquocte' }).sort('name').skip(0).limit(8).lean(),
    VideoModel.find({ param: 'tuyenvietnam' }).sort('name').skip(0).limit(8).lean(),
    ])
        .then(([nhactrung, nhacviet, nhacquocte, vietnam]) => {
            res.render('VideoStore', {
                nhactrung,
                nhacviet,
                nhacquocte,
                vietnam
            })
            // res.json(nhactrung)

        })
        .catch(next)

}

export const VideoDetail = (req, res, next) => {
    const { param, id } = req.params;
    Promise.all([VideoModel.find({ param: param, _id: id }).sort('name').lean(),
    VideoModel.find({ param: param }).sort('name').lean(),
    VideoModel.find({}).select('type')
    ])
        .then(
            ([videodetail, listvideodetail, listtype]) => {
                res.render('VideoDetail', {
                    videodetail,
                    listvideodetail,
                    listtype: JSON.stringify(listtype)
                })
               
            }
        )
        .catch(next)


}

export const VideoCategory = (req, res, next) => {
    const { category } = req.params;
    Promise.all([
        VideoModel.find({ param: category }).sort('name').lean(),
        VideoModel.find({}).select('type'),
        VideoModel.countDocuments({ param: category })
    ])
        .then(
            ([data, listtype, count]) => {
                res.render('VideoCategory', {
                    data,
                    listtype: JSON.stringify(listtype),
                    count
                })
            }
        )
        .catch()
}

export const VideoSearch = (req, res, next) => {
    const string = (req.body.search).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/y/g, 'i');
    VideoModel.find({}).sort('name').lean()
        .then(
            results => {
                results.map(result => { result.type = result.type.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/y/g, 'i') });
                results.map(result => { result.name = result.name.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/y/g, 'i') });
                results=results.filter(result => {return result.name.includes(string) || result.type.includes(string)});
                const videoid = [];
                results.map(result =>{videoid.push(result.videoid)});
                Promise.all([VideoModel.find({videoid:{$in:videoid}}).sort('name').lean(),VideoModel.countDocuments({videoid:{$in:videoid}})])
                .then(([data, count]) => res.render('VideoSearch',{
                   data,
                   count
                }))
                .catch(next)
            })
        .catch(next)

}

export const ApiVideoJson = (req,res,next) => {
    VideoModel.find({})
     .then(
        data => {
            res.json(data)
        }
     )
     .catch(next)
}

export const MathDetail = (req,res,next) =>{
    MathModel.find({}).sort('name').lean()
        .then(
            data => {
                res.render('MathDetail',{data})  
                // res.send(data)
            }
        )
        .catch(next)
    
}

export default index
