import Product from "../model/productModel.js";
import Cart from "../model/cartModel.js";

// Get all carts
export const getAll = async (req, res) => {
  try {
    const todoData = await Product.find({ user_id: req.user.user_id });
    if (!todoData) {
      return res.status(404).json({ msg: "Data not found" });
    }
    res.status(200).json(todoData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
// Get all cart items
export const getAllCart = async (req, res) => {
  try {
    const cartData = await Cart.find({ user_id: req.user.user_id });
    if (!cartData) {
      return res.status(404).json({ msg: "Data not found" });
    }
    res.status(200).json(cartData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get a cart by ID
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const TodoExist = await Product.findById(id);
    if (!TodoExist) {
      return res.status(404).json({ msg: "Data not found" });
    }
    res.status(200).json(TodoExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Add a new cart
export const create = async (req, res) => {
  try {
    const { name, description, color, price } = req.body;
    // const todoData = new Product(req.body);
    if (!name || !description || !color || !price) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const files = req.files.map((file) => ({
      fileName: file.filename,
      filePath: file.path,
      fileSize: file.size,
    }));
    const savedData = await new Product({
      name,
      description,
      color,
      price,
      user_id: req.user.user_id,
      files,
    });
    const savedFilesData = await savedData.save();
    res.status(200).json(savedFilesData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Update cart by ID
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const todoExist = await Product.findById(id);
    if (!todoExist) {
      return res.status(404).json({ msg: "Product not found" });
    }
    if (todoExist.user_id.toString() !== req.user.user_id) {
      res
        .status(403)
        .json({ msg: "User don't have permission to update other Products" });
    }
    const updatedData = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Delete cart by ID
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const todoExist = await Product.findById(id);
    if (!todoExist) {
      return res.status(404).json({ msg: "Product data not found" });
    }
    if (todoExist.user_id.toString() !== req.user.user_id) {
      res
        .status(403)
        .json({ msg: "User don't have permission to update other Products" });
    }
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ msg: `Product ${todoExist.name} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


// Add cart items
export const addToCart = async (req, res) => {
  try {
const { id,name, description, color, price, files, quantity } = req.body;
    const savedData = await new Cart({
      name,
      id,
      description,
      color,
      price,
      quantity,
      user_id: req.user.user_id,
      files,
    });
    const savedFilesData = await savedData.save();
    res.status(200).json(savedFilesData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//remove cart items
export const removeFromCart = async (req, res) => {
  try {
    const id = req.headers["id"];
    await Cart.findByIdAndDelete(id);
    res.json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


//update cart items quantity
export const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const id = req.headers["id"];
    const cartItem = await Cart.findById(id);

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json({ success: true, message: "Quantity updated successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Item not found in the cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
