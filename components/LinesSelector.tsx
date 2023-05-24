import { Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import MyAlert from './MyAlert';
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AnimatedNumber from 'animated-number-react';
import { Line, setLinesData } from '../redux/wirelessSlide';
import { perks } from '../perks';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';

type Props = {};

const LinesSelector = (props: Props) => {
    const dispatch = useAppDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const theme = useAppSelector((s) => s.theme);
    const { lines, expressAutoPay } = useAppSelector((s) => s.wireless);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderRadius: '3rem',
                padding: '0px 3rem',
                boxShadow: '0px 0px 5px 6px rgba(0, 0, 0, 0.25)',
            }}
        >
            <div
                onClick={() => {
                    if (lines.length > 1) {
                        setAlertMessage('Please remove individual line');
                        setShowAlert(true);
                    }
                }}
            >
                <RemoveIcon
                    sx={{
                        color: theme.TEXT_COLOR,
                        fontSize: '3rem',
                        opacity: 0.6,
                        cursor: 'pointer',
                    }}
                />
            </div>

            <p
                style={{
                    fontSize: '3rem',
                    padding: '0.2rem 1.5rem',
                }}
            >
                <AnimatedNumber
                    duration={300}
                    formatValue={(n: number) => n.toFixed(0)}
                    value={lines.length}
                />
            </p>
            <div
                onClick={() => {
                    toast.success('Line added successfully', {
                        position: 'top-center',
                        autoClose: 2000,
                    });

                    if (lines.length < 10) {
                        const newLine: Line = {
                            id: v4(),
                            name: 'Unlimited Welcome',
                            price: 75 - expressAutoPay,
                            byod: false,
                            perks: [...perks],
                        };

                        dispatch(setLinesData([...lines, newLine]));
                    }
                }}
            >
                <Tooltip title="Add Line">
                    <Add
                        sx={{
                            color: theme.TEXT_COLOR,
                            fontSize: '3rem',
                            cursor: 'pointer',
                        }}
                    />
                </Tooltip>
            </div>
            <MyAlert
                open={showAlert}
                onClick={() => setShowAlert(false)}
                title={alertTitle}
                message={alertMessage}
            />
        </div>
    );
};

export default LinesSelector;
