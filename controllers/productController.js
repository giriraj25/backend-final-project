const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    try {
        const newProduct = new Product({ name, description, price, imageUrl });
        const product = await newProduct.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, imageUrl }, { new: true });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.remove();
        res.json({ message: 'Product removed' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
