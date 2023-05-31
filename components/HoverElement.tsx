import { motion } from 'framer-motion';
import React from 'react';

const HoverElement = ({
    children,
    onHoverStart,
    onHoverEnd,
    selected = false,
}: {
    children: React.ReactNode;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    selected?: boolean;
}) => {
    return (
        <motion.div
            style={{ cursor: 'pointer' }}
            whileHover={{
                scale: !selected ? 1 : 1.05,
                opacity: 0.8,
                translateX: 6,
            }}
            animate={{
                scale: selected ? 1.05 : 1,
                opacity: selected ? 0.8 : 1,
            }}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
        >
            {children}
        </motion.div>
    );
};

export default HoverElement;
