/* GET users listing. */
exports.getAllUsers = (req, res, next) => {
  res
    .status(500)
    .json({ status: 'err', method: 'GET', message: 'not implemented yet' });
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ status: 'success', method: 'GET', id: req.params.id });
};

exports.createUser = (req, res, next) => {
  //201 stand for creating a new resource
  res.status(201).json({ status: 'success', method: 'POST' });
};

exports.updateUser = (req, res, next) => {
  //201 stand for creating a new resource
  res.status(204).json({ status: 'success', method: 'PATCH' });
};

exports.deleteUser = (req, res, next) => {
  //201 stand for creating a new resource
  res.status(202).json({ status: 'success', method: 'DELETE' });
};
