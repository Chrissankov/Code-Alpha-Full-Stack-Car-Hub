import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string; // Required string 
    // ?: -> Optional
    containerStyles?: string; //  Optional string
    handleClick?: MouseEventHandler<HTMLButtonElement>; // Optional function (MouseEventHandler) that runs on click
    btnType?: "button" | "submit"; // Optional "button" or "submit"
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface SearchManufacturerProps {
    manufacturer: string; // A string storing the selected car manufacturer
    setManufacturer: (manufacturer: string) => void; // A function that updates the manufacturer
}

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface OptionProps{
    title: string;
    value: string;
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
    selected: string;
    setSelected: (selected: string) => void;
  }