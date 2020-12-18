exports.sendErrorResponse = (res, status, err) => {
  res.status(status).json({ err })
}

exports.sendDataResponse = (res, data) => {
  res.json({ ...data })
}

exports.sendMsgResponse = (res, msg) => {
  res.json({ msg })
}

exports._idStrippedDoc = doc => {
  const { _id, __v, ...restDoc } = doc
  return restDoc
}
