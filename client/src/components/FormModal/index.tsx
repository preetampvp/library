import React, { useState, useEffect } from "react";
import { IFormModalProps } from "../../common/interfaces";
import { Modal, Button } from "react-bootstrap";
import { FormModalMode, HttpMethod, ApiCreateBookUrl } from "../../common/constants";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import DoHttp from "../../hooks/http";

const FormModal = ({ mode, setModalMode }: IFormModalProps) => {
  const titleRef = React.createRef<HTMLInputElement>();
  const isbnRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const [authors, setAuthors] = useState([] as string[]);
  const [categories, setCategories] = useState([] as string[]);
  const [isHttpProcessing, response, doPost] = DoHttp(HttpMethod.Post);

  const saveChanges = async () => {
    const book = {
      title: titleRef!.current!.value,
      description: descriptionRef!.current!.value,
      isbn: isbnRef!.current!.value,
      authors,
      categories,
    };
    await doPost(ApiCreateBookUrl, book);
  };

  useEffect(() => {
    if (!response) return;

    if (response.isErr) {
      alert(JSON.stringify(response.data));
    } else {
      alert("Book added");
      setModalMode(FormModalMode.Hide);
    }
  }, [response, setModalMode]);

  return (
    <Modal show={true} backdrop="static" onHide={() => setModalMode(FormModalMode.Hide)}>
      <Modal.Header closeButton>
        <Modal.Title>{mode.toString()} Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <input type="text" className="form-control" ref={titleRef} placeholder="title" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" ref={isbnRef} placeholder="isbn" />
        </div>
        <div className="form-group">
          <textarea className="form-control" ref={descriptionRef} placeholder="description"></textarea>
        </div>
        <div className="form-group">
          <ReactTagInput tags={authors} onChange={(a) => setAuthors(a)} removeOnBackspace={true} placeholder="add authors - type and press enter" />
        </div>
        <div className="form-group">
          <ReactTagInput
            tags={categories}
            onChange={(c) => setCategories(c)}
            removeOnBackspace={true}
            placeholder="add categories - type and press enter"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => setModalMode(FormModalMode.Hide)} disabled={isHttpProcessing}>
          Close
        </Button>
        <Button variant="dark" onClick={() => saveChanges()} disabled={isHttpProcessing}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
