const Order = require('../models/order.model');
const User = require('../models/user.model');

exports.create = (req, res) => {
  const order = new Order({
    total: req.body.total,
    user: req.body.user,
    products: req.body.products,
    status: req.body.status,
  });

  order
    .save()
    .then((data) => {
    	User.findByIdAndUpdate(req.body.user, {orders:data._id})
    	.then(() => {
    		res.send({
    			data:data
    		})
    		.catch((err) => res.send(err));
    	});
      res.send({
        order: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message: err.message || 'some error occured while creating user',
      });
    });
};

exports.getOrder = (req, res) => {
  Order.findById(req.params.id)
  // .populate('products')
  .populate('user')
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Order with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.getOrders = (req, res) => {
  Order.find()
  .populate('products')
  .populate('user')
    .then((data) => {
      if (!data) {
        res.send({
          message: `Order with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.update = (req, res) => {
    Order.findOneAndUpdate(
        { _id: req.params.id },
        {
            status: req.body.status,
        }
    )
    .then((data) => {
        res.json({
            message :" order modifier",
            data: data
        });
    }).catch((err) => {
        console.log(err.message);
    })
};

exports.removeOne = (req, res) => {
	Order.findByIdAndRemove(req.params.id)
	.then((data) => {
		// if (!data) {
		// 	res.status(404).send({
		// 		message: `Order with id ${req.params.id} not found`
		// 	})
		// }
		res.send(data);
	})
	.catch((err) =>	res.send(err));
}