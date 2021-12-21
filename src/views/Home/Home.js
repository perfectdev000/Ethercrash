import React, { useState, useEffect } from 'react'
import useInterval from 'react-useinterval'
import cn from 'classnames'
import { messages as initialMesages } from '../Home/ChatMessages'
import { Link } from 'react-router-dom'
import Chat from '../Home/Chat'
import './Home.css'

let axisStep = (step, add = 0) => {
  let result = []
  let val = add + step
  for (let i = 1; i < 20; i++) {
    result.push(val)
    val += step
  }
  return result
}

let Players = (props) => {
  let { items } = props

  return (
    <div className="Table --players">
      <div className="Table_cell --header">User</div>
      <div className="Table_cell --header">@</div>
      <div className="Table_cell --header">Bet</div>
      <div className="Table_cell --header">Profit</div>
      {items.map((P, PInd) => (
        <>
          <div className={cn('Table_cell', {'--odd': PInd % 2 == 0})}>{P.name}</div>
          <div className={cn('Table_cell', {'--odd': PInd % 2 == 0})}>{P.at}</div>
          <div className={cn('Table_cell', {'--odd': PInd % 2 == 0})}>{P.bet}</div>
          <div className={cn('Table_cell', {'--odd': PInd % 2 == 0})}>{P.profit}</div>
        </>
      ))}
    </div>
  )
}

let resultVariants = [5.37, 7.60, 3.39, 8.98, 10.20, 18.29, 18.15, 18.38, 0.2, 19.82, 19.64, 20.00, 20.00, 8.31, 7.12, 4.38, 3.38, 15.52, 20.00,
  18.02, 19.09, 10.06, 11.28, 7.13, 0.12, 13.83, 14.92, 14.04, 15.38, 4.93, 11.29, 12.50, 13.00, 1.31, 14.20, 15.10, 16.79, 16.2, 12.8, 20.00, 12.99]

