import { sequelize } from 'Server/db';
import OrderModel from '../Orders/order.model';
import OrderDetailModel from './orderDetail.model';
import PlatterModel from '../Platters/platter.model';

OrderModel.hasMany(OrderDetailModel, { foreignKey: 'orderId' });
OrderDetailModel.belongsTo(OrderModel, { foreignKey: 'orderId' });

export const getAllOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    return res.status(401).json({
      message: 'Error missing data'
    });
  }
  try {
    const data = await sequelize.query(`select a.orderId,a.detailsOrderId,b.orderDate,
b.orderType, b.orderTime, a.platterId,c.platterName, a.platterPrice, d.userName,e.tableNumber
from orderdetails a inner join
orders b on a.orderId = b.orderId
inner join platters c
on a.platterId = c.platterId
inner join users d
on b.userId = d.userId
inner join restaurantTables e on
e.tableId = b.tableId
where b.orderId = ${orderId} and b.orderStatus = 0
 and a.detailOrderStatus = 0`,
    { type: sequelize.QueryTypes.SELECT });
    return res.status(200).json({
      data
    });
  } catch (e) {
    return res.status(500).json({
      message: 'error getting all order details',
    });
  }
};

export const insertOrderDetail = async (req, res) => {
  const {
    OrderDetail
  } = req.body;
  const { orderId } = req.params;
  if (!OrderDetail || !orderId) {
    return res.status(401).json({
      message: 'Error missing data'
    });
  }
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const platter of OrderDetail) {
      // eslint-disable-next-line no-await-in-loop
      const platterPrice = await PlatterModel.findOne({
        where: {
          platterId: platter.platterId
        }
      });
      const newOrderDetail = {
        orderId,
        platterId: platter.platterId,
        platterPrice: platterPrice.dataValues.price,
        detailOrderStatus: 0
      };
      OrderDetailModel.create(newOrderDetail);
    }
    return res.status(200).json({
      message: 'Order detail inserted successfully'
    });
  } catch (e) {
    return res.status(500).json({
      message: 'getting platter price',
    });
  }
};

export const deleteOrderDetail = async (req, res) => {
  const { detailsOrderId } = req.params;
  try {
    await OrderDetailModel.update({
      detailOrderStatus: 1
    }, {
      where: {
        detailsOrderId
      }
    });
    return res.status(200).json({
      message: 'Order detail deleted successfully',
    });
  } catch (e) {
    return res.status(500).json({
      message: 'error deleting order detail',
    });
  }
};
