import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useAppSelector } from '../redux/hooks/reduxHooks';
import { Line } from '../redux/wirelessSlide';
import { totalPerksCount } from '../utils/totalPerksCount';
import PerksView, { Perk } from './PerksView';
import Switcher from './Switcher';

const LineItem = ({
    line,
    onClick,
    onSwitch,
    onSwitchBYOD,
    onSelectPerk,
    lineNumber,
}: {
    line: Line;
    onClick: (lineId: string) => void;
    lineNumber: number;
    onSwitch: (lineId: string) => void;
    onSwitchBYOD: (lineId: string) => void;
    onSelectPerk: (perk: Perk) => void;
}) => {
    const theme = useAppSelector((state) => state.theme);
    const [expanded, setExpanded] = React.useState<string>('');

    return (
        <motion.div
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ duration: 0.5 }}
        >
            <div
                style={{
                    margin: '1rem',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: theme.BACKGROUND_COLOR,
                    boxShadow: '-2px 0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '0.3rem',
                }}
            >
                <Accordion
                    expanded={expanded === line.id}
                    sx={{ backgroundColor: theme.BACKGROUND_COLOR }}
                >
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon
                                onClick={() =>
                                    setExpanded(
                                        line.id === expanded ? '' : line.id
                                    )
                                }
                                sx={{
                                    color: theme.TEXT_COLOR,
                                    fontSize: '3rem',
                                }}
                            />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Box
                            flexDirection={'row'}
                            display={'flex'}
                            width={'90%'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                flexGrow={1}
                                alignItems={'center'}
                                justifyContent={'space-evenly'}
                            >
                                <Tooltip
                                    title="Name of this line"
                                    placement="top"
                                >
                                    <Box>
                                        <h3>
                                            {lineNumber} -{' '}
                                            {line.name || 'No Name'}
                                        </h3>
                                    </Box>
                                </Tooltip>

                                <Tooltip
                                    title={`Switch this line to ${
                                        line.name === 'Unlimited Welcome'
                                            ? 'Unlimited Plus'
                                            : 'Unlimited Welcome'
                                    }`}
                                >
                                    <Button
                                        onClick={() => onSwitch(line.id)}
                                        sx={{ marginLeft: '0.5rem' }}
                                        size="small"
                                        variant="text"
                                    >
                                        Switch
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    title="Customer is bringing their own device"
                                    arrow
                                >
                                    <Box>
                                        <Switcher
                                            text={'BYOD'}
                                            savingText={
                                                line.name === 'Unlimited Plus'
                                                    ? '540'
                                                    : '180'
                                            }
                                            saving={line.byod}
                                            onChange={() =>
                                                onSwitchBYOD(line.id)
                                            }
                                            checked={line.byod}
                                            value={line.byod}
                                        />
                                    </Box>
                                </Tooltip>
                            </Box>
                            <Tooltip title="Price of this line">
                                <Box>
                                    <h2>${line.price || 0}</h2>
                                </Box>
                            </Tooltip>

                            <Box mx={1}>
                                <Tooltip title="Perks for this line">
                                    <p>
                                        {totalPerksCount([], line) > 0
                                            ? `Perks ${totalPerksCount(
                                                  [],
                                                  line
                                              )}`
                                            : 'No Perks'}
                                    </p>
                                </Tooltip>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box flexDirection={'row'} display={'flex'}>
                            <PerksView
                                line={line}
                                onChange={onSelectPerk}
                                perks={line.perks}
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Tooltip title="Delete this line" arrow>
                    <div
                        onClick={() => onClick(line.id)}
                        style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                    >
                        <DeleteIcon sx={{ color: theme.DANGER }} />
                    </div>
                </Tooltip>
            </div>
        </motion.div>
    );
};

export default LineItem;
