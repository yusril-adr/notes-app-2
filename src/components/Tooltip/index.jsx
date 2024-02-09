import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Tooltip as TooltipChakra,
} from '@chakra-ui/react';

const ToolTipRef = forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} {...rest}>
    {children}
  </Box>
));

ToolTipRef.propTypes = {
  children: PropTypes.element.isRequired,
};

const Tooltip = ({ children, label }) => (
  <TooltipChakra label={label}>
    <ToolTipRef>
      {children}
    </ToolTipRef>
  </TooltipChakra>
);

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

export default Tooltip;
