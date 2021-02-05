const { default: slugify } = require('slugify');
const Category = require('../models/category');

//this function is used by getCategory 
createCategories = (categories, parentId = null) => {

    const categoryList = []
    let category;
    if(parentId === null){
        category = categories.filter( cat => cat.parentId == undefined);
    }else{
        category = categories.filter( cat => cat.parentId == parentId )
    }

    for ( let c of category ){
        categoryList.push({
            _id: c._id,
            name: c.name,
            slug: c.slug,
            clildren: createCategories(categories, c._id)
        });
    }

    return categoryList;

}

exports.addCategory = (req, res)=> {   

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }

    if(req.file){
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const _cat = new Category(categoryObj);
    _cat.save( (error, category) => {
        if(error){
           return res.status(400).json({ error });
        }
        if(category){
            return res.status(200).json({ category });
        }
    });
}

exports.getCategories = (req, res) => {
    Category.find({})
    .exec( (error, categories) => {
        if(error){
            return res.status(400).json({ error });
        }
        if(categories){
            const categoryList = createCategories(categories);
            res.status(200).json({ categoryList });
        }
    });
}