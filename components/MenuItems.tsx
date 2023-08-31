import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from 'material-ui-popup-state/hooks';
import { PLAN } from '../types';
import { on } from 'events';

type Props = {
    onClick: (plan: PLAN) => void;
};

const MenuSwitchPlan = ({ onClick }: Props) => {
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoMenu',
    });

    const handleClose = (plan: PLAN) => {
        onClick(plan);
        popupState.close();
    };
    return (
        <div>
            <Button variant="text" {...bindTrigger(popupState)}>
                Switch
            </Button>
            <Menu {...bindMenu(popupState)}>
                {[
                    'Unlimited Welcome',
                    'Unlimited Plus',
                    'Unlimited Ultimate',
                ].map((plan) => (
                    <MenuItem
                        key={plan}
                        onClick={() => handleClose(plan as PLAN)}
                    >
                        {plan}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default MenuSwitchPlan;
