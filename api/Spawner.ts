import axios from 'axios';

export interface Location {
  lat: number;
  long: number;
}

export default class Spawner {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getLocation(latitude: number, longitude: number): Promise<Location[]> {
    const url = `${this.baseUrl}/GetLocation?latitude=${latitude}&longitude=${longitude}`;
console.log(url);
    try {
      const response = await axios.post<Location[]>(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  }
}

