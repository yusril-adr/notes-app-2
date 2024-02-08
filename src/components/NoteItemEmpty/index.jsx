import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const NoteItemEmpty = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        {t('This List is empty right now.')}
      </Text>
    </Box>
  );
};

export default NoteItemEmpty;
