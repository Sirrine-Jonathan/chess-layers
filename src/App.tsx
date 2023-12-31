import React, { useState, useEffect } from "react";
import "./App.scss";
import { ChessBoard } from "./chessBoard/ChessBoard";
import { useIsMobile } from "./hooks/useIsMobile";
import clsx from "clsx";
import { GameType, getGameType } from "./utils";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Bot } from "./chessBoard/state/game/bot";

const DEFAULT_LEVEL = 3;

let isBotOk = false;
export const ChessLayersBot = new Bot(-1);

function App() {
  const isMobile = useIsMobile();
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [isBotOk, setIsBotOk] = useState(false);
  const type = getGameType();
  let inGame = Object.values(GameType).includes(type);

  useEffect(() => {
    if (isBotOk) {
      return;
    }
    ChessLayersBot.checkStockfish()
      .then(() => {
        setIsBotOk(true);
      })
      .catch(() => {
        setIsBotOk(false);
      });
  }, [ChessLayersBot]);

  return (
    <div className={clsx(["App", isMobile && "isMobile"])}>
      {inGame ? (
        <ChessBoard />
      ) : (
        <div>
          <div className="welcome">
            <h1>Chess Layers</h1>
            <div className="welcomeInputs">
              <div className="trainerInputs">
                <div>Play with computer that always plays random moves</div>
                <div className="trainerButtons">
                  <a href={`/trainer/w`}>White</a>
                  <a href="/trainer/b">Black</a>
                  <a href="/trainer/random">Random</a>
                </div>
              </div>
              {isBotOk ? (
                <div className="stockfishInputsOuter">
                  <div>Challenge Stockfish: Level {level}</div>
                  <div className="stockfishInputs">
                    <Slider
                      min={0}
                      max={20}
                      defaultValue={DEFAULT_LEVEL}
                      onChange={(val) =>
                        setLevel(Array.isArray(val) ? val[0] : val)
                      }
                      styles={{
                        handle: {
                          backgroundColor: "#004777",
                          outline: "none",
                          border: "solid 2px #0065a9",
                        },
                        rail: { backgroundColor: "#ffffff" },
                        track: { backgroundColor: "#D65757" },
                      }}
                      dotStyle={{
                        borderColor: "#D65757",
                        color: "#D65757",
                        borderWidth: 1,
                      }}
                      activeDotStyle={{
                        borderColor: "#D65757",
                        color: "#ffffff",
                        borderWidth: 1,
                      }}
                    />
                  </div>
                  <div className="stockfishButtons">
                    <a href={`/stockfish/${level}/w`}>White</a>
                    <a href={`/stockfish/${level}/b`}>Black</a>
                    <a href={`/stockfish/${level}`}>Random</a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="loadingSpinner">
            <div />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
