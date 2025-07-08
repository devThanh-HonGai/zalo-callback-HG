export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dùng cho xác thực webhook
    const verifyToken = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (verifyToken === "zalo_verify_token") {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Forbidden");
    }
  } else if (req.method === 'POST') {
    // Xử lý sự kiện Zalo gửi về (ví dụ: gửi tin nhắn, quan tâm OA,...)
    console.log("📩 Sự kiện từ Zalo:", req.body);
    return res.status(200).json({ message: "Nhận sự kiện thành công" });
  }
}
