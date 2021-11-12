import DeleteIcon from '@material-ui/icons/Delete';
import ClassIcon from '@material-ui/icons/Class';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';

export const menu = [
    {
        name: 'Create',
        icon: <AddBoxIcon fontSize="small" />,
    },
    {
        name: 'Rename',
        icon: <EditIcon fontSize="small" />,
    },
    {
        name: 'Classific',
        icon: <ClassIcon fontSize="small" />,
    },
    {
        name: 'Delete',
        icon: <DeleteIcon fontSize="small" />,
    }
];