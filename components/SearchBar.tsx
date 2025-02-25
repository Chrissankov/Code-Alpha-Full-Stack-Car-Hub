"use client";

import SearchManufacturer from "./SearchManufacturer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
  model: string;
  setModel: (model: string) => void;
}

const SearchButton = ({ otherClasses }: { otherClasses: string }) => {
  return (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="Search"
        width={40}
        height={40}
        className="object-contain"
      />
    </button>
  );
};

function SearchBar({
  manufacturer,
  setManufacturer,
  model,
  setModel,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const manufacturerFromUrl = searchParams.get("manufacturer") || "";
    const modelFromUrl = searchParams.get("model") || "";

    setManufacturer(manufacturerFromUrl);
    setModel(modelFromUrl);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manufacturer === "" && model === "") {
      return alert("Please fill in the search bar");
    }

    const updateSearchParams = (model: string, manufacturer: string) => {
      const searchParams = new URLSearchParams(window.location.search);

      if (model.trim() !== "") {
        searchParams.set("model", model.trim());
      } else {
        searchParams.delete("model");
      }

      if (manufacturer.trim() !== "") {
        searchParams.set("manufacturer", manufacturer.trim());
      } else {
        searchParams.delete("manufacturer");
      }

      const newPathname = `${
        window.location.pathname
      }?${searchParams.toString()}`;
      router.push(newPathname);
    };

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="Car Model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="searchbar__input"
          placeholder="Tiguan"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
}

export default SearchBar;
