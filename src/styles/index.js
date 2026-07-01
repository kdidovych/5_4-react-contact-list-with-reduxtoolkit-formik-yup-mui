import {red} from '@mui/material/colors';

export const gridBorder = {
    '--Grid-borderWidth': '2px',
    border: 'var(--Grid-borderWidth) solid',
    borderColor: 'divider'
}
export const deleteIcon = {
    color: red[500],
    fontSize: 14,
}
export const contactItem = {
    lineHeight: '18px',
    '&:hover': {cursor: 'pointer', backgroundColor: 'divider'}
}
export const deleteIconButton = {
    padding: '2px',
    borderRadius: 0
}
export const textField = {
    fontSize: 10
}