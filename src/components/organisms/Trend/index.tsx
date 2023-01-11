import React, { FC } from 'react';
import { Tab } from '@headlessui/react';
import { MyTab } from '../../../components';
import { icBitcoin, icBitcoinCash, icChainlink, icEthereum, icRipple } from '../../../assets';

export const Trend: FC = () => {
   return (
      <div className="section trend">
         <div className="trend__center center">
            <div className="trend__line">
               <h2 className="trend__title h2">Market trend</h2>
               <a className="button-stroke trend__button" href="market.html">View more</a>
            </div>
            <MyTab titles={['All', 'Defi', 'Innovation', 'POS', 'NFT', 'POW', 'Storage']}>
               <>
                  <Tab.Panel>
                     <div className="trend__table">
                        <div className="trend__row">
                           <div className="trend__col">#</div>
                           <div className="trend__col">Name</div>
                           <div className="trend__col">Price</div>
                           <div className="trend__col">24h change</div>
                           <div className="trend__col">Chart</div>
                           <div className="trend__col">Trade</div>
                        </div>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">1</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icBitcoin} alt="Bitcoin" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Bitcoin</span>
                                    <span className="trend__currency">BTC</span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$36,201.34</div>
                           <div className="trend__col">
                              <div className="trend__positive">+1.71%</div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-positive"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">2</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icEthereum} alt="Ethereum" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Ethereum</span>
                                    <span className="trend__currency">ETH</span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$2,605.95</div>
                           <div className="trend__col">
                              <div className="trend__positive">+2.04%</div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-positive"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">3</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icBitcoinCash} alt="Bitcoin Cash" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Bitcoin Cash</span>
                                    <span className="trend__currency">BCH</span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$939.20</div>
                           <div className="trend__col">
                              <div className="trend__negative">-0.74% </div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-negative"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">4</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icRipple} alt="Ripple" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Ripple</span>
                                    <span className="trend__currency">XRP </span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$1.02</div>
                           <div className="trend__col">
                              <div className="trend__positive">+1.20% </div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-positive"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">5</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icChainlink} alt="Chainlink" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Chainlink</span>
                                    <span className="trend__currency">LINK</span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$30.56</div>
                           <div className="trend__col">
                              <div className="trend__negative">-3.84%</div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-negative"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                     </div>
                  </Tab.Panel>
                  <Tab.Panel>
                     <div className="trend__table">
                        <div className="trend__row">
                           <div className="trend__col">#</div>
                           <div className="trend__col">Name</div>
                           <div className="trend__col">Price</div>
                           <div className="trend__col">24h change</div>
                           <div className="trend__col">Chart</div>
                           <div className="trend__col">Trade</div>
                        </div>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">1</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icBitcoin} alt="Bitcoin" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Bitcoin</span>
                                    <span className="trend__currency">BTC</span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$36,201.34</div>
                           <div className="trend__col">
                              <div className="trend__positive">+1.71%</div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-positive"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">2</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icEthereum} alt="Ethereum" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Ethereum</span>
                                    <span className="trend__currency">ETH</span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$2,605.95</div>
                           <div className="trend__col">
                              <div className="trend__positive">+2.04%</div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-positive"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">3</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icBitcoinCash} alt="Bitcoin Cash" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Bitcoin Cash</span>
                                    <span className="trend__currency">BCH</span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$939.20</div>
                           <div className="trend__col">
                              <div className="trend__negative">-0.74% </div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-negative"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">4</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icRipple} alt="Ripple" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Ripple</span>
                                    <span className="trend__currency">XRP </span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$1.02</div>
                           <div className="trend__col">
                              <div className="trend__positive">+1.20% </div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-positive"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                        <a className="trend__row" href="exchange.html">
                           <div className="trend__col">5</div>
                           <div className="trend__col">
                              <div className="trend__item">
                                 <div className="trend__icon">
                                    <img src={icChainlink} alt="Chainlink" />
                                 </div>
                                 <div className="trend__details">
                                    <span className="trend__subtitle">Chainlink</span>
                                    <span className="trend__currency">LINK</span>
                                 </div>
                              </div>
                           </div>
                           <div className="trend__col">$30.56</div>
                           <div className="trend__col">
                              <div className="trend__negative">-3.84%</div>
                           </div>
                           <div className="trend__col">
                              <div className="trend__chart">
                                 <div className="js-chart-negative"></div>
                              </div>
                           </div>
                           <div className="trend__col">
                              <button className="button-stroke button-small trend__button">Trade</button>
                           </div>
                        </a>
                     </div>
                  </Tab.Panel>
               </>
            </MyTab>
            <select className="select">
               <option>All</option>
               <option>DeFi</option>
               <option>Innovation</option>
               <option>POS</option>
               <option>NFT</option>
               <option>POW</option>
               <option>Storage </option>
            </select>
            {/* <div className="trend__table">
         <div className="trend__row">
            <div className="trend__col">#</div>
            <div className="trend__col">Name</div>
            <div className="trend__col">Price</div>
            <div className="trend__col">24h change</div>
            <div className="trend__col">Chart</div>
            <div className="trend__col">Trade</div>
         </div>
         <a className="trend__row" href="exchange.html">
            <div className="trend__col">1</div>
            <div className="trend__col">
               <div className="trend__item">
                  <div className="trend__icon">
                     <img src={icBitcoin} alt="Bitcoin" />
                  </div>
                  <div className="trend__details">
                     <span className="trend__subtitle">Bitcoin</span>
                     <span className="trend__currency">BTC</span>
                  </div>
               </div>
            </div>
            <div className="trend__col">$36,201.34</div>
            <div className="trend__col">
               <div className="trend__positive">+1.71%</div>
            </div>
            <div className="trend__col">
               <div className="trend__chart">
                  <div className="js-chart-positive"></div>
               </div>
            </div>
            <div className="trend__col">
               <button className="button-stroke button-small trend__button">Trade</button>
            </div>
         </a>
         <a className="trend__row" href="exchange.html">
            <div className="trend__col">2</div>
            <div className="trend__col">
               <div className="trend__item">
                  <div className="trend__icon">
                     <img src={icEthereum} alt="Ethereum" />
                  </div>
                  <div className="trend__details">
                     <span className="trend__subtitle">Ethereum</span>
                     <span className="trend__currency">ETH</span>
                  </div>
               </div>
            </div>
            <div className="trend__col">$2,605.95</div>
            <div className="trend__col">
               <div className="trend__positive">+2.04%</div>
            </div>
            <div className="trend__col">
               <div className="trend__chart">
                  <div className="js-chart-positive"></div>
               </div>
            </div>
            <div className="trend__col">
               <button className="button-stroke button-small trend__button">Trade</button>
            </div>
         </a>
         <a className="trend__row" href="exchange.html">
            <div className="trend__col">3</div>
            <div className="trend__col">
               <div className="trend__item">
                  <div className="trend__icon">
                     <img src={icBitcoinCash} alt="Bitcoin Cash" />
                  </div>
                  <div className="trend__details">
                     <span className="trend__subtitle">Bitcoin Cash</span>
                     <span className="trend__currency">BCH</span>
                  </div>
               </div>
            </div>
            <div className="trend__col">$939.20</div>
            <div className="trend__col">
               <div className="trend__negative">-0.74% </div>
            </div>
            <div className="trend__col">
               <div className="trend__chart">
                  <div className="js-chart-negative"></div>
               </div>
            </div>
            <div className="trend__col">
               <button className="button-stroke button-small trend__button">Trade</button>
            </div>
         </a>
         <a className="trend__row" href="exchange.html">
            <div className="trend__col">4</div>
            <div className="trend__col">
               <div className="trend__item">
                  <div className="trend__icon">
                     <img src={icRipple} alt="Ripple" />
                  </div>
                  <div className="trend__details">
                     <span className="trend__subtitle">Ripple</span>
                     <span className="trend__currency">XRP </span>
                  </div>
               </div>
            </div>
            <div className="trend__col">$1.02</div>
            <div className="trend__col">
               <div className="trend__positive">+1.20% </div>
            </div>
            <div className="trend__col">
               <div className="trend__chart">
                  <div className="js-chart-positive"></div>
               </div>
            </div>
            <div className="trend__col">
               <button className="button-stroke button-small trend__button">Trade</button>
            </div>
         </a>
         <a className="trend__row" href="exchange.html">
            <div className="trend__col">5</div>
            <div className="trend__col">
               <div className="trend__item">
                  <div className="trend__icon">
                     <img src={icChainlink} alt="Chainlink" />
                  </div>
                  <div className="trend__details">
                     <span className="trend__subtitle">Chainlink</span>
                     <span className="trend__currency">LINK</span>
                  </div>
               </div>
            </div>
            <div className="trend__col">$30.56</div>
            <div className="trend__col">
               <div className="trend__negative">-3.84%</div>
            </div>
            <div className="trend__col">
               <div className="trend__chart">
                  <div className="js-chart-negative"></div>
               </div>
            </div>
            <div className="trend__col">
               <button className="button-stroke button-small trend__button">Trade</button>
            </div>
         </a>
      </div> */}
         </div>
      </div>
   );
};
