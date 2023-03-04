import { moveFile, removeFile, uploadFile } from 'Utils/dirFileMulter';
import PlatterModel from './platter.model';
import CategoryModel from '../Categories/category.model';

PlatterModel.belongsTo(CategoryModel, { foreignKey: 'categoryId' });
CategoryModel.hasMany(PlatterModel, { foreignKey: 'categoryId' });
export const getAllPlatters = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log(req.params);
    if (categoryId) {
      const data = await PlatterModel.findAll({
        include: [{
          model: CategoryModel,
          attributes: ['categoryName']
        }],
        where: {
          platterStatus: 0,
          categoryId
        }
      });
      return res.status(200).json(
        data
      );
    }
  } catch (e) {
    return res.status(500).json({
      message: 'error'
    });
  }

  const data = await PlatterModel.findAll({
    include: [{
      model: CategoryModel,
      attributes: ['categoryName']
    }],
    where: {
      platterStatus: 0,
    }
  });
  return res.status(200)
    .json(
      data
    );
};

export const insertPlatter = async (req, res) => {
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
        platterName,
        price,
        cost,
        platterDetail,
        categoryId
      } = req.body;
      if (!platterName
                || !price
                || !cost
                || !platterDetail
                || !categoryId) {
        return res.status(400)
          .json({
            message: 'error missing data',
            code: 400,
          });
      }
      try {
        const Platters = await PlatterModel.findOne({
          where: {
            platterName,
            platterStatus: 0
          }
        });

        if (Platters) {
          return res.status(409)
            .json({
              message: `Category already using ${platterName}`
            });
        }
      } catch (error) {
        return res.status(400).json(error);
      }
      try {
        const newPlatter = {
          platterName,
          price,
          cost,
          platterDetail,
          platterImage: req.file.originalname,
          categoryId,
          platterStatus: 0
        };
        const data = await PlatterModel.create(newPlatter);
        const id = data.categoryId;
        await moveFile(`${req.file.originalname}`, `${id}${req.file.originalname}`, 'Platters');
        return res.status(400)
          .json({
            message: 'Create platter successful'
          });
      } catch (e) {
        return res.status(400)
          .json({
            message: 'Error create platter',
            error: e
          });
      }
    } catch (error) {
      return res.status(400)
        .json(error);
    }
  });
};

export const updatePlatter = async (req, res) => {
  let oldImage;
  const { platterID } = req.params;
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
        platterName,
        price,
        cost,
        platterDetail,
        categoryId
      } = req.body;
      if (!platterName
                || !price
                || !cost
                || !platterDetail
                || !categoryId) {
        return res.status(400)
          .json({
            message: 'error missing data',
            code: 400,
          });
      }
      try {
        const platter = await PlatterModel.findOne({
          where: {
            platterName,
            platterStatus: 0
          }
        });
        const dataOld = await PlatterModel.findOne({
          where: {
            platterId: platterID
          }
        });
        oldImage = dataOld.dataValues.platterImage;
        if (platter && parseInt(platter.dataValues.platterId, 10)
                    !== parseInt(platterID, 10)) {
          return res.status(409).json({
            message: `user already using ${platterName}`
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json('error');
      }
      try {
        let image;
        try {
          image = req.file.originalname;
          await PlatterModel.update({
            platterName,
            price,
            cost,
            platterDetail,
            platterImage: image,
            categoryId
          }, { where: { platterID } });
          try {
            await removeFile(`Platters/${platterID}${oldImage}`);
          } catch (error) {
            console.log(error);
          }
          try {
            await moveFile(`${req.file.originalname}`, `${categoryId}${req.file.originalname}`, 'Platters');
          } catch (error) {
            console.log(error);
          }
        } catch (e) {
          await PlatterModel.update({
            platterName,
            price,
            cost,
            platterDetail,
            categoryId
          }, { where: { platterID } });
          return res.status(400)
            .json({
              message: 'Update category successful no image'
            });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          code: 500,
          message: 'error move file',
        });
      }
    } catch (e) {
      return res.status(400)
        .json('Error create category');
    }
    return res.status(200)
      .json({
        message: 'Update category successful with images',

      });
  });
};

export const deletePlatter = async (req, res) => {
  const { platterID } = req.params;
  try {
    await PlatterModel.update({
      platterStatus: 1
    }, {
      where: {
        platterId: platterID
      }
    });
    return res.status(200).json({
      message: 'Platter deleting successful'
    });
  } catch (e) {
    return res.status(400).json({
      message: 'Error deleting platter'
    });
  }
};
