import React, { useState } from "react";
import axios from "axios";
import Sticker from "./Sticker";
import ScrollMenu from "react-horizontal-scrolling-menu";

import bigStar from "../../../resources/sticker_bigstar.gif";
import broke from "../../../resources/sticker_broke.gif";
import cattrombone from "../../../resources/sticker_cattrombone.gif";
import chameleon from "../../../resources/sticker_chameleon.gif";
import cooldog from "../../../resources/sticker_cooldog.gif";
import crybaby from "../../../resources/sticker_crybaby.gif";
import diamond from "../../../resources/sticker_diamond.gif";
import disco from "../../../resources/sticker_disco.gif";
import love from "../../../resources/sticker_love.gif";
import mario from "../../../resources/sticker_mario.gif";
import memedog from "../../../resources/sticker_memedog.gif";
import pbj from "../../../resources/sticker_pbj.gif";
import pizzamouse from "../../../resources/sticker_pizzamouse.gif";
import underpaid from "../../../resources/sticker_underpaid.gif";
import whocares from "../../../resources/sticker_whocares.gif";
import whatsup from "../../../resources/sticker_whatsup.gif";
import tooretro from "../../../resources/sticker_tooretro.gif";
import gameboy from "../../../resources/sticker_gameboy.gif";
import game from "../../../resources/sticker_game.gif";
import thirdeye from "../../../resources/sticker_thirdeye.gif";
import planet from "../../../resources/sticker_planet.gif";
import savage from "../../../resources/sticker_savage.gif";
import toy from "../../../resources/sticker_toy.gif";
import dolphins from "../../../resources/sticker_dolphins.gif";
import patrick from "../../../resources/sticker_patrick.gif";
import eye from "../../../resources/sticker_eye.gif";
import car from "../../../resources/sticker_car.gif";
import spiderman from "../../../resources/sticker_spiderman.gif";
import racoon from "../../../resources/sticker_racoon.gif";
import pretty from "../../../resources/sticker_pretty.gif";
import notok from "../../../resources/sticker_notok.gif";
import pig from "../../../resources/sticker_pig.gif";
import flash from "../../../resources/sticker_flash.gif";
import snow from "../../../resources/sticker_snow.gif";
import shine from "../../../resources/sticker_shine.gif";
import fallingstars from "../../../resources/sticker_fallingstars.gif";
import lights from "../../../resources/sticker_lights.gif";
import gold from "../../../resources/sticker_gold.gif";

const defaultStickers = [
  bigStar,
  broke,
  cattrombone,
  chameleon,
  cooldog,
  crybaby,
  diamond,
  disco,
  love,
  mario,
  memedog,
  pbj,
  pizzamouse,
  underpaid,
  whocares,
  whatsup,
  tooretro,
  gameboy,
  game,
  thirdeye,
  planet,
  savage,
  toy,
  dolphins,
  patrick,
  eye,
  car,
  spiderman,
  racoon,
  pretty,
  notok,
  pig,
  flash,
  snow,
  shine,
  fallingstars,
  lights,
  gold,
];

const PATH_BASE = "https://api.giphy.com/v1/gifs/search?api_key=";
const API_KEY = "1EuwKzAcNC4mhc4PhsAya1gwhX5A1fRO";
const DEFAULT_QUERY = "&q=transparent";
const PATH_LIMITS = "&limit=25&offset=";
const PATH_RATING = "&rating=G&lang=en";

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

const GiphySearchForm = () => {
  const [stickerArray, setStickerArray] = useState(defaultStickers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearch, setCurrentSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const setResults = (APIResponse) => {
    const urlArray = APIResponse.map((gif) => {
      return gif.images.downsized_large.url;
    });
    setStickerArray(urlArray);
  };

  const searchGiphy = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

    setCurrentSearch(searchTerm);
    
    axios(
      `${PATH_BASE}${API_KEY}${DEFAULT_QUERY} ${searchTerm}${PATH_LIMITS}${offset}${PATH_RATING}`
    )
      .then((res) => {
        setResults(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const updateResults = (APIResponse) => {
    const oldArray = stickerArray;
    APIResponse.map((gif) => {
      oldArray.push(gif.images.downsized_large.url);
    });
    setStickerArray(oldArray);
    setIsLoading(false);
  };

  const loadMoreStickers = () => {
    if (!currentSearch || isLoading) {
      return;
    }
    setIsLoading(true);
    setOffset(offset + 1);
    axios(
      `${PATH_BASE}${API_KEY}${DEFAULT_QUERY} ${currentSearch}${PATH_LIMITS}${offset}${PATH_RATING}`
    )
      .then((res) => {
        updateResults(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  const printImages = () => {
    return stickerArray.map((sticker, index) => {
      return <Sticker img={sticker} key={index} />;
    });
  };

  return (
    <div className="giphy_box">
      <form onSubmit={(e) => searchGiphy(e)} className="giphy_search_form">
        <input
          className="giphy_search_input"
          name="giphy_search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e)}
          placeholder="search stickers!"
          required="required"
        />
      </form>
      <div className="sticker_selector">
        <ScrollMenu
          className="scrollmenu"
          data={printImages()}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          onLastItemVisible={() => loadMoreStickers()}
        />
      </div>
    </div>
  );
};

export default GiphySearchForm;
