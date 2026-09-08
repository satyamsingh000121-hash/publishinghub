import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { successResponse, errorResponse } from "@/lib/api-response";
import { defaultAdminPromoData } from "@/lib/adminPromoData";
import { SidebarPromoData } from "@/types/promo";

const dataFilePath = path.join(process.cwd(), "data", "promo.json");

function getStoredPromoData(): SidebarPromoData {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, "utf8");
      const parsed = JSON.parse(fileContent);
      return { ...defaultAdminPromoData, ...parsed };
    }
  } catch (err) {
    console.error("Error reading promo.json:", err);
  }
  return defaultAdminPromoData;
}

export async function GET() {
  const data = getStoredPromoData();
  return successResponse(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const updatedData: SidebarPromoData = {
      title: typeof body.title === "string" ? body.title : defaultAdminPromoData.title,
      offer: typeof body.offer === "string" ? body.offer : defaultAdminPromoData.offer,
      description: typeof body.description === "string" ? body.description : defaultAdminPromoData.description,
      buttonText: typeof body.buttonText === "string" ? body.buttonText : defaultAdminPromoData.buttonText,
      buttonUrl: typeof body.buttonUrl === "string" ? body.buttonUrl : defaultAdminPromoData.buttonUrl,
      isActive: typeof body.isActive === "boolean" ? body.isActive : Boolean(body.isActive),
      badge: typeof body.badge === "string" ? body.badge : undefined,
      imageUrl: typeof body.imageUrl === "string" && body.imageUrl.trim() ? body.imageUrl.trim() : undefined,
      topBannerText: typeof body.topBannerText === "string" ? body.topBannerText : defaultAdminPromoData.topBannerText,
      topBannerButtonText: typeof body.topBannerButtonText === "string" ? body.topBannerButtonText : defaultAdminPromoData.topBannerButtonText,
      topBannerButtonUrl: typeof body.topBannerButtonUrl === "string" ? body.topBannerButtonUrl : defaultAdminPromoData.topBannerButtonUrl,
      topBannerActive: typeof body.topBannerActive === "boolean" ? body.topBannerActive : defaultAdminPromoData.topBannerActive,
      newArrivalSubtitle: typeof body.newArrivalSubtitle === "string" ? body.newArrivalSubtitle : defaultAdminPromoData.newArrivalSubtitle,
      newArrivalTitle: typeof body.newArrivalTitle === "string" ? body.newArrivalTitle : defaultAdminPromoData.newArrivalTitle,
      newArrivalDiscount: typeof body.newArrivalDiscount === "string" ? body.newArrivalDiscount : defaultAdminPromoData.newArrivalDiscount,
      newArrivalDescription: typeof body.newArrivalDescription === "string" ? body.newArrivalDescription : defaultAdminPromoData.newArrivalDescription,
      newArrivalButtonText: typeof body.newArrivalButtonText === "string" ? body.newArrivalButtonText : defaultAdminPromoData.newArrivalButtonText,
      newArrivalButtonUrl: typeof body.newArrivalButtonUrl === "string" ? body.newArrivalButtonUrl : defaultAdminPromoData.newArrivalButtonUrl,
      newArrivalImage: typeof body.newArrivalImage === "string" && body.newArrivalImage.trim() ? body.newArrivalImage.trim() : defaultAdminPromoData.newArrivalImage,
    };

    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2), "utf8");

    return successResponse(updatedData, "Promotional card updated successfully");
  } catch (err: any) {
    console.error("Error saving promo data:", err);
    return errorResponse(err?.message || "Failed to update promotional card", 500);
  }
}
