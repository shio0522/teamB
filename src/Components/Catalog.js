import { useContext, useEffect, useState } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "./AuthService";
import DrinkItem from "./DrinkItem";
import ModalItemChoice from "./ModalItemChoice";
import ModalRangePicker from "./ModalRangePicker";

const Catalog = () => {
  const [drinks, setDrinks] = useState(null);
  const [openModalItemChoice, setOpenModalItemChoice] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [openModalRangePicker, setOpenModalRangePicker] = useState(false);

  const user = useContext(AuthContext);

  //react-datesの選択期間表示用
  const dateFormat = "YYYY/MM/DD";

  //お酒一覧をソートする処理を定義した関数
  const sortDrink = (drinks) => {
    //①各お酒のdatesの配列を降順（最新順）にする
    drinks.forEach((drink) => {
      drink.dates.sort((a, b) => b - a);
    });
    //②各お酒の最新の日付を比較してお酒一覧を降順にする
    drinks.sort((a, b) => {
      if (a.dates[0] > b.dates[0]) {
        return -1;
      } else {
        return 1;
      }
    });
  };

  //表示期間が指定された時の処理を定義した関数
  const rangeFilterDrinks = (drinks, startDate, endDate) => {
    //react-datesで取れてくる日時は12:00のものなので-12hしたい。
    //momentsで演算を行うと、カレンダーの表示がバグるため、秒で計算
    const second12h = 1 * 60 * 60 * 12;
    const startDate00 = startDate.unix() - second12h;
    const endDate00 = endDate.unix() - second12h;
    drinks.forEach((drink) => {
      //指定期間外のdateを配列から削除する
      const result = drink.dates.filter(
        (date) => startDate00 <= date.seconds && date.seconds <= endDate00
      );
      drink.dates = result;
    });
    //datesが１つも存在しないものを除外
    const result = drinks.filter((drink) => drink.dates.length >= 1);
    return result;
  };

  //お酒リストを取ってくる処理
  useEffect(() => {
    if (user != null) {
      firebase
        .firestore()
        .collection(user.uid)
        .onSnapshot((querySnapshot) => {
          let drinks = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          //範囲指定された時にフィルターをかけたものをdrinksに代入
          if (startDate && endDate) {
            drinks = rangeFilterDrinks(drinks, startDate, endDate);
          }
          //ソート
          sortDrink(drinks);
          //ソートしたものをセット
          setDrinks(drinks);
        });
    }
  }, [user, startDate, endDate]);
  console.log(drinks);

  return (
    <>
      {openModalRangePicker && (
        <ModalRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
          setOpenModalRangePicker={setOpenModalRangePicker}
        />
      )}
      {openModalItemChoice && (
        <ModalItemChoice
          drinks={drinks}
          setOpenModalItemChoice={setOpenModalItemChoice}
        />
      )}
      <div>
        {/* inputのままだと注意文が表示されるので、TextFieldなどに変更する */}
        <input
          label="react-dates"
          value={
            startDate && endDate
              ? `${startDate.format(dateFormat)} ~ ${endDate.format(
                  dateFormat
                )}`
              : "全ての期間"
          }
          onFocus={() => setOpenModalRangePicker(true)}
        ></input>
        <h1>ここはCatalogコンポーネントです</h1>
        <button
          onClick={() => {
            setOpenModalItemChoice(true);
          }}
        >
          新規メモ作成
        </button>
        <ul>
          {drinks &&
            drinks.map((drink) => {
              return (
                <DrinkItem
                  key={drink.id}
                  drink={drink.drink}
                  rate={drink.rate}
                  image={drink.image}
                  tags={drink.tags}
                />
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Catalog;
