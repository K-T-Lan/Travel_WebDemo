import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Travel Planner API
app.post("/api/ai/plan-trip", async (req, res) => {
  const { destination, days = 3, budget = "standard", travelStyle = "couple", interests = [] } = req.body;

  if (!destination) {
    return res.status(400).json({ error: "Destination is required" });
  }

  const ai = getAiClient();

  if (!ai) {
    // Graceful smart fallback when Gemini API Key is not set
    const fallbackPlan = generateFallbackItinerary(destination, Number(days), budget, travelStyle, interests);
    return res.json({ plan: fallbackPlan, source: "smart_template" });
  }

  try {
    const prompt = `Bạn là một chuyên gia du lịch hàng đầu tại Việt Nam và Đông Nam Á. 
Hãy thiết kế lịch trình du lịch chi tiết cho chuyến đi đến "${destination}".
Thông tin chuyến đi:
- Thời gian: ${days} ngày
- Mức ngân sách: ${budget} (tiết kiệm / tiêu chuẩn / sang trọng)
- Phong cách du lịch: ${travelStyle} (cặp đôi / gia đình có trẻ nhỏ / bạn bè phượt / nghỉ dưỡng thư thái)
- Sở thích quan tâm: ${interests.join(", ") || "Khám phá danh lam, ẩm thực, văn hóa địa phương"}

Hãy tạo lịch trình thực tế, logic về mặt địa lý di chuyển, kèm gợi ý các món ăn ngon đặc sản trứ danh và các mẹo hữu ích.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            durationDays: { type: Type.NUMBER },
            estimatedBudget: { type: Type.STRING, description: "Tổng chi phí ước tính (VND) cho 1 người" },
            travelStyle: { type: Type.STRING },
            overview: { type: Type.STRING, description: "Tóm tắt điểm nhấn độc đáo của chuyến đi" },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  title: { type: Type.STRING, description: "Chủ đề của ngày" },
                  morning: { type: Type.STRING, description: "Hoạt động và điểm tham quan buổi sáng" },
                  afternoon: { type: Type.STRING, description: "Hoạt động và trải nghiệm buổi chiều" },
                  evening: { type: Type.STRING, description: "Hoạt động, dạo phố, ngắm cảnh buổi tối" },
                  recommendedEats: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3-4 món ngon quán ăn đặc sắc trong ngày"
                  },
                  estimatedCost: { type: Type.STRING, description: "Chi phí dự kiến cho ngày này" }
                },
                required: ["day", "title", "morning", "afternoon", "evening", "recommendedEats", "estimatedCost"]
              }
            },
            packingTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4-5 lưu ý về hành lý, trang phục phù hợp với thời tiết điểm đến"
            },
            transportAdvice: { type: Type.STRING, description: "Lời khuyên về phương tiện di chuyển tại điểm đến" },
            localEtiquette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Mẹo giao tiếp, văn hóa bản địa hoặc lưu ý an toàn"
            }
          },
          required: ["destination", "durationDays", "estimatedBudget", "overview", "itinerary", "packingTips", "transportAdvice", "localEtiquette"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ plan: parsed, source: "gemini_ai" });
  } catch (error: unknown) {
    console.error("Gemini trip planner error:", error);
    // Fallback on failure
    const fallbackPlan = generateFallbackItinerary(destination, Number(days), budget, travelStyle, interests);
    return res.json({ plan: fallbackPlan, source: "fallback_after_error" });
  }
});

// Quick AI Travel Tips endpoint
app.post("/api/ai/quick-advisor", async (req, res) => {
  const { question, destination } = req.body;
  const ai = getAiClient();

  if (!ai || !question) {
    return res.json({
      answer: `Điểm đến ${destination || "Việt Nam"} rất đẹp và đáng trải nghiệm! Bạn nên chuẩn bị trang phục thoáng mát, kem chống nắng, mang theo máy ảnh và thử các món ăn đường phố đặc trưng tại đây nhé.`
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Là cố vấn du lịch Việt Nam giàu kinh nghiệm, hãy trả lời câu hỏi sau ngắn gọn, súc tích và thiết thực bằng tiếng Việt (dưới 120 từ):\nĐịa điểm: ${destination || "Du lịch Việt Nam"}\nCâu hỏi: ${question}`,
    });
    return res.json({ answer: response.text });
  } catch (err) {
    return res.json({
      answer: `Điểm đến ${destination || "Việt Nam"} có nhiều cảnh quan tuyệt sắc. Hãy liên hệ hỗ trợ viên hoặc tham khảo mục điểm đến nổi bật trên website của chúng tôi nhé!`
    });
  }
});

