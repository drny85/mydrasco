import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
    show: boolean;
    children: React.ReactNode;
};

const AnimateElementIf = ({ show, children }: Props) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    style={{ width: '100%' }}
                    initial={{ opacity: 0, translateY: -10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -10 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimateElementIf;
