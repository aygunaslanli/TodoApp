import React, { FormEventHandler, useState, useEffect } from "react";
import { Button, Col, Form, InputGroup, ListGroup } from "react-bootstrap";
import { add, remove, saveToLocalStorage, loadFromLocalStorage } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";

const App = () => {
    const [title, setTitle] = useState("");
    const todos = useAppSelector(state => state.todos); // todos state'ini redux store'dan al
    const dispatch = useAppDispatch();

    const todoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Fill input");
            return;
        }

        dispatch(add(title));
        setTitle("");
        dispatch(saveToLocalStorage()); // Yeni todo eklenirken yerel depolamayı güncelle
    }

    useEffect(() => {
        // Sayfa yüklendiğinde yerel depolamadan todos'u yükle
        dispatch(loadFromLocalStorage());
    }, []);

    useEffect(() => {
        // todos state'i değiştiğinde localStorage'a kaydet
        dispatch(saveToLocalStorage());
    }, [todos]);

    return (
        <>
            <div className="d-flex align-items-center justify-content-center flex-column">
                <h1 className="my-5">Todo App</h1>
                <Col className="col-4">
                    <form onSubmit={todoSubmit}>
                        <InputGroup className="mb-3">
                            <Form.Control value={title} placeholder="Enter todo list" onChange={(e) => setTitle(e.target.value)} />
                            <Button variant="secondary" type="submit">Add</Button>
                        </InputGroup>
                    </form>
                    <ListGroup>
                        {todos.map((item: any) => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                                {item.title}
                                <Button variant="danger" onClick={() => dispatch(remove(item.id))}>Del</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </div>
        </>
    );
};

export default App;