import { moveFile, removeFile, uploadFile } from 'Utils/dirFileMulter';
import CategoryModel from './category.model';

export const getAllCategories = async (req, res) => {
  try {
    const data = await CategoryModel.findAll({
      where: { categoryStatus: 0 }
    });
    return res.status(200)
      .json(data);
  } catch (error) {
    console.error(error);
    return res.status(500)
      .json({
        message: 'Error al obtener datos',
        code: 500,
      });
  }
};

export const insertCategory = async (req, res) => {
  const currUpload = uploadFile();
  console.log(req.file);
  (await currUpload)(req, res, async (err) => {
    if (err) {
      res.json({
        error_code: 1,
        err_desc: err
      });
    }
    try {
      const {
        categoryName
      } = req.body;
      if (!categoryName) {
        return res.status(400)
          .json({
            message: 'Error obteniendo datos',
            code: 400,
          });
      }
      try {
        const category = await CategoryModel.findOne({
          where: {
            categoryName,
            categoryStatus: 0
          }
        });

        if (category) {
          return res.status(409)
            .json({
              message: `La categoria ${categoryName} ya existe`
            });
        }
      } catch (error) {
        return res.status(400).json(error);
      }
      try {
        const image = req.file.originalname;
        const newCategory = {
          categoryName,
          categoryImage: image,
          categoryStatus: 0
        };
        const data = await CategoryModel.create(newCategory);
        const id = data.categoryId;
        await moveFile(`${req.file.originalname}`, `${id}${req.file.originalname}`, 'Categories');
        return res.status(200)
          .json({
            message: 'Categoria creada con exito',
          });
      } catch (e) {
        console.log(e);
        return res.status(400)
          .json('Error al crear categoria');
      }
    } catch (error) {
      return res.status(400)
        .json(error);
    }
  });
};

export const updateCategory = async (req, res) => {
  let oldImage;
  const currUpload = uploadFile();
  (await currUpload)(req, res, async (err) => {
    if (err) {
      res.json({
        error_code: 1,
        err_desc: err
      });
    }
    try {
      const {
        categoryName
      } = req.body;
      const { categoryId } = req.params;
      if (!categoryName) {
        return res.status(400)
          .json({
            message: 'error obteniendo datos',
            code: 400,
          });
      }
      try {
        const category = await CategoryModel.findOne({
          where: {
            categoryName,
            categoryStatus: 0
          }
        });
        const dataOld = await CategoryModel.findOne({
          where: {
            categoryId
          }
        });
        oldImage = dataOld.dataValues.categoryImage;
        if (category && parseInt(category.dataValues.categoryId, 10)
                    !== parseInt(categoryId, 10)) {
          return res.status(409).json({
            message: `la cetegoria ${categoryName} ya existe`
          });
        }
      } catch (error) {
        return res.status(400).json(error);
      }
      try {
        let image;
        try {
          image = req.file.originalname;
          await CategoryModel.update({
            categoryName,
            categoryImage: image,
          }, { where: { categoryId } });
          try {
            await removeFile(`Categories/${categoryId}${oldImage}`);
          } catch (error) {
            console.log(error);
          }
          try {
            await moveFile(`${req.file.originalname}`, `${categoryId}${req.file.originalname}`, 'Categories');
          } catch (error) {
            console.log(error);
          }
        } catch (e) {
          await CategoryModel.update({
            categoryName,
            categoryImage: image,
          }, { where: { categoryId } });
          return res.status(200)
            .json({
              message: 'actualizacion de categoria exitosa '
            });
        }
      } catch (error) {
        return res.status(500).json({
          code: 500,
          message: 'error move file',
        });
      }
    } catch (e) {
      return res.status(400)
        .json('Error create category');
    }
    return res.status(200).json({
      message: 'actualizacion de categoria exitosa'
    });
  });
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    await CategoryModel.update({
      categoryStatus: 1,
    }, { where: { categoryId } });
    return res.status(200).json({
      message: 'Category deleting successful'
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error deleting category',
      error: e
    });
  }
};
