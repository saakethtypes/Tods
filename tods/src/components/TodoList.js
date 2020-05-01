// Using an ES6 transpiler like Babel
import {
  SortableContainer,
  SortableHandle,
  SortableElement
} from "react-sortable-hoc";
import { Todo } from "./Todo";
import { GlobalContext } from "../context/GlobalState";

import React, { useEffect, useContext } from "react";

const arrayMove = require("array-move");

const DragHandle = SortableHandle(() => (
  <div className="grab">
    <span
      class="iconify"
      data-icon="octicon:grabber"
      data-inline="false"
    ></span>
  </div>
));
const SortableItem = SortableElement(({ todo }) => (
  <li>
    <Todo key={todo._id} todo={todo} />
    <DragHandle />
  </li>
));

const SortableList = SortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

export const SortableTodoList = () => {
  let { todos, getTodos, updateTodoPos } = useContext(GlobalContext);
  useEffect(() => {
    getTodos();
    //eslint-disable-next-line
  }, []);
  let items = todos;
  items = items.filter(function (el) {
    return el != null;
  });

  let onSortEnd = ({ oldIndex, newIndex }) => {
    items = arrayMove(items, oldIndex, newIndex);
    updateTodoPos(items);
  };
  return (
    <div className="todoList">
      <SortableList
        lockAxis="y"
        onSortEnd={onSortEnd}
        useDragHandle
        getContainer
        lockToContainerEdges={true}
        useWindowAsScrollContainer={false}
      >
        {items.map((todo, index) => (
          <SortableItem key={`item-${todo._id}`} index={index} todo={todo} />
        ))}
      </SortableList>
      {items.length > 0 ? null : (
        <div className="AllDone">
          <span
            class="iconify"
            data-icon="mdi:meditation"
            data-inline="false"
          ></span>
          <p className="stats">
            {" "}
            Try meditating to procastinate your work. It helps you get them done faster.
          </p>
        </div>
      )}
    </div>
  );
};
