import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@chakra-ui/react';
import { IoMdGlobe } from 'react-icons/io';

import { useTranslation } from 'react-i18next';

// Configuration
import CONFIG from '../../global/CONFIG';

// Services
import LocalizeService from '../../services/localStorage/LocalizeService';

// Components
import Tooltip from '../Tooltip';

const ColorModeSwitcher = ({ styles }) => {
  const { t, i18n } = useTranslation();

  const newLang = i18n.language === CONFIG.SERVICES.LOCALIZE.DEFAULT_LANG
    ? CONFIG.SERVICES.LOCALIZE.SECOND_LANG : CONFIG.SERVICES.LOCALIZE.DEFAULT_LANG;

  const onClickHandler = () => {
    i18n.changeLanguage(newLang);
    LocalizeService.saveLang(newLang);
  };

  return (
    <Tooltip label={t('Switch to {{lang}} language', { lang: newLang })}>
      <Button
        p="0"
        size="md"
        fontSize="lg"
        position="relative"
        aria-label={t('Switch to {{lang}} language', { lang: newLang })}
        title={t('Switch to {{lang}} language', { lang: newLang })}
        variant="ghost"
        color="current"
        onClick={onClickHandler}
        {...styles}
      >
        <IoMdGlobe />
        <Text
          position="absolute"
          bottom="1"
          right="1"
          fontSize="xs"
          textTransform="uppercase"
          fontStyle="light"
        >
          {newLang}
        </Text>
      </Button>
    </Tooltip>
  );
};

ColorModeSwitcher.defaultProps = {
  styles: {},
};

ColorModeSwitcher.propTypes = {
  styles: PropTypes.object,
};

export default ColorModeSwitcher;
