import { API_URL } from "@/config/api";
import { Duty } from "./type";
import { CreateDuty } from "@/widgets/duty/schema";

class DutyService {
  async getRecorded(floorNumber: number): Promise<Duty[]> {
    const res = await fetch(`${API_URL}/duty/recorded/${floorNumber}`);
    console.log(res);
    return await res.json();
  }

  async create(data: CreateDuty) {
    const res = await fetch(`${API_URL}/duty/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
}

export const dutyService = new DutyService();
