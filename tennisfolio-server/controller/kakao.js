import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const approvalData = {};

const kakaoHeaders = {
  Authorization: `SECRET_KEY ${process.env.Kakao_Secret_KEY}`,
  "Content-Type": "application/json",
};

export const kakaoReady = async (req, res) => {
  const { orderId, userId, itemName, quantity, totalAmount } = req.body;

  try {
    const readyURL = "https://open-api.kakaopay.com/online/v1/payment/ready";
    const data = {
      cid: "TC0ONETIME",
      partner_order_id: orderId,
      partner_user_id: userId,
      item_name: itemName,
      quantity,
      total_amount: totalAmount,
      tax_free_amount: 0,
      approval_url: `https://transfer-divisible-deputy.ngrok-free.dev/kakao/approve?partner_order_id=${orderId}`,
      cancel_url: "https://transfer-divisible-deputy.ngrok-free.dev/checkout/cancel",
      fail_url: "https://transfer-divisible-deputy.ngrok-free.dev/checkout/fail",
    };

    const readyResponse = await axios.post(readyURL, data, { headers: kakaoHeaders });
    const { tid, next_redirect_mobile_url } = readyResponse.data;

    approvalData[orderId] = {
      tid,
      orderId,
      userId,
      status: "ready",
    };

    res.json({
      tid,
      next_redirect_mobile_url,
    });
  } catch (error) {
    console.error("카카오페이 준비 실패:", error.response?.data || error.message);
    res.status(500).json({
      error: "카카오페이 준비 실패",
      detail: error.response?.data,
    });
  }
};

export const kakaoApprove = async (req, res) => {
  const { pg_token, partner_order_id } = req.query;
  const saved = approvalData[partner_order_id];

  if (!saved) {
    return res.status(400).json({ error: "유효하지 않은 주문입니다." });
  }

  try {
    const approveURL = "https://open-api.kakaopay.com/online/v1/payment/approve";
    const data = {
      cid: "TC0ONETIME",
      tid: saved.tid,
      partner_order_id: saved.orderId,
      partner_user_id: saved.userId,
      pg_token,
    };

    const approveResponse = await axios.post(approveURL, data, { headers: kakaoHeaders });
    approvalData[partner_order_id] = {
      ...saved,
      status: "approved",
      approvedAt: new Date().toISOString(),
      approveData: approveResponse.data,
    };

    res.redirect("http://192.168.20.75:5173/checkout/success");
    
  } catch (error) {
    console.error("카카오페이 승인 실패:", error.response?.data || error.message);
    res.status(500).json({
      error: "카카오페이 승인 실패",
      detail: error.response?.data,
    });
  }
};

export const kakaoStatus = (req, res) => {
  const { orderId } = req.params;
  const saved = approvalData[orderId];

  if (!saved) {
    return res.json({ status: "none" });
  }

  res.json({ status: saved.status });
};
