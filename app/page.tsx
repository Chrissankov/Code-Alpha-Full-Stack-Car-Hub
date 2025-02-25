"use client";

import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fetchCars } from "@/utils";
import { CarProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";

export default function Home() {
  // State for cars and loading
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(false);

  // Search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // Filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("2022"); // Change to string

  // Fetch cars based on filters
  const getCars = async () => {
    setLoading(true);
    try {
      const cars = await fetchCars({
        manufacturer: manufacturer || "",
        model: model || "",
        fuel: fuel || "",
        year: year || "2022",
      });
      setAllCars(cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cars when filters change
  useEffect(() => {
    getCars();
  }, [fuel, year, manufacturer, model]);

  // Check if data is empty
  const isDataEmpty = !Array.isArray(allCars) || allCars.length === 0;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
            model={model}
            setModel={setModel}
          />
          <div className="home__filter-container">
            <CustomFilter
              title="fuel"
              options={fuels}
              selected={fuel}
              setSelected={setFuel}
            />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              selected={year}
              setSelected={setYear}
            />
          </div>
        </div>
        {loading ? (
          <div className="mt-16 w-full flex-center">
            <p>Loading...</p>
          </div>
        ) : !isDataEmpty ? (
          <div className="home__cars-wrapper">
            {allCars.map((car) => (
              <CarCard key={`${car.make}-${car.model}`} car={car} />
            ))}
          </div>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>No cars found. Please try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
