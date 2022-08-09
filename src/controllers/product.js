const { product, user, category, productCategory } = require("../../models");

exports.getProducts = async (req, res) => {
  try {
    
    let data = await product.findAll({
        include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productCategory,
            as: "bridge",
            attributes: [],
          },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data))

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })



    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const data = await product.findAll({
        where: {
            id
        },
        attributes:{
            exclude: ["createdAt", "updatedAt"]
        }
    })
  
      res.send({
        status: "success",
        data: {
         product: data,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

exports.addProduct = async (req, res) => {
  try {

    const data = req.body

    let newProduct = await product.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id 
    })

    newProduct = JSON.parse(JSON.stringify(newProduct))

    newProduct = {
      ...newProduct,
      image: process.env.PATH_FILE + newProduct.image
    }

    res.send({
      status: "success",
      data: {newProduct}
    })



  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
  
      let updateProduct = await product.update(data, {
        where: {
          id,
        },
      });
      
      updateProduct = JSON.parse(JSON.stringify(updateProduct))

      updateProduct = {
        ...updateProduct,
        image: process.env.PATH_FILE + updateProduct.image
      }

      res.send({
        status: "success",
        message: `Update Product id: ${id} finished`,
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      await product.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Delete Product id: ${id} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };