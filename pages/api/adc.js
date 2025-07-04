let history = []; // lưu dữ liệu tạm thời trong RAM

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { temp } = req.body;
    const newEntry = { temp, time: new Date().toISOString() };
    history.push(newEntry);
    if (history.length > 100) history.shift(); // chỉ giữ 100 điểm
    return res.status(200).json({ message: 'Đã nhận', data: newEntry });
  }

  if (req.method === 'GET') {
    return res.status(200).json(history);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