// Fallback smart itinerary generator
function generateFallbackItinerary(destination: string, days: number, budget: string, travelStyle: string, interests: string[]) {
  const budgetMultiplier = budget === "luxury" ? 3500000 : budget === "budget" ? 800000 : 1600000;
  const totalCost = (budgetMultiplier * days).toLocaleString("vi-VN") + " VNĐ";

  const sampleDays = [];
  for (let i = 1; i <= Math.min(days, 7); i++) {
    if (i === 1) {
      sampleDays.push({
        day: 1,
        title: `Chào đón đến ${destination} - Check-in & Khám phá trung tâm`,
        morning: `Di chuyển đến ${destination}, nhận phòng khách sạn / resort, nghỉ ngơi sau hành trình.`,
        afternoon: `Dạo quanh quảng trường, khám phá các góc phố biểu tượng và thưởng thức cà phê ngắm cảnh.`,
        evening: `Thưởng thức bữa tối ẩm thực địa phương đặc sản, dạo chợ đêm nhộn nhịp mua sắm quà lưu niệm.`,
        recommendedEats: [`Đặc sản địa phương ${destination}`, "Cà phê muối / Cà phê cốt dừa", "Món ăn vặt chợ đêm"],
        estimatedCost: `${(budgetMultiplier * 0.9).toLocaleString("vi-VN")} VNĐ`
      });
    } else if (i === 2) {
      sampleDays.push({
        day: 2,
        title: `Hành trình Thiên Nhiên & Danh Thắng Nổi Bật`,
        morning: `Dậy sớm đón bình minh tuyệt đẹp, tham quan danh lam thắng cảnh tiêu biểu và chụp ảnh kỷ niệm.`,
        afternoon: `Trải nghiệm các hoạt động ngoài trời hấp dẫn (chèo thuyền / tắm suối / cáp treo / lặn ngắm san hô).`,
        evening: `Ăn tối tại nhà hàng view đẹp, ngắm nhìn vẻ đẹp lung linh của thành phố về đêm.`,
        recommendedEats: ["Hải sản tươi sống / Món nướng than hoa", "Bánh truyền thống nóng hổi", "Chè thanh mát"],
        estimatedCost: `${(budgetMultiplier * 1.1).toLocaleString("vi-VN")} VNĐ`
      });
    } else if (i === 3) {
      sampleDays.push({
        day: 3,
        title: `Văn hóa Bản Địa & Mua Sắm Đặc Sản Làm Quà`,
        morning: `Ghé thăm các làng nghề truyền thống, bảo tàng văn hóa hoặc khu di tích lịch sử nổi tiếng.`,
        afternoon: `Mua sắm đặc sản khô, trà bánh chất lượng làm quà cho gia đình và bạn bè.`,
        evening: `Check-out, di chuyển ra sân bay / bến xe, kết thúc chuyến đi trọn vẹn với nhiều kỷ niệm đẹp.`,
        recommendedEats: ["Bún / Phở gia truyền trứ danh", "Đặc sản đóng gói mang về", "Nước ép trái cây nhiệt đới"],
        estimatedCost: `${(budgetMultiplier * 0.8).toLocaleString("vi-VN")} VNĐ`
      });
    } else {
      sampleDays.push({
        day: i,
        title: `Khám phá Điểm Đến Ẩn & Thư Giãn Bản Thân (Ngày ${i})`,
        morning: `Tham quan các điểm sinh thái ngoại ô ít người biết, tận hưởng không gian trong lành.`,
        afternoon: `Trải nghiệm spa thư giãn hoặc tham gia lớp học nấu ăn ẩm thực bản địa.`,
        evening: `Tự do khám phá các quán bar/acoustic nhẹ nhàng hoặc ngắm hoàng hôn bên bờ hồ/biển.`,
        recommendedEats: ["Món ăn fusion sáng tạo", "Bánh ngọt thủ công", "Rượu hoa quả lên men nhẹ"],
        estimatedCost: `${(budgetMultiplier * 1.0).toLocaleString("vi-VN")} VNĐ`
      });
    }
  }

  return {
    destination,
    durationDays: days,
    estimatedBudget: totalCost,
    travelStyle: travelStyle === "couple" ? "Cặp đôi lãng mạn" : travelStyle === "family" ? "Gia đình sum vầy" : travelStyle === "luxury" ? "Nghỉ dưỡng thượng lưu" : "Trải nghiệm khám phá",
    overview: `Chuyến du lịch ${days} ngày tại ${destination} được cá nhân hóa với sự cân bằng hoàn hảo giữa tham quan danh thắng ngoạn mục, ẩm thực bản sắc và không gian thư giãn tuyệt đối.`,
    itinerary: sampleDays,
    packingTips: [
      "Trang phục thoải mái, thấm hút mồ hôi và 1 bộ đồ thanh lịch chụp ảnh",
      "Giày thể thao êm chân hoặc sandal chống trượt khi di chuyển nhiều",
      "Kem chống nắng SPF 50+, mũ rộng vành và kính râm",
      "Sạc dự phòng, túi chống nước cho điện thoại khi đi biển/thác",
      "Thuốc cá nhân thông dụng (thuốc say xe, cảm sốt, xịt chống côn trùng)"
    ],
    transportAdvice: `Nên thuê xe máy nếu bạn thích tự do khám phá (${(150000).toLocaleString("vi-VN")}đ/ngày) hoặc đặt xe taxi công nghệ / xe dịch vụ trọn gói khi đi nhóm đông.`,
    localEtiquette: [
      "Mặc trang phục lịch sự kín đáo khi viếng thăm chùa chiền và di tích tâm linh",
      "Hỏi giá hoặc xem menu trước khi gọi món tại một số điểm du lịch đông đúc",
      "Giữ gìn vệ sinh môi trường, không vứt rác tại các bãi biển và thắng cảnh tự nhiên"
    ]
  };
}

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VietTravel Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
