export default async function handler(req, res) {
  if (req.method === "GET") {
    // ✅ Bước xác thực webhook Zalo với app_verify
    const { "app_id": appId, "verify_token": token, "code": challenge } = req.query;
    if (!token || !challenge) {
      return res.status(400).send("Missing parameters");
    }
    // Có thể thêm xác minh token nếu muốn
    return res.status(200).send(challenge);
  }

  if (req.method === "POST") {
    try {
      const oaSecretKey = process.env.EQK64U917a7KphfWXEF3;
      const googleWebhookUrl = process.env.https://script.google.com/macros/s/AKfycbxJnhg5LL4nLujz2eTGvqwwttnOkK5lJEk2np5_F_F4ZVn855JtSQp5XFgXMHqUi3c/exec;

      const body = req.body;
      console.log("📩 Dữ liệu POST từ Zalo:", JSON.stringify(body));

      // ✅ Chỉ xử lý sự kiện người dùng gửi tin nhắn text
      if (
        body.event_name === "user_send_text" &&
        body.message &&
        /^\d+$/.test(body.message.text) && // chỉ nhận tin là chuỗi toàn số
        body.sender && body.sender.id
      ) {
        const user_id = body.sender.id;
        const so_bao_danh = body.message.text;

        // Gửi dữ liệu về Apps Script
        const response = await fetch(googleWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, so_bao_danh }),
        });

        console.log("📤 Gửi dữ liệu tới Apps Script:", await response.text());
      }

      res.status(200).json({ message: "Đã nhận sự kiện" });
    } catch (error) {
      console.error("❌ Lỗi xử lý webhook:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}

