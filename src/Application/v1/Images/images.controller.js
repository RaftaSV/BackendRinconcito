export const renderImage = async (req, res) => {
  const { image, dir } = req.params;
  try {
    res.sendFile(`${image}`, { root: `public/uploads/${dir}/` }, (err) => {
      if (err) {
        res.sendFile('ImagenNoDisponible.jpg', { root: 'public/uploads/' });
      }
    });
  } catch (err) {
    res.sendFile('ImagenNoDisponible.jpg', { root: 'public/uploads/' });
  }
};

