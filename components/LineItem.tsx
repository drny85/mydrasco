import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { NON_PREMIUM_BYOD_VALUE, PREMIUM_BYOD_VALUE } from '../constant';
import { useAppSelector } from '../redux/hooks/reduxHooks';
import { Line } from '../redux/wirelessSlide';
import { PLAN } from '../types';
import { totalPerksCount } from '../utils/totalPerksCount';
import MenuSwitchPlan from './MenuItems';
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
    onSwitch: (planId: string, plan: PLAN) => void;
    onSwitchBYOD: (lineId: string) => void;
    onSelectPerk: (perk: Perk) => void;
}) => {
    const theme = useAppSelector((state) => state.theme);
    const [expanded, setExpanded] = React.useState<string>('');
    const shake = useAppSelector((s) => s.wireless.shake);

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
                    boxShadow: '-2px 0px 4px 4px rgba(0, 0, 0, 0.10)',
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

                                {/* <PlanSwitcherMenu
                                    onClick={(plan) => onSwitch(line.id, plan)}
                                /> */}
                                <MenuSwitchPlan
                                    onClick={(plan) => onSwitch(line.id, plan)}
                                />

                                <Tooltip
                                    title="Customer is bringing their own device"
                                    arrow
                                >
                                    <Box>
                                        <Switcher
                                            text={'BYOD'}
                                            savingText={
                                                line.name ===
                                                    'Unlimited Plus' ||
                                                line.name ===
                                                    'Unlimited Ultimate'
                                                    ? PREMIUM_BYOD_VALUE * 36
                                                    : NON_PREMIUM_BYOD_VALUE *
                                                      36
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
                    <motion.div
                        animate={{ scale: shake ? [1, 1.2, 1] : 1 }}
                        initial={{ scale: 1 }}
                        transition={{
                            type: 'keyframes',
                            duration: 0.5,
                            repeat: 4,
                        }}
                        onClick={() => onClick(line.id)}
                        style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                    >
                        <DeleteIcon sx={{ color: theme.DANGER }} />
                    </motion.div>
                </Tooltip>
            </div>
        </motion.div>
    );
};

export default LineItem;
