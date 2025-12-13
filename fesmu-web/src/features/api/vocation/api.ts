import { API_URL } from "@/config/api";
import { CreateVocation } from "@/widgets/vacation/schema";

class VocationService {
  async create(data: CreateVocation) {
    try {
      const res = await fetch(`${API_URL}/vocations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = new Error("Не удалось записаться");
        throw error;
      }

      return await res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const vocationService = new VocationService();