let Home = () => {
  let [loginActive, $loginActive] = useState(false)
  let [tabActive, $tabActive] = useState(0)
  let [history, $history] = useState([1.19, 1.01, 3.02, 1.09, 1.2, 3.13, 20.0])
  let [count, $count] = useState(0)
  let [coords, $coords] = useState([])
  let [lines, $lines] = useState([])
  let [width, $width] = useState(0)
  let [height, $height] = useState(0)
  let [value, $value] = useState(0)
  let [avaibleResults, $avaibleResults] = useState([...resultVariants])
  let [targetResult, $targetResult] = useState(0)

  let [xAxis, $xAxis] = useState([])
  let [yAxis, $yAxis] = useState(axisStep(0.2, 0.8))

  let [betAmount, $betAmount] = useState(1)
  let [betType, $betType] = useState(0)

  let [messages, $messages] = useState(initialMesages)

  let $betTypeBound = x => () => $betType(x)
  let $tabActiveBound = x => () => $tabActive(x)

  let $amountChange = (e) => {
    $betAmount(parseInt(e.target.value))
  }

  useInterval(() => {
    if (targetResult == 0) {
      let _results = avaibleResults
      let _targetResultIndex = Math.floor(Math.random() * _results.length)
      $targetResult(_results[_targetResultIndex])
      _results.splice(_targetResultIndex, 1)
      if (_results.length === 0) {
        _results = [...resultVariants]
      }
      $avaibleResults(_results)
    }

    // console.log(value(), targetResult())
    if (value > targetResult) {

      let _history = history
      _history.pop()
      $history([value.toPrecision(3), ..._history])
      $count(0)
      $targetResult(0)
      return;
    }

    $count(count + 1);
  }, 120)

  //onCleanup(() => clearInterval(interval));

  useEffect(() => {
    if (count == 0) {
      $coords([])
      $width(0)
      $height(0)
      $value(0)
    } else {
      let _coords = coords
      let value = _coords.length == 0 ? 1 : _coords[_coords.length - 1].y

      for (let i = 0; i < count - _coords.length; i++) {
        let x = _coords.length + i
        let y = value * 1.01
        value = y
        _coords.push({ x, y })
      }

      let _lines = []
      let pointCount = 20
      for (let i = 0; i < pointCount; i++) {
        let index1 = Math.floor(i * (_coords.length - 1) / pointCount)
        let index2 = Math.floor((i + 1) * (_coords.length - 1) / pointCount)
        _lines.push({
          x1: _coords[index1].x, y1: (_coords[index1].y - 1),
          x2: _coords[index2].x, y2: (_coords[index2].y - 1),
        })
      }

      $lines(_lines)
      let lastCoord = _lines[_lines.length - 1]
      $width(Math.ceil(Math.max(75, lastCoord.x1) * 40) / 40)
      $height(Math.ceil(Math.max(1, lastCoord.y1) * 40) / 40)
      $value(value)
      $coords(_coords)
    }
  })

  let koeffX = x => x * 3 / width * 100 + 15
  let koeffY = y => 180 - (y * 100 / height * 2) - 15

  useEffect(() => {
    let _xAxis = []
    if (width < 100) {
      _xAxis = axisStep(1)
    } else if (width < 150) {
      _xAxis = axisStep(2)
    } else if (width < 225) {
      _xAxis = axisStep(4)
    } else if (width < 575) {
      _xAxis = axisStep(8)
    } else {
      _xAxis = axisStep(16)
    }
    $xAxis(_xAxis)
  })

  useEffect(() => {
    let _yAxis = []
    if (value < 2) {
      _yAxis = axisStep(0.2, 0.8)
    } else if (value < 4) {
      _yAxis = axisStep(0.4, 0.6)
    } else if (value < 8) {
      _yAxis = axisStep(0.8, 0.2)
    } else if (value < 16) {
      _yAxis = axisStep(1.6, -0.4)
    } else if (value < 32) {
      _yAxis = axisStep(3.2, -1.2)
    } else if (value < 64) {
      _yAxis = axisStep(6.4, -4.4)
    } else if (value < 128) {
      _yAxis = axisStep(12.8, -10.8)
    } else {
      _yAxis = axisStep(16)
    }
    $yAxis(_yAxis)
  })

  let players = [
    { name: 'Lastgame', at: '-', bet: 30000, profit: -30000 },
    { name: 'redrumguerilla', at: '-', bet: 2500, profit: -2500 },
    { name: 'moogle', at: '-', bet: 65, profit: 260 },
    { name: 'Raincup', at: '-', bet: 64, profit: 256 },
    { name: 'dev92', at: '-', bet: 64, profit: 256 },
    { name: 'Amarante', at: '-', bet: 64, profit: 256 },
    { name: 'Dk18', at: '-', bet: 48, profit: 192 },
    { name: 'JAPAN-com', at: '-', bet: 32, profit: 128 },
    { name: 'Suncup', at: '-', bet: 32, profit: 128 },
    { name: 'KTPL', at: '-', bet: 32, profit: 128 },
    { name: 'Visions', at: '-', bet: 32, profit: 128 },
    { name: 'river', at: '-', bet: 16, profit: 64 },
    { name: 'illy', at: '-', bet: 16, profit: 64 },
    { name: 'goguma', at: '-', bet: 16, profit: 64 },
    { name: 'poloman', at: '-', bet: 8, profit: 32 },
    { name: 'DEV1010', at: '-', bet: 1, profit: 4 },
    { name: 'DEV1010', at: '-', bet: '?', profit: '-' },
  ]

  let LoginHandler = () => {
    $loginActive(true)
  }

  return (
    <div className="App">
      <div className="Screen">
        <header className="Header">
          <div className="Header_logo">
            BE
          </div>
          <div className="Header_score">
            Ethos: 0.00
            Bit: 0.00
          </div>
          <div className="Header_auth AuthLinks">
            {loginActive 
              ? <Link className="AuthLinks_link" to="/game">Tinenmi</Link>
              : (
                <>
                  <Link className="AuthLinks_link" to="/login">Login</Link>
                  <Link className="AuthLinks_link" to="/register">Register</Link>
                </>
              )}
          </div>
        </header>
        <div className="Row">
          <div className="Column">
            <div className="GameWrapper">
              <div className="Game">
                <div className="Game_text">SOCIAL ETHEREUM GAMBLING</div>
                <div className="Game_graphic">
                  <svg fill="white" width="300px" height="180px" viewBox="0 0 300 180">
                    <style>
                      {'.small { font: 7px sans-serif; }'}
                    </style>
                    <linearGradient id="linear-gradient">
                      <stop offset="0%" stopColor="gold" />
                      <stop offset="100%" stopColor="teal" />
                    </linearGradient>

                    {yAxis.map((Y, YInd) => (
                      YInd == 0
                        ? ''
                        : <text key={YInd} x="0" y={170 - 170 * (Y - 1) / yAxis.length * 12 / height} className="small">{Y.toPrecision(2)}</text>
                    ))}

                    <text x="9" y="172" className="small">0</text>

                    {xAxis.map((X, XInd) => (
                       <text key={XInd} x={30 + 270 * (X - 1) / xAxis.length * 2 / width * 75} y="175" className="small">{X}</text>
                    ))}

                    <line x1={15} y1={165} x2={300} y2={165} stroke="white" />
                    <line x1={15} y1={165} x2={15} y2={0} stroke="white" />
                    {lines.map((c, cInd) =>
                        <line key={cInd} x1={koeffX(c.x1)} y1={koeffY(c.y1)} x2={koeffX(c.x2)} y2={koeffY(c.y2)} stroke="white" />
                    )}
                  </svg>
                </div>
                <div className="Game_value">
                  {value.toPrecision(3)}x
                </div>
                <div className="Game_history GameHistory">
                  {history.map((I, IInd) => (
                     <div key={IInd} className={cn('GameHistory_item', { '--loose': I < 2, '--win': I >= 2 })}>{I}x</div>
                  ))}
                </div>
              </div>
              {!loginActive && <div className="Auth">
                <div className="Auth_button">
                  <button className="Button" onClick={LoginHandler}>Login to play</button>
                </div>
                <div className="Auth_link">
                  <a className="Link">or register</a>
                </div>
              </div>}
              {loginActive && <div className="Bet">
                <div className="Bet_line BetInput">
                  <div className="BetInput_field">
                    <div className="BetInput_label">Bet</div>
                    <input className="BetInput_input" inputmode="decimal" value={betAmount} onChange={$amountChange} />
                  </div>
                  <div className="BetInput_buttons">
                    <button className={cn('BetInput_switch', { '--active': betType == 0 })} onClick={$betTypeBound(0)}>Eth</button>
                    <button className={cn('BetInput_switch', { '--active': betType == 1 })} onClick={$betTypeBound(1)}>Bit</button>
                  </div>
                </div>
                <div className="Bet_line BetInput">
                  <div className="BetInput_field">
                    <div className="BetInput_label">Auto Cash Out</div>
                    <input className="BetInput_input" inputmode="decimal" value="4.0" />
                  </div>
                </div>
                <div className="Bet_line BetRun">
                  <div className="BetRun_statistics BetRunStatistics">
                    <div className="BetRunStatistics_name">Target Profit:</div>
                    <div className="BetRunStatistics_value">0.0002 BTC</div>
                    <div className="BetRunStatistics_name">Win Chance:</div>
                    <div className="BetRunStatistics_value">49.5%</div>
                  </div>
                  <div className="BetRun_buttonSpace">
                    <button className="BetRun_button">
                      BET
                    </button>
                  </div>
                </div>
              </div>}
            </div>
            <div className="TabPane">
              <div className="TabLine">
                <div className={cn('TabLine_item', { '--active': tabActive == 0 })} onClick={$tabActiveBound(0)}>Players</div>
                <div className={cn('TabLine_item', { '--active': tabActive == 1 })} onClick={$tabActiveBound(1)}>Chat</div>
              </div>
              {tabActive == 0 && <div className={cn('TabContent', { '--active': tabActive == 0 })}>
                <Players items={players} />
              </div>}
              {tabActive == 1 && <div className={cn('TabContent', { '--active': tabActive == 1 })}>
                <Chat messages={messages} $messages={$messages} />
              </div>}
            </div>
            <div className="DesktopContent">
              <div className="ChatHeader">Chat</div>
              <Chat messages={messages} $messages={$messages} />
            </div>
          </div>
          <div className="DesktopContent">
            <Players items={players} />
            <div className="PlayerStatistics">
              <div className="PlayerStatistics_item">
                Players: 17
              </div>
              <div className="PlayerStatistics_item">
                Betting: 1,561 Ethos
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Statistics">
        <div className="Statistics_item StatisticsItem --home">
          <div className="StatisticsItem_name">Median</div>
          <div className="StatisticsItem_value">1.97x</div>
        </div>
        <div className="Statistics_item StatisticsItem --bankroll">
          <div className="StatisticsItem_name">Bankroll</div>
          <div className="StatisticsItem_value">Ξ 336</div>
        </div>
        <div className="Statistics_item StatisticsItem --maxProfit">
          <div className="StatisticsItem_name">Max profit</div>
          <div className="StatisticsItem_value">Ξ 3.36</div>
        </div>
        <div className="Statistics_item StatisticsItem --maxBet">
          <div className="StatisticsItem_name">Max Bet</div>
          <div className="StatisticsItem_value">Ξ 1</div>
        </div>
      </div>
      <div className="ArticleGrid">
        <div className="Article">
          <div className="Article_header">
            What is EtherCrash?
          </div>
          <div className="Article_text">
            Ethercrash.io is the most established and largest gambling game for Ethereum. Based on Bustabit and provably fair with a low house edge. You can deposit with either Bitcoin or Ethereum, give it a try today!
          </div>
        </div>
        <div className="Article --negative">
          <div className="Article_header --negative">
            Provably Fair
          </div>
          <div className="Article_text --negative">
            EtherCrash's outcome can be proven as fair. There are third party scripts you can use to verify the game hashes and calculate the results.
          </div>
        </div>
        <div className="Article">
          <div className="Article_header">
            How it Works:
          </div>
          <div className="Article_text">
            Every game starts from 0x and counts up, you can watch your wager amount being multiplied in your bet area and choose to cash out at anytime but beware if you wait too long it can crash and you will lose your entire bet.
          </div>
        </div>
        <div className="Article --negative">
          <div className="Article_header --negative">
            Be the Bankroll.
          </div>
          <div className="Article_text --negative">
            Increase your Ethereum holdings by investing into the bankroll of Ethercrash. By being part of the growing bankroll you can monitor your investment and see its growth or decline whenever you choose. By investing you ensure we can also have a higher max bet limit. The bankroll is used for paying out players who want to withdraw their winnings. Invest into Ethercrash today and see your money grow!
          </div>
        </div>
      </div>
      <div className="Leaderboard">
        <div className="Leaderboard_header">
          Leaderboard
        </div>
        <div className="Leaderboard_table">
          <div className="Leaderboard_cell">#</div>
          <div className="Leaderboard_cell">Name</div>
          <div className="Leaderboard_cell">Profit</div>

          <div className="Leaderboard_cell">1</div>
          <div className="Leaderboard_cell">Blowme</div>
          <div className="Leaderboard_cell">1,303.95&nbsp;ETH</div>

          <div className="Leaderboard_cell">2</div>
          <div className="Leaderboard_cell">Jdmdbdb</div>
          <div className="Leaderboard_cell">500.00&nbsp;ETH</div>

          <div className="Leaderboard_cell">3</div>
          <div className="Leaderboard_cell">ColdNeffex2</div>
          <div className="Leaderboard_cell">418.20&nbsp;ETH</div>

          <div className="Leaderboard_cell">4</div>
          <div className="Leaderboard_cell">Triceratops</div>
          <div className="Leaderboard_cell">361.12&nbsp;ETH</div>

          <div className="Leaderboard_cell">5</div>
          <div className="Leaderboard_cell">Sanjeetsir</div>
          <div className="Leaderboard_cell">332.55&nbsp;ETH</div>
        </div>
      </div>
      <div className="Copyright">
        ethercrash.io - game concept originally by bustabit.
      </div>
    </div>
  );
}


export default Home;
