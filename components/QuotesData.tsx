import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';
import { useAppSelector } from '../redux/hooks/reduxHooks';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

type Props = {
    onViewClick: (id: string) => void;
    onDelete: (id: string) => void;
    onSummaryView: (id: string) => void;
};

function createData(
    id: string,
    name: string,
    lines: number,
    createdAt: string
) {
    return { id, name, lines, createdAt };
}

const QuotesData = ({ onViewClick, onDelete, onSummaryView }: Props) => {
    const quotes = useAppSelector((s) => s.wireless.quotes);
    const rows = quotes.map((q) =>
        createData(q.id, q.customerName, q.lines.length, q.createdAt)
    );

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                            Customer's Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                            # of lines
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                            Created On
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                        .reverse()
                        .map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{ textTransform: 'capitalize' }}
                                    component="th"
                                    scope="row"
                                >
                                    {row.name}
                                </TableCell>

                                <TableCell>{row.lines}</TableCell>
                                <TableCell>
                                    {moment(row.createdAt).format('lll')}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => onViewClick(row.id)}
                                        variant="text"
                                    >
                                        View
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color="success"
                                        onClick={() => onSummaryView(row.id)}
                                        variant="text"
                                    >
                                        Summary
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Box onClick={() => onDelete(row.id)}>
                                        <DeleteIcon />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuotesData;
