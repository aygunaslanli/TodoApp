import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from 'uuid';

interface Todo {
    id: string;
    title: string;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: "todoApp",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            const newTodo = { id: v4(), title: action.payload };
            state.push(newTodo);
        },
        remove: (state, action: PayloadAction<string>) => {
            return state.filter(todo => todo.id !== action.payload);
        },
        // Yerel depolamaya kaydetme eylemi
        saveToLocalStorage: (state) => {
            localStorage.setItem("todos", JSON.stringify(state));
        },
        // Yerel depolamadan yükleme eylemi
        loadFromLocalStorage: (state) => {
            const storedTodos = localStorage.getItem("todos");
            if (storedTodos) {
                return JSON.parse(storedTodos);
            }
            return state;
        }
    }
});

export default todoSlice.reducer;
export const { add, remove, saveToLocalStorage, loadFromLocalStorage } = todoSlice.actions;