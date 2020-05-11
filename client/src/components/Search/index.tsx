import React, { useState } from "react";
import { InputGroup, DropdownButton, Dropdown, FormControl, Button } from "react-bootstrap";
import { ISearchProps } from "../../common/interfaces";
import { SearchByOptions } from "../../common/constants";

const Search = ({ doSearch }: ISearchProps) => {
  const [searchBy, setSearchBy] = useState<string>(SearchByOptions.Title);
  const [keyword, setKeyword] = useState<string>("");

  return (
    <>
      <InputGroup className="mb-3">
        <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title={searchBy} id="input-group-dropdown-1">
          {Object.keys(SearchByOptions).map((item, idx) => {
            return (
              <Dropdown.Item key={idx} onClick={() => setSearchBy(item)}>
                {item}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <FormControl
          aria-describedby="basic-addon1"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={`search books by ${searchBy.toLowerCase()}`}
        />
        <InputGroup.Append>
          <Button className="btn-secondary" onClick={() => doSearch(keyword, searchBy)}>
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};

export default Search;
