const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	index: (req, res) => {
		res.render('products', {products, toThousand})
	},


	detail: (req, res) => {
		const id = req.params.id
		const filtrada = products.find(product => {
			return product.id == id			
		})
		res.render('detail', {product:filtrada, toThousand})
	},

	
	create: (req, res) => {
		res.render('product-create-form') 
	},
	
	
	store: (req, res) => {
		const nuevoProducto = {
			id: products.length +1,
			name: req.body.name,
			price: req.body.price,
			image: req.body.productImage
		}
		products.push(nuevoProducto)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null));
		res.redirect('/')
	},

	
	edit: (req, res) => {
		const id = req.params.id
		const producToEdit = products.find(product => {
			return product.id == id		
		});
		res.render('product-edit-form', {product:producToEdit, toThousand})
	},
	
	update: (req, res) => {
		products.forEach(element); {
			if(element.id == req.params.id){
				element.name = req.body.name;
				element.description = req.body.description;
				element.price = req.body.price;
				element.discount = req.body.discount;
				element.category = req.body.category;
			}
			
		}
		const productoJSON = JSON.stringify(products)
		fs.writeFileSync(productsFilePath,productoJSON)
		res.redirect('/');
	},

	
	destroy : (req, res) => {
		const id = req.body.id
		const eliminada = products.find(product => {
			return product.id == id		
		})
		res.redirect('/')
	}
		
};

module.exports = controller;