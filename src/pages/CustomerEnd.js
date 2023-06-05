import { useCallback, useEffect } from "react";
import styles from "./CustomerEnd.module.css";
const CustomerEnd = () => {
  const onMinusClick = useCallback(() => {
    //TODO: Amount decreament
  }, []);

  const onPlusClick = useCallback(() => {
    //TODO: Amount increament
  }, []);

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
      <div className={styles.content}>
        <div className={styles.list}>
          <div className={styles.dishes}>
            <div className={styles.dish1}>
              <div className={styles.name}>原丼力炸雞丼</div>
              <div className={styles.amount}>x2</div>
              <div className={styles.price}>NT 240</div>
            </div>
            <div className={styles.dish1}>
              <div className={styles.name1}>經典燒肉丼</div>
              <div className={styles.amount}>x2</div>
              <div className={styles.price}>NT 240</div>
            </div>
            <div className={styles.dish1}>
              <div className={styles.name}>香煎嫩雞腿丼</div>
              <div className={styles.amount}>x2</div>
              <div className={styles.price}>NT 240</div>
            </div>
            <div className={styles.dish1}>
              <div className={styles.name}>日式炸豬排丼</div>
              <div className={styles.amount}>x2</div>
              <div className={styles.price}>NT 240</div>
            </div>
            <div className={styles.dish1}>
              <div className={styles.name1}>骰子牛肉丼</div>
              <div className={styles.amount}>x2</div>
              <div className={styles.price}>NT 240</div>
            </div>
          </div>
          <div className={styles.total}>
            <div className={styles.name5}>合計</div>
            <div className={styles.amount5}>x2</div>
            <div className={styles.price5}>NT 240</div>
          </div>
          <div className={styles.listChild} />
        </div>
        <div className={styles.title}>
          <div className={styles.name}>我的訂單</div>
        </div>
        <button className={styles.orderButton}>
          <div className={styles.description}>確認送出</div>
        </button>
        <div className={styles.line} />
        <div className={styles.products} id="Products">
          <div className={styles.row1}>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus} onClick={onMinusClick}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
                <div className={styles.amount6}>0</div>
                <button className={styles.plus} onClick={onPlusClick}>
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
                <button className={styles.minus}>
                  <img className={styles.vectorIcon} alt="" src="/vector3.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector4.svg" />
                </button>
                <div className={styles.amount6}>0</div>
                <button className={styles.plus}>
                  <img className={styles.vectorIcon} alt="" src="/vector3.svg" />
                  <img className={styles.vectorIcon3} alt="" src="/vector2.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector4.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.120</div>
              <div className={styles.title1}>
                <div className={styles.name}>原丼力炸雞丼</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/karaagedon-1@2x.png"
                />
              </div>
            </div>
          </div>
          <div className={styles.row1}>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus}>
                  <img className={styles.vectorIcon} alt="" src="/vector5.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
                <div className={styles.amount6}>0</div>
                <button className={styles.plus}>
                  <img className={styles.vectorIcon} alt="" src="/vector5.svg" />
                  <img className={styles.vectorIcon3} alt="" src="/vector6.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.120</div>
              <div className={styles.title1}>
                <div className={styles.name}>原丼力炸雞丼</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/karaagedon-1@2x.png"
                />
              </div>
            </div>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus}>
                  <img className={styles.vectorIcon} alt="" src="/vector7.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector4.svg" />
                </button>
                <div className={styles.amount6}>0</div>
                <button className={styles.plus}>
                  <img className={styles.vectorIcon} alt="" src="/vector7.svg" />
                  <img className={styles.vectorIcon3} alt="" src="/vector6.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector4.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.120</div>
              <div className={styles.title1}>
                <div className={styles.name}>原丼力炸雞丼</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/karaagedon-1@2x.png"
                />
              </div>
            </div>
          </div>
          <div className={styles.row3}>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus}>
                  <img className={styles.vectorIcon} alt="" src="/vector8.svg" />
                  <img className={styles.vectorIcon1} alt="" src="/vector9.svg" />
                </button>
                <div className={styles.amount6}>0</div>
                <button className={styles.plus}>
                  <img className={styles.vectorIcon} alt="" src="/vector8.svg" />
                  <img
                    className={styles.vectorIcon3}
                    alt=""
                    src="/vector10.svg"
                  />
                  <img className={styles.vectorIcon1} alt="" src="/vector9.svg" />
                </button>
              </div>
              <div className={styles.price6}>NT.120</div>
              <div className={styles.title1}>
                <div className={styles.name}>原丼力炸雞丼</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/karaagedon-11@2x.png"
                />
              </div>
            </div>
            <div className={styles.product1} id="Product">
              <div className={styles.rec} />
              <div className={styles.button}>
                <button className={styles.minus}>
                  <img className={styles.vectorIcon} alt="" src="/vector11.svg" />
                  <img
                    className={styles.vectorIcon1}
                    alt=""
                    src="/vector12.svg"
                  />
                </button>
                <div className={styles.amount6}>0</div>
                <button className={styles.plus}>
                  <img className={styles.vectorIcon} alt="" src="/vector11.svg" />
                  <img
                    className={styles.vectorIcon3}
                    alt=""
                    src="/vector10.svg"
                  />
                  <img
                    className={styles.vectorIcon1}
                    alt=""
                    src="/vector12.svg"
                  />
                </button>
              </div>
              <div className={styles.price6}>NT.120</div>
              <div className={styles.title1}>
                <div className={styles.name}>原丼力炸雞丼</div>
              </div>
              <div className={styles.image}>
                <img
                  className={styles.karaagedon1Icon}
                  alt=""
                  src="/karaagedon-11@2x.png"
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
