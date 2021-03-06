const Joi = require('joi');


const userSchemaValidation = (req, res, next) => {

	const userValidationSchema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		phone: Joi.string(),
		address: Joi.string(),
		email: Joi.string().email(),
		password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$')).required(),
		isAdmin: Joi.boolean(),
	});

	const validation = userValidationSchema.validate(req.body);
	// console.log(validation);

	if (validation.error) {
		return res.send({
			error: validation.error
		})
	}
	next();
}

module.exports = userSchemaValidation;