exports.sendErrorResponse = (res, status, err) => {
  res.status(status).json({ err })
}

exports.sendResponse = (res, data) => {
  res.json({ ...data })
}

exports._idStrippedDoc = doc => {
  const { _id, ...restDoc } = doc
  return restDoc
}
