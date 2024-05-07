import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 150px;
  overflow-y: scroll;
  position: relative;

  // For Chrome, Safari and Opera
  ::-webkit-scrollbar {
    display: none;
  }

  // For Firefox
  scrollbar-width: none;
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ isSelected }) => isSelected && "bold"};
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
`;

const ListWrapper = styled.div`
  position: relative;
  top: 50px;
`;

export interface PickerItemProps {
  text: string;
  value: string;
}

interface ScrollPickerProps {
  list: PickerItemProps[];
  onSelectedChange?: (selected: PickerItemProps) => void;
}

const Picker = ({ list, onSelectedChange }: ScrollPickerProps) => {
  const [newList, setNewList] = useState<PickerItemProps[]>([]);
  const ref = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState(1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ITEM_HEIGHT = 50;

  const handler = (ev: Event) => {
    if (ref.current) {
      if (ref.current.scrollTop < ITEM_HEIGHT) {
        ref.current.scrollTop = ITEM_HEIGHT;
      }
      const index = Math.floor(
        (ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT
      );

      // 맨 앞, 뒤 값일 경우 무시
      if (newList[index].text !== "") {
        setSelected(index);
        itemRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        onSelectedChange && onSelectedChange(newList[index]);
        ref.current.scrollTop = index * ITEM_HEIGHT;
      }
    }
  };

  useEffect(() => {
    const dummy = { text: "", value: "" };
    setSelected(1);
    setNewList([dummy, ...list, dummy]);
  }, [list]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scrollend", handler);
      ref.current.scrollTop = selected * ITEM_HEIGHT;
    }
    return () => {
      if (ref.current) ref.current.removeEventListener("scrollend", handler);
    };
  });
  return (
    <List ref={ref}>
      <ListWrapper>
        {newList.map((item, index) => (
          <ListItem
            key={index}
            isSelected={index === selected}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            {item.text}
          </ListItem>
        ))}
      </ListWrapper>
    </List>
  );
};

export default Picker;
