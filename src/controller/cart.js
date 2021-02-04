const { default: slugify } = require('slugify');
const cart = require('../models/cart');
const Cart = require('../models/cart');

//this function is used by getCategory 
exports.addItemToCard = (req, res) => {

    Cart.findOne( { user: req.user._id } )
    .exec( (error, cart) => {
        if(error){ return res.status(400).json({ error }) };

        if(cart){ 
            //if cart exits append cart by quantity
            // return res.status(400).json({ message: 'Cart exists' }) 

            const item = cart.cartItems.find(c => c.product == req.body.cartItems.product );

            if(item){
                Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": req.body.cartItems.product }, {
                    "$set": {
                        "cartItems": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                })
                .exec( (error, _cart) => {
                    if(error){
                        return res.status(400).json({ error });
                    }
                    if(_cart){ return res.status(200).json({ _cart }) };
                });

            }else{

                Cart.findOneAndUpdate({ "user": req.user._id }, {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                })
                .exec( (error, _cart) => {
                    if(error){
                        return res.status(400).json({ error });
                    }
                    if(_cart){ return res.status(200).json({ _cart }) };
                });
            }


        }else{
            //if cart does not exist create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
        
            cart.save( (error, cart) => {
                if(error){
                    return res.status(400).json({ error });
                }
                if(cart){ return res.status(200).json({ cart }) };
            });
        }  
    });


    

}