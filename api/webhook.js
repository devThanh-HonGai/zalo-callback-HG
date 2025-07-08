module.exports = async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;
      console.log("📩 Dữ liệu POST từ Zalo:", JSON.stringify(body));

      if (
        body.event_name === "user_send_text" &&
        body.message &&
        /^\d+$/.test(body.message.text) &&
        body.sender && body.sender.id
      ) {
        const user_id = body.sender.id;
        const sbd = body.message.text;

        const response = await fetch("https://script.google.com/macros/s/AKfycbwBUnSg7O6rRAPmpqjrPwkCTUCrC7EVwGOb-1i8NsANOdqfMEUXSLxBzqzN7yXveQ0/exec", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, sbd }),
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
};
