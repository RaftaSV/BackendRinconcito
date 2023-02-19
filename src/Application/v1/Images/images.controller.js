export const renderImage = async (req, res) => {
  const { image, dir } = req.params;
  try {
    res.sendFile(`${image}`, { root: `public/uploads/${dir}/` });
  } catch (err) {
    res.status(404).json({
      message: 'file not found'
    });
  }
};
