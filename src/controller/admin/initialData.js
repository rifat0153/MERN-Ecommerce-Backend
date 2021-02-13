const Category = require('../../models/category');
const Product = require('../../models/product');

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
            parentId: c.parentId,
            clildren: createCategories(categories, c._id)
        });
    }

    return categoryList;

}

exports.initialData = async (req, res) => {

    // giving empty object parameter in find returns
    // all ob from that model
    // select and populate together works as Foreign key
    // concept of SQL------------- here category is FK of Product table
    const categories = await Category.find({}).exec();
    const products = await Product.find({})
                                  .select('_id name price quantity slug description productPictures category')
                                
                                  .exec();


    res.status(200).json({
        categories: createCategories(categories),
        products
    });



}