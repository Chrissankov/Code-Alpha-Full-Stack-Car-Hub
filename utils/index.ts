export async function fetchCars(filters: {
  manufacturer?: string;
  model?: string;
  fuel?: string;
  year?: string;
}) {
  const { manufacturer = "Toyota", model = "", fuel = "", year = "2022" } = filters;

  const headers = {
    "x-rapidapi-key": "e43ac5542amsh40d991482df105dp1a4839jsn8ba4824f779c",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  try {
    const url = new URL("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars");

    // Append parameters if they exist
    if (manufacturer && manufacturer.trim() !== "") {
      url.searchParams.append("make", manufacturer.trim());
    }
    if (model && model.trim() !== "") {
      url.searchParams.append("model", model.trim());
    }
    if (fuel && fuel.trim() !== "") {
      url.searchParams.append("fuel_type", fuel.trim());
    }
    if (year && year.trim() !== "") {
      url.searchParams.append("year", year.trim());
    }

    console.log("Fetching cars from:", url.toString()); // Debugging: Log the URL

    const response = await fetch(url.toString(), { headers });

    console.log("API Response Status:", response.status); // Debugging: Log the response status

    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data); // Debugging: Log the response data
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}

export async function fetchCarImages(make: string, model: string) {
  const apiKey = "49053587-43624fc6e23f1421b866a8c09";
  let query = `${make} ${model}`.replace(/[0-9/]/g, ""); 
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Pixabay API Response:", data);

    if (!data.hits || data.hits.length === 0) {
      console.warn(`No images found for ${query}. Trying a simpler search...`);
      query = make; // Try searching only by brand
      const retryUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo`;

      const retryResponse = await fetch(retryUrl);
      const retryData = await retryResponse.json();

      if (!retryData.hits || retryData.hits.length === 0) {
        console.warn(`Still no images for ${make}.`);
        return [];
      }
      return retryData.hits.map((img: any) => img.webformatURL);
    }

    return data.hits.map((img: any) => img.webformatURL);
  } catch (error) {
    console.error("Error fetching car images:", error);
    return [];
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  return (basePricePerDay + mileageRate + ageRate).toFixed(0);
};