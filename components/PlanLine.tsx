import { FC, useState } from 'react';
import { useAppSelector } from '../redux/hooks/reduxHooks';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AnimatedNumber from 'animated-number-react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
interface Props {
    planName: string;
    price: number;
    lines: number;
    details: string[];
    onAdd: () => void;
    onRemove: () => void;
}

const PlanLine: FC<Props> = ({
    planName,
    price,
    lines,
    details,
    onAdd,
    onRemove,
}) => {
    const theme = useAppSelector((state) => state.theme);
    const [expanded, setExpanded] = useState<false | string>(false);

    return (
        <div>
            <Accordion
                sx={{ backgroundColor: theme.BACKGROUND_COLOR }}
                expanded={expanded === planName}
            >
                <AccordionSummary>
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                            padding: '10px',
                            width: '100%',
                            boxShadow: '12px 10px 8px rgba(0,0,0,0.125)',
                            backgroundColor: theme.BACKGROUND_COLOR,

                            borderRadius: '15px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flex: 0.33,
                                alignItems: 'center',
                            }}
                        >
                            <h2 style={{ paddingLeft: '10px' }}>{planName} </h2>
                            <span
                                style={{ paddingLeft: '8px', fontSize: '14px' }}
                            >
                                {planName.includes('More') ||
                                planName.includes('One')
                                    ? '(Premium Plan)'
                                    : '(Non Premium)'}
                            </span>
                            <div
                                onClick={() => {
                                    if (expanded === planName) {
                                        setExpanded(false);
                                    } else {
                                        setExpanded(planName);
                                    }
                                }}
                                style={{ marginLeft: '1rem' }}
                            >
                                {expanded === false ? (
                                    <ExpandMoreIcon
                                        fontSize="large"
                                        sx={{ color: theme.TEXT_COLOR }}
                                    />
                                ) : (
                                    <ExpandLessIcon
                                        fontSize="large"
                                        sx={{ color: theme.TEXT_COLOR }}
                                    />
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flex: 0.33,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    width: '70%',
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                    display: 'flex',
                                    backgroundColor: theme.CARD_BACKGROUND,
                                    borderRadius: '35px',
                                    boxShadow: '6px 8px 6px rgba(0,0,0,0.136)',
                                }}
                            >
                                <div
                                    onClick={onRemove}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '8px',
                                    }}
                                >
                                    <RemoveIcon
                                        fontSize="large"
                                        sx={{ color: theme.TEXT_COLOR }}
                                    />
                                </div>
                                <div>
                                    <h2>{lines}</h2>
                                </div>
                                <div
                                    onClick={onAdd}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '8px',
                                    }}
                                >
                                    <AddIcon
                                        fontSize="large"
                                        sx={{ color: theme.TEXT_COLOR }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flex: 0.33,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <h2>
                                ${' '}
                                <AnimatedNumber
                                    duration={300}
                                    formatValue={(n: number) => n.toFixed(0)}
                                    value={Math.fround(price)}
                                />
                            </h2>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ paddingLeft: '1.5rem' }}>
                        {details.map((d, index) => (
                            <p
                                style={{
                                    padding: '8px 4px',
                                    fontWeight:
                                        index === 0 ? 'bold' : undefined,
                                }}
                                key={d}
                            >
                                {d}
                            </p>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default PlanLine;
