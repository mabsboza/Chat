const Message = require('../models/message')

const getMessages = async (req, res) => {
  const myUid = req.uid;
  const messageFrom = req.params.from

  const lastMessages = await Message.find({
    $or: [
      { from: myUid, for: messageFrom },
      { from: messageFrom, for: myUid },
    ]
  })
  .sort({ createdAt: 'desc'})
  .limit(30);

  res.json({
    ok: true,
    lastMessages
  });
}

module.exports = {
  getMessages
}