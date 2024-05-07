import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const List = styled.ul<{ itemHeight: number; visibleCount: number }>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: ${({ itemHeight, visibleCount }) => itemHeight * visibleCount}px;
  overflow-y: scroll;
  position: relative;

  // For Chrome, Safari and Opera
  ::-webkit-scrollbar {
    display: none;
  }

  // For Firefox
  scrollbar-width: none;
`;

const ListItem = styled.li<{ isSelected: boolean; itemHeight: number }>`
  height: ${({ itemHeight }) => itemHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ isSelected }) => isSelected && "bold"};
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
`;

const ListWrapper = styled.div<{ itemHeight: number; visibleCount: number }>`
  position: relative;
  top: ${({ itemHeight, visibleCount }) =>
    Math.floor(visibleCount / 2) * itemHeight}px;
`;

export interface PickerItemProps {
  text: string;
  value: string;
}

interface ScrollPickerProps {
  itemHeight?: number;
  visibleCount?: number;
  list: PickerItemProps[];
  onSelectedChange?: (selected: PickerItemProps) => void;
}

const Picker = ({
  list,
  onSelectedChange,
  itemHeight = 50,
  visibleCount = 3,
}: ScrollPickerProps) => {
  const [newList, setNewList] = useState<PickerItemProps[]>([]);
  const ref = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState(1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handler = (ev: Event) => {
    if (ref.current) {
      if (ref.current.scrollTop < itemHeight) {
        ref.current.scrollTop = itemHeight;
      }
      const index = Math.floor(
        (ref.current!.scrollTop + itemHeight / 2) / itemHeight
      );

      // 맨 앞, 뒤 값일 경우 무시
      if (newList[index].text !== "") {
        setSelected(index);
        itemRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        onSelectedChange && onSelectedChange(newList[index]);
        ref.current.scrollTop = index * itemHeight;
      }
    }
  };

  useEffect(() => {
    const dummy = { text: "", value: "" };
    setSelected(1);
    setNewList([
      { ...dummy },
      ...list,
      ...Array.from(Array(Math.floor(visibleCount / 2))).map((_) => {
        return { ...dummy };
      }),
    ]);
  }, [list]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scrollend", handler);
      ref.current.scrollTop = selected * itemHeight;
    }
    return () => {
      if (ref.current) ref.current.removeEventListener("scrollend", handler);
    };
  });
  return (
    <List ref={ref} itemHeight={itemHeight} visibleCount={visibleCount}>
      <ListWrapper itemHeight={itemHeight} visibleCount={visibleCount}>
        {newList.map((item, index) => (
          <ListItem
            key={index}
            isSelected={index === selected}
            ref={(el) => (itemRefs.current[index] = el)}
            itemHeight={itemHeight}
          >
            {item.text}
          </ListItem>
        ))}
      </ListWrapper>
    </List>
  );
};

export default Picker;
