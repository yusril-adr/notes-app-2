import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/react';
import { IoMdGlobe } from 'react-icons/io';

import { useTranslation } from 'react-i18next';

// Configuration
import CONFIG from '../../global/CONFIG';

// Services
import LocalizeService from '../../services/localStorage/LocalizeService';

const ColorModeSwitcher = ({ styles }) => {
  const { t, i18n } = useTranslation();

  const newLang = i18n.language === CONFIG.SERVICES.LOCALIZE.DEFAULT_LANG
    ? CONFIG.SERVICES.LOCALIZE.SECOND_LANG : CONFIG.SERVICES.LOCALIZE.DEFAULT_LANG;

  const onClickHandler = () => {
    i18n.changeLanguage(newLang);
    LocalizeService.saveLang(newLang);
  };

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={t('Switch to {{lang}} language', { lang: newLang })}
      title={t('Switch to {{lang}} language', { lang: newLang })}
      variant="ghost"
      color="current"
      onClick={onClickHandler}
      icon={<IoMdGlobe />}
      {...styles}
    />
  );
};

ColorModeSwitcher.defaultProps = {
  styles: {},
};

ColorModeSwitcher.propTypes = {
  styles: PropTypes.object,
};

export default ColorModeSwitcher;
