"use client";

import { CarProps } from "@/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { calculateCarRent, fetchCarImages } from "@/utils";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

function CarCard({ car }: CarCardProps) {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);
  const [carImages, setCarImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const carRent = calculateCarRent(city_mpg, year);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const images = await fetchCarImages(make, model);
        console.log("Fetched images:", images); // Debugging
        setCarImages(images.length > 0 ? images : []);
      } catch (error) {
        console.error("Error loading car images:", error);
      }
      setIsLoading(false);
    };
    loadImages();
  }, [make, model]);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        {isLoading ? (
          <div className="animate-pulse bg-gray-200 w-full h-full"></div>
        ) : carImages.length > 0 ? (
          <Image
            src={carImages[0]}
            alt={`${make} ${model}`}
            fill
            priority
            className="object-contain"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <p className="text-gray-500 text-sm">No image available</p>
          </div>
        )}
      </div>
      <div className="relative flex w-full ">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2 mt-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="Transmission"
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 mt-2">
            <Image src="/tire.svg" width={20} height={20} alt="Drive" />
            <p className="text-[14px]">{drive}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 mt-2">
            <Image src="/gas.svg" width={20} height={20} alt="MPG" />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
        carImages={carImages}
      />
    </div>
  );
}

export default CarCard;
