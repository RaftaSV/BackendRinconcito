import TableModel from './table.model';

export const getAllTables = async (req, res) => {
  try {
    const data = await TableModel.findAll({
      where: { tableStatus: 0 },
      order: [
        ['tableNumber', 'ASC']
      ]
    });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      message: 'Error getting tables'
    });
  }
};

export const insertTable = async (req, res) => {
  const tablesNumber = req.body.number;
  if (!tablesNumber) {
    return res.status(400).json({
      message: 'All data is missing',
    });
  }
  const data = await TableModel.findAll({
    where: {
      tableStatus: 0
    },
    order: [
      ['tableNumber', 'ASC']
    ]
  });
  if (data.length > 0) {
    let lastTableNumber;
    await data.forEach((table) => {
      lastTableNumber = table.tableNumber;
    });
    const tableTotal = parseInt(lastTableNumber, 10) + parseInt(tablesNumber, 10);
    for (let i = lastTableNumber; i < tableTotal; i += 1) {
      TableModel.create({
        tableNumber: i + 1,
        tableStatus: 0,
      });
    }
    return res.status(200).json({
      message: 'create table success',
      error: data.length
    });
  }
  for (let i = 0; i < tablesNumber; i += 1) {
    console.log(i);
    TableModel.create({
      tableNumber: i + 1,
      tableStatus: 0,
    });
  }
  return res.status(200).json({
    message: 'create table success last table is 0'
  });
};

export const updateTable = async (req, res) => {
  const { number } = req.body;
  const { tableId } = req.params;
  if (!number || !tableId) {
    return res.status(400).json({
      message: 'All data is missing',
    });
  }
  const data = await TableModel.findOne({
    where: { tableNumber: number, tableStatus: 0 },
  });
  if (data) {
    return res.status(400).json({
      message: 'Table number already exist',
    });
  }
  try {
    await TableModel.update({
      tableNumber: number,
    }, { where: { tableId } });
    return res.status(200).json({
      message: 'update table success'
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error updating tables'
    });
  }
};

export const deleteTable = async (req, res) => {
  const { tableId } = req.params;
  if (!tableId) {
    return res.status(400).json({
      message: 'All data is missing',
    });
  }
  try {
    await TableModel.update({
      tableStatus: 1,
    }, { where: { tableId } });
    return res.status(200).json({
      message: 'delete table success'
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error deleting tables'
    });
  }
};
