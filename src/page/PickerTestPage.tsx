import { styled } from "styled-components";
import Picker, { PickerItemProps } from "../components/Picker";
import { useState } from "react";

const ListCenter = styled.div<{ itemHeight: number; visibleCount: number }>`
  box-sizing: border-box;
  border-top: 1.3px solid black;
  border-bottom: 1.3px solid black;
  height: ${({ itemHeight }) => itemHeight}px;
  position: relative;
  top: ${({ itemHeight, visibleCount }) =>
    (Math.floor(visibleCount / 2) + 1) * itemHeight}px;
  width: 100%;
  background-color: gray;
  border-radius: 10px;
`;

const PickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;
const list = [
  { text: "매월", value: "M" },
  { text: "매주", value: "W" },
  { text: "매일", value: "D" },
];
const monthValues = [
  ...Array.from({ length: 31 }, (_, i) => {
    return { text: `${i + 1}일`, value: `${i + 1}` };
  }),
  { text: "말일", value: "L" },
];
const weekValues = [
  { text: "월", value: "0" },
  { text: "화", value: "1" },
  { text: "수", value: "2" },
  { text: "목", value: "3" },
  { text: "금", value: "4" },
  { text: "토", value: "5" },
  { text: "일", value: "6" },
];
const dayValues = [{ text: "매일", value: "D" }];

const valueMap = new Map([
  ["M", monthValues],
  ["W", weekValues],
  ["D", dayValues],
]);

const PickerTestPage = () => {
  const itemHeight = 30;
  const visibleCount = 5;
  const [valueList, setValueList] = useState(monthValues);

  const unitHandler = (v: PickerItemProps) => {
    console.log("unit", v);
    const list = valueMap.get(v.value);
    if (list) {
      setValueList(list);
    }
  };
  const valueHandler = (v: PickerItemProps) => {
    console.log("value", v);
  };
  return (
    <>
      <ListCenter itemHeight={itemHeight} visibleCount={visibleCount} />
      <PickerWrapper>
        <Picker
          list={list}
          onSelectedChange={unitHandler}
          itemHeight={itemHeight}
          visibleCount={visibleCount}
        />
        <Picker
          list={valueList}
          onSelectedChange={valueHandler}
          itemHeight={itemHeight}
          visibleCount={visibleCount}
        />
      </PickerWrapper>
    </>
  );
};

export default PickerTestPage;
