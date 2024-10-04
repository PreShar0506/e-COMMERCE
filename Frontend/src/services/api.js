// src/services/api.js
import t_shirts from "../../src/assets/images/t_shirts.jfif";
import classic_t_shirt1 from "../../src/assets/images/classic_t_shirt1.jfif";
import classic_t_shirt2 from "../../src/assets/images/classic_t_shirt2.jfif"
import jense from "../../src/assets/images/jense.jfif";
import jense1 from "../../src/assets/images/jense1.jfif";
import jense2 from "../../src/assets/images/jense2.jfif";
import Cottontshirt1 from "../../src/assets/images/Cottontshirt1.jfif";
import CottontShirt2 from "../../src/assets/images/CottontShirt2.jfif";
import shirtsForWomen1 from "../../src/assets/images/shirtsForWomen1.jfif";
import shirtsForWomen2 from "../../src/assets/images/shirtsForWomen2.jfif";
import shirtsForMen1 from "../../src/assets/images/shirtsForMen1.jfif";
import shirtsForMen2 from "../../src/assets/images/shirtsForMen2.jfif";
import sneakers from "../../src/assets/images/sneakers.jfif";
import CottonTshirt from "../../src/assets/images/cotton_t_shirt.jfif";
import shirtsForMen from "../../src/assets/images/shirts _for _men.jfif";
import shirtsForWomen from "../../src/assets/images/shirts _for _women.jfif";
// Sample product data
const images=[
  {image:[t_shirts, classic_t_shirt1, classic_t_shirt2],name:"Classic T-Shirt"},
  {image:[jense, jense1, jense2],name:"Jeans"},
  {image:[sneakers],name:"Sneakers"},
  {image:[CottonTshirt, Cottontshirt1, CottontShirt2],name:"Cotton T-shirt"},
  {image:[shirtsForWomen, shirtsForWomen1, shirtsForWomen2],name:"Shirts for Women"},
  {image:[shirtsForMen, shirtsForMen1, shirtsForMen2],name:"Shirts for Men"}
]

// Simulate API delay
//const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchImages = async () => {
  return images;
};

export const fetchProductById = async (id) => {
  await delay(500);
  return products.find((product) => product.id === parseInt(id));
};
