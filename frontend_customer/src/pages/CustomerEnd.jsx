import { useCallback, useEffect, useState } from "react";
import styles from "./CustomerEnd.module.css";
import ListButton from './ListButton.jsx';

const CustomerEnd = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [count5, setCount5] = useState(0);
  const [count6, setCount6] = useState(0);

  const dishes = [
    {
      name: "原丼力炸雞丼",
      quantity: count1,
      price: 120 * count1,
    },
    {
      name: "香煎嫩雞腿丼",
      quantity: count2,
      price: 120 * count2,
    },
    {
      name: "味噌烤鯖魚飯",
      quantity: count3,
      price: 160 * count3,
    },
    {
      name: "日式炸豬排丼",
      quantity: count4,
      price: 130 * count4,
    },
    {
      name: "骰子牛肉丼",
      quantity: count5,
      price: 180  * count5,
    },
    {
      name: "鹽烤松阪豬丼",
      quantity: count6,
      price: 160 * count6,
    },
  ];

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <main className={styles.customerEnd}>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.3.2/socket.io.js"></script>
      <div className={styles.content}>
        <div className={styles.list}>
          <div className={styles.dishes}>
            {dishes.map((dish, index) => {
              if (dish.quantity > 0) {
                return (
                  <div className={styles.dish1} key={index}>
                    <div className={styles.name}>{dish.name}</div>
                    <div className={styles.amount}>x{dish.quantity}</div>
                    <div className={styles.price}>NT {dish.price}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.total}>
            <div className={styles.name5}>合計</div>
            <div className={styles.amount5}>
              x
              {dishes.reduce((total, dish) => total + dish.quantity, 0)}
            </div>
            <div className={styles.price5}>
              NT{" "}
              {dishes.reduce(
                (total, dish) => total + dish.price,
                0
              )}
            </div>
          </div>
          <div className={styles.listChild} />
        </div>
        <div className={styles.title}>
          <div className={styles.name}>我的訂單</div>
        </div>
        <ListButton dishes={dishes} />
        <div className={styles.line} />
        <div className={styles.products} id="products">
          <div className={styles.row1}>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus} onClick={() => {
                    if (count1 > 0) {
                        setCount1(count1 - 1);
                    }
                }}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
                <span className={styles.amount6}>{count1}</span>
                <button className={styles.plus} onClick={() => setCount1(count1 + 1)}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" /> 
                  <img className={styles.vectorIcon3} alt="" src="/vector2.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.120</div>
              <div className={styles.title1}>
                <div className={styles.name}>原丼力炸雞丼</div>
              </div>
              <img
                className={styles.karaagedon1Icon}
                alt=""
                src="/karaagedon-1@2x.png"
              />
            </div>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus} onClick={() => {
                    if (count2 > 0) {
                        setCount2(count2 - 1);
                    }
                }}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
                <span className={styles.amount6}>{count2}</span>
                <button className={styles.plus} onClick={() => setCount2(count2 + 1)}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" /> 
                  <img className={styles.vectorIcon3} alt="" src="/vector2.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.120</div>
              <div className={styles.title1}>
                <div className={styles.name}>香煎嫩雞腿丼</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/chickendon.png"
                />
              </div>
            </div>
          </div>
          <div className={styles.row1}>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus} onClick={() => {
                    if (count3 > 0) {
                        setCount3(count3 - 1);
                    }
                }}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
                <span className={styles.amount6}>{count3}</span>
                <button className={styles.plus} onClick={() => setCount3(count3 + 1)}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" /> 
                  <img className={styles.vectorIcon3} alt="" src="/vector2.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.160</div>
              <div className={styles.title1}>
                <div className={styles.name}>味噌烤鯖魚飯</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/fishdon.png"
                />
              </div>
            </div>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus} onClick={() => {
                    if (count4 > 0) {
                        setCount4(count4 - 1);
                    }
                }}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
                <span className={styles.amount6}>{count4}</span>
                <button className={styles.plus} onClick={() => setCount4(count4 + 1)}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" /> 
                  <img className={styles.vectorIcon3} alt="" src="/vector2.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.130</div>
              <div className={styles.title1}>
                <div className={styles.name}>日式炸豬排丼</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/katsudon.png"
                />
              </div>
            </div>
          </div>
          <div className={styles.row3}>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus} onClick={() => {
                    if (count5 > 0) {
                        setCount5(count5 - 1);
                    }
                }}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
                <span className={styles.amount6}>{count5}</span>
                <button className={styles.plus} onClick={() => setCount5(count5 + 1)}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" /> 
                  <img className={styles.vectorIcon3} alt="" src="/vector2.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.180</div>
              <div className={styles.title1}>
                <div className={styles.name}>骰子牛肉丼</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/beefdon.png"
                />
              </div>
            </div>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus} onClick={() => {
                    if (count6 > 0) {
                        setCount6(count6 - 1);
                    }
                }}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
                <span className={styles.amount6}>{count6}</span>
                <button className={styles.plus} onClick={() => setCount6(count6 + 1)}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" /> 
                  <img className={styles.vectorIcon3} alt="" src="/vector2.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.160</div>
              <div className={styles.title1}>
                <div className={styles.name}>鹽烤松阪豬丼</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/porkdon.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.topBar}>
        <img
          className={styles.yuandonliIcon}
          alt=""
          src="/yuandonli@2x.png"
          data-animate-on-scroll
        />
      </div>
    </main>
  );
};

export default CustomerEnd;
