import { useEffect, useState } from "react";
import { numberToKorean, numberWithCommas } from "../util/number";
import { styled } from "styled-components";
const MAX_AMOUNT = 1000000000;
const PadWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  border-top: 1px solid blue;
  border-left: 1px solid blue;
`;
const Pad = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: #000000;
  background-color: #fff;
  border-bottom: 1px solid blue;
  border-right: 1px solid blue;
`;
const CalculatorPage = () => {
  const [amount, setAmount] = useState(10000);
  useEffect(() => {
    if (amount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    }
  }, [amount]);

  const add = (value: number) => {
    if (amount + value > MAX_AMOUNT) return;
    setAmount(amount + value);
  };

  const append = (value: number, multi: number = 10) => {
    if (amount * multi + value > MAX_AMOUNT) return;
    setAmount(amount * multi + value);
  };

  const pop = () => {
    setAmount((prev) => Math.floor(prev / 10));
  };
  return (
    <>
      <p>{numberWithCommas(amount)}</p>
      {amount > 9999 ? <p>{numberToKorean(amount)}</p> : <p>&nbsp;</p>}
      <div>
        <button onClick={() => add(10000)}>+1만</button>
        <button onClick={() => add(100000)}>+10만</button>
        <button onClick={() => add(1000000)}>+100만</button>
        <button onClick={() => setAmount(MAX_AMOUNT)}>전액</button>
      </div>
      <PadWrapper>
        {Array.from(Array(9).keys()).map((i, index) => (
          <Pad key={index} onClick={() => append(i + 1)}>
            {i + 1}
          </Pad>
        ))}
        <Pad key={9} onClick={() => append(0, 100)}>
          00
        </Pad>
        <Pad key={10} onClick={() => append(0)}>
          0
        </Pad>
        <Pad key={9} onClick={() => pop()}>
          -
        </Pad>
      </PadWrapper>
    </>
  );
};

export default CalculatorPage;
