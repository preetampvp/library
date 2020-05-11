import React, { useState, useEffect } from "react";
import "./App.scss";
import Search from "../Search";
import { ISearchProps } from "../../common/interfaces";
import { FormModalMode, HttpMethod, ApiSearchBooksUrl } from "../../common/constants";
import FormModal from "../FormModal";
import DoHttp from "../../hooks/http";
import Results from "../Results";

function App() {
  const [modalMode, setModalMode] = useState(FormModalMode.Hide);
  const [searchResults, setSearchResults] = useState(null);
  const [isProcessing, response, doGet] = DoHttp(HttpMethod.Get);

  const doSearch = async (keyword: string, by: string) => {
    if (!keyword || keyword === "") {
      alert("search keyword required.");
      return;
    }

    const url = ApiSearchBooksUrl.replace(/:q/, keyword).replace(/:by/, by);
    await doGet(url);
  };

  useEffect(() => {
    if (!response) return;

    if (response.isErr) {
      alert(JSON.stringify(response.data));
    } else {
      setSearchResults(response.data);
    }
  }, [response]);

  const searchProps: ISearchProps = {
    doSearch,
  };

  return (
    <div className="App">
      <header className="App-header">{process.env.REACT_APP_NAME}</header>
      <section className="container App-content">
        <div className="text-right mb-3">
          <button className="btn btn-outline-dark" onClick={() => setModalMode(FormModalMode.Add)}>
            <i className="fas fa-plus"></i> Add Book
          </button>
        </div>

        {modalMode === FormModalMode.Add && <FormModal mode={modalMode} setModalMode={setModalMode} />}

        <Search {...searchProps} />
        {isProcessing && <div className="text-center">Loading..</div>}
        <Results searchResults={searchResults} />
      </section>
    </div>
  );
}

export default App;
