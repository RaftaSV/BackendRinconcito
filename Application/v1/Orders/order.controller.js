import jwtDecode from 'jwt-decode';

import OrderModel from './order.model';
import TableModel from '../Tables/table.model';
import UserModel from '../Users/user.model';
import orderDetailModel from '../OrderDetails/orderDetail.model';
import { getDate, getTime } from '../../../Utils/GetDate';

OrderModel.belongsTo(TableModel, { foreignKey: 'tableId' });
OrderModel.belongsTo(UserModel, { foreignKey: 'userId' });
TableModel.hasMany(OrderModel, { foreignKey: 'tableId' });
UserModel.hasMany(OrderModel, { foreignKey: 'userId' });
OrderModel.belongsTo(orderDetailModel, { foreignKey: 'orderId' });
orderDetailModel.hasMany(OrderModel, { foreignKey: 'orderId' });

// get all orders se utiliza para obtener todos los pedidos existentes
export const getAllOrders = async (req, res) => {
  try {
    const date = new Date();
    date.setDate(date.getDate());
    const newDate = date.toISOString().substring(0, 10);

    const data = await OrderModel.findAll({
      where: {
        orderStatus: 0,
        orderDate: newDate,
      },
      include: [{
        model: orderDetailModel,
        where: {
          detailOrderStatus: 0
        },
      }]
    });
    return res.status(200).json({
      data
    });
  } catch (e) {
    return res.status(500).json({
      message: 'error getting all orders',
    });
  }
};

// insert order se utiliza para insertar un nuevo pedido
export const insertOrder = async (req, res) => {
  const token = req.header('auth-token');
  const decoded = jwtDecode(token);
  const {
    orderType,
    tableId,
  } = req.body;
  if (!orderType) {
    return res.status(401).json({
      message: 'Error missing data'
    });
  }
  if (parseInt(orderType, 10) === 0) {
    try {
      const data = await OrderModel.create({
        orderTime: getTime().currentTime,
        orderDate: getDate().newDate,
        orderType: parseInt(orderType, 10),
        tableId: parseInt(tableId, 10),
        userId: decoded.User.userId,
        orderStatus: 0,
      });
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e
      });
    }
  }
  try {
    const data = await OrderModel.create({
      orderType: parseInt(orderType, 10),
      userId: decoded.User.userId,
      orderStatus: 0,
    });
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e
    });
  }
};

// update order se utiliza para actualizar un pedido, cambiar de mesa o cambiar el tipo de pedido
export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const {
    orderType,
    tableId
  } = req.body;
  let data;
  if (!orderId) {
    return res.status(401).json({
      message: 'Error missing data'
    });
  }
  try {
    data = await OrderModel.findOne({
      where: {
        orderId
      }
    });
  } catch (e) {
    return res.status(500).json({
      message: 'error getting order'
    });
  }
  if (data.dataValues.orderType === 1 || data.dataValues.orderType === 2) {
    // si la orden es a domicilio o para llevar y se quiere cambiar a mesa
    if (parseInt(orderType, 10) === 0) {
      try {
        await OrderModel.update({
          tableId,
          orderType,
        }, {
          where: {
            orderId
          }
        });
        return res.status(200).json({
          message: 'order updated change type order'
        });
      } catch (e) {
        return res.status(500).json({
          message: 'error updating order'
        });
      }
    }
    // si la orden es a domicilio o para llevar y se quiere cambiar a domicilio o para llevar
    try {
      await OrderModel.update({
        orderType,
      }, {
        where: {
          orderId
        }
      });
      return res.status(200).json({
        message: 'order updated change to delivery or take away'
      });
    } catch (e) {
      return res.status(500).json({
        message: 'error updating order'
      });
    }
  } else if (data.dataValues.orderType === 0) {
    // si la orden es a mesa y se quiere cambiar a domicilio o para llevar
    if (parseInt(orderType, 10) === 1 || parseInt(orderType, 10) === 2) {
      try {
        await OrderModel.update({
          tableId: null,
          orderType,
        }, {
          where: {
            orderId
          }
        });
        return res.status(200).json({
          message: 'order updated change to delivery or take away'
        });
      } catch (e) {
        return res.status(500).json({
          message: 'error updating order'
        });
      }
    }
  }
  // si la orden se quiere cambiar de mesa
  if (data.dataValues.tableId !== tableId) {
    try {
      await OrderModel.update({
        tableId,
      }, {
        where: {
          orderId
        }
      });
      return res.status(200).json({
        message: 'order updated change table'
      });
    } catch (e) {
      return res.status(500).json({
        message: 'error updating order'
      });
    }
  }
  return res.status(500).json({
    message: 'error updating order'
  });
};

// delete order se utiliza para cambiar el estado de un pedido

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    return res.status(401).json({
      message: 'Error missing data'
    });
  }
  try {
    await OrderModel.update({
      orderStatus: 1,
    }, {
      where: {
        orderId
      }
    });
    return res.status(200).json({
      message: 'order deleted'
    });
  } catch (e) {
    return res.status(500).json({
      message: 'error deleting order'
    });
  }
};
