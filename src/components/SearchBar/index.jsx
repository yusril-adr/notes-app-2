import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useDisclosure,
  Box,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import {
  SearchIcon,
} from '@chakra-ui/icons';

// Services
import {
  NotesContext,
} from '../../services/contexts/notes';

// Utils
import { convertSearchParams } from '../../utils/common';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { initNotes } = useContext(NotesContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    initNotes();
  }, [searchParams]);

  const onInputChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  const onCloseHandler = () => {
    onClose();
    setKeyword('');
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const newSearchParams = convertSearchParams(searchParams);
    setSearchParams({
      ...newSearchParams,
      search: keyword,
    });
    onCloseHandler();
  };

  return (
    <Box>
      <Button
        aria-label="Search"
        title="Search"
        fontWeight="normal"
        w="100%"
        justifyContent="start"
        pe="32"
        display={['none', 'flex']}
        leftIcon={<SearchIcon />}
        onClick={onOpen}
      >
        Search
      </Button>

      <IconButton
        aria-label="Search"
        title="Search"
        variant="ghost"
        display={['flex', 'none']}
        icon={<SearchIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onCloseHandler}>
        <ModalOverlay px={[3, 0]} />

        <ModalContent>
          <Box as="form" onSubmit={onSubmitHandler}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
              >
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={onInputChangeHandler}
              />
            </InputGroup>
          </Box>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default SearchBar;